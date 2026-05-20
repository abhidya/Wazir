import { useState, useEffect } from "react";
import {
  getOrCreateClientId,
  saveDisplayName,
  loadDisplayName,
} from "../utils/storage";
import { PeerJsRoomTransport, normalizeRoomCode } from "../network/PeerJsRoomTransport";
import "./OnlineRoomSetup.css";

function OnlineRoomSetup({ mode, prefilledRoom, onConnected, onBack }) {
  const [roomCode, setRoomCode] = useState(prefilledRoom || "");
  const [name, setName] = useState(() => loadDisplayName());
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  const isHost = mode === "host";
  const shareUrl = roomCode
    ? `${window.location.origin}${import.meta.env.BASE_URL}?mode=peer&room=${normalizeRoomCode(roomCode)}`
    : "";

  useEffect(() => {
    if (prefilledRoom) setRoomCode(prefilledRoom);
  }, [prefilledRoom]);

  const handleSubmit = async () => {
    setError("");

    const normalized = normalizeRoomCode(roomCode);
    if (!normalized) {
      setError("Please enter a valid room code (A-Z, 0-9, -, _).");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setConnecting(true);
    saveDisplayName(name.trim());

    const clientId = getOrCreateClientId();
    const transport = new PeerJsRoomTransport({
      roomCode: normalized,
      clientId,
      displayName: name.trim(),
      role: isHost ? "host" : "client",
    });

    try {
      if (isHost) {
        await transport.hostRoom();
        onConnected(transport, { roomCode: normalized, clientId, displayName: name.trim(), isHost: true });
      } else {
        await transport.joinRoom();
        onConnected(transport, { roomCode: normalized, clientId, displayName: name.trim(), isHost: false });
      }
    } catch (err) {
      setError(err.message);
      transport.disconnect();
    } finally {
      setConnecting(false);
    }
  };

  const copyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
  };

  const shareLink = () => {
    if (shareUrl && navigator.share) {
      navigator.share({ title: "Join Wazir Game", url: shareUrl }).catch(() => {});
    }
  };

  return (
    <div className="online-setup">
      <div className="online-setup-bg" />

      <div className="online-setup-glass">
        {onBack && (
          <button className="online-setup-back-btn" onClick={onBack}>
            &larr; Back
          </button>
        )}

        <h1 className="online-setup-title">
          {isHost ? "CREATE ONLINE ROOM" : "JOIN ONLINE ROOM"}
        </h1>
        <p className="online-setup-subtitle">
          {isHost
            ? "Create a room and share the code with friends"
            : "Enter the room code shared by the host"}
        </p>

        <div className="online-setup-form">
          <div className="online-setup-field">
            <label htmlFor="onlineRoomCode">Room Code</label>
            <input
              id="onlineRoomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase().replace(/[^A-Z0-9\-_]/g, ""))}
              placeholder="e.g., MANNY"
              maxLength={20}
              autoComplete="off"
              disabled={connecting}
            />
          </div>

          <div className="online-setup-field">
            <label htmlFor="onlineName">Your Name</label>
            <input
              id="onlineName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Manny"
              maxLength={30}
              autoComplete="off"
              disabled={connecting}
            />
          </div>
        </div>

        {isHost && roomCode.trim() && (
          <div className="online-setup-link-preview">
            <span className="online-setup-link-label">Share link:</span>
            <code className="online-setup-link-url">{shareUrl}</code>
            <div className="online-setup-link-actions">
              <button className="arcade-btn arcade-btn-ghost online-setup-link-btn" onClick={copyLink}>
                Copy Link
              </button>
              {typeof navigator !== "undefined" && navigator.share && (
                <button className="arcade-btn arcade-btn-ghost online-setup-link-btn" onClick={shareLink}>
                  Share Link
                </button>
              )}
            </div>
          </div>
        )}

        {error && <div className="online-setup-error">{error}</div>}

        <button
          className="arcade-btn arcade-btn-gold online-setup-submit"
          onClick={handleSubmit}
          disabled={connecting}
        >
          {connecting ? "CONNECTING..." : isHost ? "CREATE ROOM" : "JOIN ROOM"}
        </button>
      </div>
    </div>
  );
}

export default OnlineRoomSetup;
