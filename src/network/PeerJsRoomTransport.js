/**
 * PeerJS Room Transport
 *
 * Only this file directly uses PeerJS APIs.
 * Provides host/client abstraction for room-based P2P communication.
 *
 * Host peer ID: "wazir-{roomCode}" (deterministic, uppercase room code)
 *
 * Key design decisions:
 * - Host maintains the authoritative roster and broadcasts ROSTER_UPDATE
 *   whenever it changes, so clients always have a copy.
 * - JOIN_ACCEPT includes the full roster so clients can populate immediately.
 * - Messages received before callbacks are registered are buffered and replayed.
 */

import Peer from "peerjs";

// ─── Message Types ───────────────────────────────────────────────────

export const MSG = {
  JOIN_REQUEST: "JOIN_REQUEST",
  JOIN_ACCEPT: "JOIN_ACCEPT",
  JOIN_REJECT: "JOIN_REJECT",
  ROSTER_UPDATE: "ROSTER_UPDATE",
  PUBLIC_STATE: "PUBLIC_STATE",
  PRIVATE_ROLE: "PRIVATE_ROLE",
  WAZIR_GUESS: "WAZIR_GUESS",
  ROUND_APPLIED: "ROUND_APPLIED",
  SKIP_ROUND: "SKIP_ROUND",
  PLAYER_RENAME: "PLAYER_RENAME",
  PING: "PING",
  PONG: "PONG",
};

// ─── Helpers ─────────────────────────────────────────────────────────

function hostPeerId(roomCode) {
  return `wazir-${roomCode.toLowerCase()}`;
}

function generateClientId() {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Transport Class ─────────────────────────────────────────────────

export class PeerJsRoomTransport {
  /**
   * @param {Object} opts
   * @param {string} opts.roomCode – display room code (e.g. "MANNY")
   * @param {string} opts.clientId – stable identity from localStorage
   * @param {string} opts.displayName – UI-visible name
   * @param {'host'|'client'} opts.role – whether this instance is the host
   */
  constructor({ roomCode, clientId, displayName, role }) {
    this.roomCode = roomCode.trim().toUpperCase();
    this.clientId = clientId || generateClientId();
    this.displayName = displayName;
    this.role = role;

    this._peer = null;
    this._connections = new Map();
    this._hostConn = null;
    this._roster = [];
    this._nextSeat = 1;
    this._destroyed = false;

    this._onMessage = null;
    this._onRosterChange = null;
    this._onStatusChange = null;

    this._messageBuffer = [];
    this._rosterBuffer = null;
    this._callbacksReady = false;

    this._pingInterval = null;
  }

  // ─── Callback Registration ─────────────────────────────────────────

  onMessage(cb) {
    this._onMessage = cb;
    this._callbacksReady = true;
    if (this._messageBuffer.length > 0) {
      const buffer = this._messageBuffer;
      this._messageBuffer = [];
      for (const data of buffer) {
        if (this._onMessage) this._onMessage(data);
      }
    }
  }

  onRosterChange(cb) {
    this._onRosterChange = cb;
    if (this._rosterBuffer !== null) {
      const roster = this._rosterBuffer;
      this._rosterBuffer = null;
      if (this._onRosterChange) this._onRosterChange(roster);
    }
  }

  onStatusChange(cb) {
    this._onStatusChange = cb;
  }

  // ─── Host Operations ───────────────────────────────────────────────

  async hostRoom() {
    return new Promise((resolve, reject) => {
      const peerId = hostPeerId(this.roomCode);
      this._peer = new Peer(peerId, {
        debug: 0,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        },
      });

      this._peer.on("open", (id) => {
        this._roster = [
          {
            clientId: this.clientId,
            peerId: id,
            displayName: this.displayName,
            seatNumber: this._nextSeat++,
            connected: true,
            isHost: true,
          },
        ];
        this._notifyRosterChange();
        this._startPing();

        resolve(id);
      });

      this._peer.on("error", (err) => {
        if (err.type === "unavailable-id") {
          reject(
            new Error(
              "Room already exists or is stale. Try another room code or Manual Mode.",
            ),
          );
        } else {
          reject(new Error(`Peer error: ${err.message || err.type}`));
        }
      });

      this._peer.on("connection", (conn) => {
        this._handleIncomingConnection(conn);
      });

      this._peer.on("disconnected", () => {
        this._notifyStatusChange("disconnected");
      });
    });
  }

  _handleIncomingConnection(conn) {
    conn.on("open", () => {
      conn.on("data", (data) => {
        this._handleHostMessage(conn, data);
      });

      conn.on("close", () => {
        this._handleClientDisconnect(conn);
      });

      conn.on("error", () => {
        this._handleClientDisconnect(conn);
      });
    });
  }

  _handleHostMessage(conn, data) {
    if (!data || !data.type) return;

    switch (data.type) {
      case MSG.JOIN_REQUEST: {
        const existing = this._roster.find(
          (r) => r.clientId === data.clientId,
        );

        if (existing) {
          existing.peerId = conn.peer;
          existing.connected = true;
          existing.displayName = data.displayName || existing.displayName;
          this._connections.set(data.clientId, conn);

          this._sendToClient(conn, {
            type: MSG.JOIN_ACCEPT,
            assignedSeatNumber: existing.seatNumber,
            roster: this._roster,
            publicState: this._publicState,
          });

          this._notifyRosterChange();
          this._broadcastRosterUpdate();
        } else {
          const seatNumber = this._nextSeat++;
          const entry = {
            clientId: data.clientId,
            peerId: conn.peer,
            displayName: data.displayName || `Player ${seatNumber}`,
            seatNumber,
            connected: true,
            isHost: false,
          };

          this._roster.push(entry);
          this._connections.set(data.clientId, conn);

          this._sendToClient(conn, {
            type: MSG.JOIN_ACCEPT,
            assignedSeatNumber: seatNumber,
            roster: this._roster,
            publicState: this._publicState,
          });

          this._notifyRosterChange();
          this._broadcastRosterUpdate();
        }
        break;
      }

      case MSG.WAZIR_GUESS: {
        this._notifyMessage(data);
        break;
      }

      case MSG.PLAYER_RENAME: {
        const entry = this._roster.find((r) => r.clientId === data.clientId);
        if (entry && data.displayName) {
          entry.displayName = data.displayName;
          this._notifyRosterChange();
          this._broadcastRosterUpdate();
        }
        break;
      }

      case MSG.PONG: {
        break;
      }

      default: {
        this._notifyMessage(data);
      }
    }
  }

  _handleClientDisconnect(conn) {
    const entry = this._roster.find(
      (r) => r.peerId === conn.peer && !r.isHost,
    );
    if (entry) {
      entry.connected = false;
      this._connections.delete(entry.clientId);
      this._notifyRosterChange();
      this._broadcastRosterUpdate();
    }
  }

  // ─── Client Operations ─────────────────────────────────────────────

  async joinRoom() {
    return new Promise((resolve, reject) => {
      const hostId = hostPeerId(this.roomCode);

      this._peer = new Peer(undefined, {
        debug: 0,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        },
      });

      this._peer.on("open", () => {
        const conn = this._peer.connect(hostId, { reliable: true });

        conn.on("open", () => {
          this._hostConn = conn;

          conn.send({
            type: MSG.JOIN_REQUEST,
            clientId: this.clientId,
            displayName: this.displayName,
          });

          this._startPing();

          resolve(conn);
        });

        conn.on("data", (data) => {
          this._handleClientMessage(data);
        });

        conn.on("close", () => {
          this._notifyStatusChange("host_disconnected");
        });

        conn.on("error", () => {
          this._notifyStatusChange("host_disconnected");
        });

        setTimeout(() => {
          if (!conn.open) {
            reject(
              new Error(
                "Could not connect. Make sure host created the room.",
              ),
            );
          }
        }, 10000);
      });

      this._peer.on("error", (err) => {
        reject(new Error(`Connection error: ${err.message || err.type}`));
      });

      this._peer.on("disconnected", () => {
        this._notifyStatusChange("disconnected");
      });
    });
  }

  _handleClientMessage(data) {
    if (!data || !data.type) return;

    if (data.type === MSG.PING) {
      this.sendToHost({ type: MSG.PONG, clientId: this.clientId });
      return;
    }

    if (data.type === MSG.JOIN_ACCEPT) {
      if (data.roster && Array.isArray(data.roster)) {
        this._roster = data.roster;
        this._notifyRosterChange();
      }
      this._notifyMessage(data);
      return;
    }

    if (data.type === MSG.ROSTER_UPDATE) {
      if (data.roster && Array.isArray(data.roster)) {
        this._roster = data.roster;
        this._notifyRosterChange();
      }
      return;
    }

    this._notifyMessage(data);
  }

  // ─── Messaging ─────────────────────────────────────────────────────

  sendToHost(message) {
    if (this._hostConn && this._hostConn.open) {
      this._hostConn.send({ ...message, clientId: this.clientId });
    }
  }

  sendToClient(clientId, message) {
    const conn = this._connections.get(clientId);
    if (conn && conn.open) {
      this._sendToClient(conn, message);
    }
  }

  _sendToClient(conn, message) {
    if (conn && conn.open) {
      conn.send(message);
    }
  }

  broadcast(message) {
    for (const conn of this._connections.values()) {
      if (conn.open) {
        conn.send(message);
      }
    }
  }

  _broadcastRosterUpdate() {
    this.broadcast({
      type: MSG.ROSTER_UPDATE,
      roster: this._roster,
    });
  }

  // ─── Public State (host-authoritative) ──────────────────────────────

  set publicState(state) {
    this._publicState = state;
  }

  get publicState() {
    return this._publicState;
  }

  setPublicState(state) {
    this._publicState = state;
  }

  get roster() {
    return [...this._roster];
  }

  set roster(newRoster) {
    this._roster = newRoster;
  }

  _setClientRoster(newRoster) {
    this._roster = newRoster;
    this._notifyRosterChange();
  }

  removePlayer(clientId) {
    if (this.role !== "host") return;
    this._roster = this._roster.filter((r) => r.clientId !== clientId);
    this._connections.delete(clientId);
    this._notifyRosterChange();
    this._broadcastRosterUpdate();
  }

  // ─── Ping / Keepalive ──────────────────────────────────────────────

  _startPing() {
    this._pingInterval = setInterval(() => {
      if (this.role === "host") {
        this.broadcast({ type: MSG.PING });
      } else {
        this.sendToHost({ type: MSG.PING, clientId: this.clientId });
      }
    }, 30000);
  }

  _stopPing() {
    if (this._pingInterval) {
      clearInterval(this._pingInterval);
      this._pingInterval = null;
    }
  }

  // ─── Notification Helpers ───────────────────────────────────────────

  _notifyMessage(data) {
    if (this._onMessage) {
      this._onMessage(data);
    } else {
      this._messageBuffer.push(data);
    }
  }

  _notifyRosterChange() {
    const rosterCopy = this.roster;
    if (this._onRosterChange) {
      this._onRosterChange(rosterCopy);
    } else {
      this._rosterBuffer = rosterCopy;
    }
  }

  _notifyStatusChange(status) {
    if (this._onStatusChange) this._onStatusChange(status);
  }

  // ─── Cleanup ────────────────────────────────────────────────────────

  disconnect() {
    this._destroyed = true;
    this._stopPing();

    for (const conn of this._connections.values()) {
      try {
        conn.close();
      } catch { /* ignore */ }
    }
    this._connections.clear();

    if (this._hostConn) {
      try {
        this._hostConn.close();
      } catch { /* ignore */ }
      this._hostConn = null;
    }

    if (this._peer && !this._peer.destroyed) {
      try {
        this._peer.destroy();
      } catch { /* ignore */ }
      this._peer = null;
    }
  }
}

export default PeerJsRoomTransport;
