/**
 * PeerJS Room Transport
 *
 * Only this file directly uses PeerJS APIs.
 * Provides host/client abstraction for room-based P2P communication.
 *
 * Host peer ID: "wazir-{normalizedRoomCode}" (deterministic, lowercase)
 *
 * Key design decisions:
 * - Protocol version 1 on all messages; unknown versions are rejected.
 * - Host maintains the authoritative roster and broadcasts ROSTER_UPDATE
 *   whenever it changes, so clients always have a copy.
 * - JOIN_ACCEPT includes the full roster so clients can populate immediately.
 * - Messages received before callbacks are registered are buffered and replayed.
 * - joinRoom() resolves only after JOIN_ACCEPT from host (not just DataConnection open).
 * - Room codes are normalized: trim, uppercase, A-Z 0-9 - _ only.
 */

import Peer from "peerjs";

// ─── Protocol Version ────────────────────────────────────────────────

const PROTOCOL_VERSION = 1;

// ─── Message Types ───────────────────────────────────────────────────

export const MSG = {
  JOIN_REQUEST: "JOIN_REQUEST",
  JOIN_ACCEPT: "JOIN_ACCEPT",
  JOIN_REJECT: "JOIN_REJECT",
  ROSTER_UPDATE: "ROSTER_UPDATE",
  GAME_STARTED: "GAME_STARTED",
  PUBLIC_STATE: "PUBLIC_STATE",
  PRIVATE_ROLE: "PRIVATE_ROLE",
  WAZIR_GUESS: "WAZIR_GUESS",
  ROUND_APPLIED: "ROUND_APPLIED",
  SKIP_ROUND: "SKIP_ROUND",
  PLAYER_RENAME: "PLAYER_RENAME",
  PLAYER_READY: "PLAYER_READY",
  PING: "PING",
  PONG: "PONG",
};

const VALID_MSG_TYPES = new Set(Object.values(MSG));

// ─── Helpers ─────────────────────────────────────────────────────────

/**
 * Normalize a room code: trim, uppercase, keep only A-Z 0-9 - _
 */
export function normalizeRoomCode(input) {
  if (typeof input !== "string") return "";
  return input.trim().toUpperCase().replace(/[^A-Z0-9\-_]/g, "");
}

/**
 * Convert a normalized room code to a deterministic host PeerJS ID.
 * MANNY → wazir-manny
 */
export function getHostPeerId(roomCode) {
  const normalized = normalizeRoomCode(roomCode);
  return `wazir-${normalized.toLowerCase()}`;
}

function generateClientId() {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Validate an incoming message: must be object, have type, have version 1.
 * Returns the message if valid, null otherwise.
 */
function validateMessage(data) {
  if (!data || typeof data !== "object") return null;
  if (!data.type || !VALID_MSG_TYPES.has(data.type)) return null;
  if (data.version !== PROTOCOL_VERSION) return null;
  return data;
}

function wrapMessage(msg) {
  return { ...msg, version: PROTOCOL_VERSION };
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
    this.roomCode = normalizeRoomCode(roomCode);
    this.clientId = clientId || generateClientId();
    this.displayName = displayName;
    this.role = role;

    this._peer = null;
    this._connections = new Map();
    this._hostConn = null;
    this._roster = [];
    this._nextSeat = 1;
    this._destroyed = false;

    this._messageListeners = new Set();
    this._rosterListeners = new Set();
    this._statusListeners = new Set();

    this._messageBuffer = [];
    this._rosterBuffer = null;

    this._pingInterval = null;

    this._joinResolve = null;
    this._joinReject = null;
    this._joinTimeout = null;
  }

  // ─── Callback Registration (multi-listener) ───────────────────────

  onMessage(cb) {
    this._messageListeners.add(cb);
    // Replay buffered messages to this new listener
    if (this._messageBuffer.length > 0) {
      const buffer = this._messageBuffer;
      this._messageBuffer = [];
      for (const data of buffer) {
        cb(data);
      }
    }
    return () => { this._messageListeners.delete(cb); };
  }

  onRosterChange(cb) {
    this._rosterListeners.add(cb);
    // Call with current roster if available
    if (this._rosterBuffer !== null) {
      const roster = this._rosterBuffer;
      this._rosterBuffer = null;
      cb(roster);
    } else if (this._roster.length > 0) {
      cb(this.roster);
    }
    return () => { this._rosterListeners.delete(cb); };
  }

  onStatusChange(cb) {
    this._statusListeners.add(cb);
    return () => { this._statusListeners.delete(cb); };
  }

  // ─── Host Operations ───────────────────────────────────────────────

  async hostRoom() {
    return new Promise((resolve, reject) => {
      const peerId = getHostPeerId(this.roomCode);
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

  _handleHostMessage(conn, raw) {
    const data = validateMessage(raw);
    if (!data) return;

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

          this._sendToClient(conn, wrapMessage({
            type: MSG.JOIN_ACCEPT,
            assignedSeatNumber: existing.seatNumber,
            roster: this._roster,
            publicState: this._publicState,
          }));

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

          this._sendToClient(conn, wrapMessage({
            type: MSG.JOIN_ACCEPT,
            assignedSeatNumber: seatNumber,
            roster: this._roster,
            publicState: this._publicState,
          }));

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

      case MSG.PLAYER_READY: {
        this._notifyMessage(data);
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
      const hostId = getHostPeerId(this.roomCode);

      this._peer = new Peer(undefined, {
        debug: 0,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        },
      });

      this._joinResolve = resolve;
      this._joinReject = reject;

      this._peer.on("open", () => {
        const conn = this._peer.connect(hostId, { reliable: true });

        conn.on("open", () => {
          this._hostConn = conn;

          conn.send(wrapMessage({
            type: MSG.JOIN_REQUEST,
            clientId: this.clientId,
            displayName: this.displayName,
          }));

          this._startPing();
        });

        conn.on("data", (data) => {
          this._handleClientMessage(data);
        });

        conn.on("close", () => {
          this._notifyStatusChange("host_disconnected");
          if (this._joinReject) {
            this._joinReject(
              new Error("Host disconnected before join completed."),
            );
            this._joinResolve = null;
            this._joinReject = null;
            this._clearJoinTimeout();
          }
        });

        conn.on("error", (err) => {
          this._notifyStatusChange("host_disconnected");
          if (this._joinReject) {
            this._joinReject(
              new Error(`Connection error: ${err.message || "unknown"}`),
            );
            this._joinResolve = null;
            this._joinReject = null;
            this._clearJoinTimeout();
          }
        });
      });

      this._peer.on("error", (err) => {
        if (this._joinReject) {
          this._joinReject(new Error(`Connection error: ${err.message || err.type}`));
          this._joinResolve = null;
          this._joinReject = null;
          this._clearJoinTimeout();
        }
      });

      this._peer.on("disconnected", () => {
        this._notifyStatusChange("disconnected");
      });

      this._joinTimeout = setTimeout(() => {
        if (this._joinReject) {
          this._joinReject(
            new Error(
              "Could not join room. Make sure the host created the room and is still online.",
            ),
          );
          this._joinResolve = null;
          this._joinReject = null;
          this.disconnect();
        }
      }, 15000);
    });
  }

  _clearJoinTimeout() {
    if (this._joinTimeout) {
      clearTimeout(this._joinTimeout);
      this._joinTimeout = null;
    }
  }

  _handleClientMessage(raw) {
    const data = validateMessage(raw);
    if (!data) return;

    if (data.type === MSG.PING) {
      this.sendToHost(wrapMessage({ type: MSG.PONG, clientId: this.clientId }));
      return;
    }

    if (data.type === MSG.JOIN_ACCEPT) {
      if (data.roster && Array.isArray(data.roster)) {
        this._roster = data.roster;
        this._notifyRosterChange();
      }
      this._clearJoinTimeout();
      if (this._joinResolve) {
        this._joinResolve(data);
        this._joinResolve = null;
        this._joinReject = null;
      }
      this._notifyMessage(data);
      return;
    }

    if (data.type === MSG.JOIN_REJECT) {
      this._clearJoinTimeout();
      if (this._joinReject) {
        this._joinReject(
          new Error(data.reason || "Join rejected by host."),
        );
        this._joinResolve = null;
        this._joinReject = null;
      }
      this.disconnect();
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
      this._hostConn.send(wrapMessage({ ...message, clientId: this.clientId }));
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
      conn.send(wrapMessage(message));
    }
  }

  broadcast(message) {
    const wrapped = wrapMessage(message);
    for (const conn of this._connections.values()) {
      if (conn.open) {
        conn.send(wrapped);
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
        this.broadcast(wrapMessage({ type: MSG.PING }));
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
    if (this._messageListeners.size > 0) {
      for (const cb of this._messageListeners) {
        cb(data);
      }
    } else {
      this._messageBuffer.push(data);
    }
  }

  _notifyRosterChange() {
    const rosterCopy = this.roster;
    if (this._rosterListeners.size > 0) {
      for (const cb of this._rosterListeners) {
        cb(rosterCopy);
      }
    } else {
      this._rosterBuffer = rosterCopy;
    }
  }

  _notifyStatusChange(status) {
    for (const cb of this._statusListeners) {
      cb(status);
    }
  }

  // ─── Cleanup ────────────────────────────────────────────────────────

  disconnect() {
    this._destroyed = true;
    this._stopPing();
    this._clearJoinTimeout();

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

    this._joinResolve = null;
    this._joinReject = null;
  }
}

export default PeerJsRoomTransport;
