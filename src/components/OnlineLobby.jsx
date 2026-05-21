import { useState, useEffect, useCallback } from "react";
import { MSG } from "../network/PeerJsRoomTransport";
import { saveOnlineRoomSnapshot } from "../utils/storage";
import "./OnlineLobby.css";

function OnlineLobby({ transport, onlineInfo, onStartGame, onPrivateRole, onBack }) {
  const [roster, setRoster] = useState(transport.roster);
  const [statusMessage, setStatusMessage] = useState("");

  const { roomCode, isHost } = onlineInfo;
  const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}?mode=peer&room=${roomCode}`;
  const connectedCount = roster.filter((p) => p.connected).length;
  const canStart = isHost && connectedCount >= 4;

  useEffect(() => {
    const offMessage = transport.onMessage((data) => {
      if (!data || !data.type) return;

      if (data.type === MSG.GAME_STARTED) {
        onStartGame(data);
        return;
      }

      if (data.type === MSG.PUBLIC_STATE && data.phase && data.phase !== "lobby") {
        onStartGame(data);
        return;
      }

      if (data.type === MSG.PRIVATE_ROLE) {
        onPrivateRole?.(data);
        return;
      }
    });

    const offRoster = transport.onRosterChange((newRoster) => {
      setRoster([...newRoster]);
    });

    const offStatus = transport.onStatusChange((status) => {
      if (status === "disconnected") {
        setStatusMessage("Connection lost. Attempting to reconnect...");
      } else if (status === "host_disconnected") {
        setStatusMessage("Host disconnected. Scores are frozen.");
      }
    });

    return () => {
      offMessage?.();
      offRoster?.();
      offStatus?.();
    };
  }, [transport, onStartGame, onPrivateRole]);

  useEffect(() => {
    saveOnlineRoomSnapshot(roomCode, {
      roomCode,
      roster,
      phase: "lobby",
    });
  }, [roomCode, roster]);

  const handleStartGame = useCallback(() => {
    if (!canStart) return;
    onStartGame(roster);
  }, [canStart, roster, onStartGame]);

  const handleRemovePlayer = useCallback(
    (clientId) => {
      if (!isHost) return;
      transport.removePlayer(clientId);
    },
    [isHost, transport],
  );

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: "Join Wazir Game", url: shareUrl }).catch(() => {});
    }
  };

  return (
    <div className="online-lobby">
      <div className="online-lobby-bg" />

      <div className="online-lobby-glass">
        {onBack && (
          <button className="online-lobby-back-btn" onClick={onBack}>
            &larr; Back
          </button>
        )}

        <div className="online-lobby-header">
          <h1 className="online-lobby-title">Room: {roomCode}</h1>
          <div className="online-lobby-badge">Online Sync</div>
        </div>

        <div className="online-lobby-host-info">
          Host: <strong>{roster.find((p) => p.isHost)?.displayName || "—"}</strong>
        </div>

        <div className="online-lobby-share">
          <span className="online-lobby-share-label">Players can join:</span>
          <div className="online-lobby-share-info">
            Open Wazir &rarr; Join Online Room &rarr; type <strong>{roomCode}</strong>
          </div>
          <code className="online-lobby-share-url">{shareUrl}</code>
          <div className="online-lobby-share-actions">
            <button className="arcade-btn arcade-btn-ghost online-lobby-share-btn" onClick={copyLink}>
              Copy Link
            </button>
            {typeof navigator !== "undefined" && navigator.share && (
              <button className="arcade-btn arcade-btn-ghost online-lobby-share-btn" onClick={shareLink}>
                Share Link
              </button>
            )}
          </div>
        </div>

        <div className="online-lobby-roster-section">
          <h2 className="online-lobby-roster-title">
            Roster ({connectedCount} connected)
          </h2>
          <div className="online-lobby-roster">
            {roster.map((player) => (
              <div
                key={player.clientId}
                className={`online-lobby-player ${player.connected ? "" : "online-lobby-player-disconnected"} ${player.clientId === onlineInfo.clientId ? "online-lobby-player-you" : ""}`}
              >
                <div className="online-lobby-player-info">
                  <span className="online-lobby-player-name">
                    {player.displayName}
                    {player.isHost && (
                      <span className="online-lobby-host-tag">HOST</span>
                    )}
                    {player.clientId === onlineInfo.clientId && (
                      <span className="online-lobby-you-tag">YOU</span>
                    )}
                  </span>
                  {!player.connected && (
                    <span className="online-lobby-disconnected-tag">
                      Disconnected
                    </span>
                  )}
                </div>
                {isHost && !player.isHost && !player.connected && (
                  <button
                    className="online-lobby-remove-btn"
                    onClick={() => handleRemovePlayer(player.clientId)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {statusMessage && (
          <div className="online-lobby-status">{statusMessage}</div>
        )}

        {isHost && (
          <div className="online-lobby-host-controls">
            <button
              className="arcade-btn arcade-btn-gold"
              onClick={handleStartGame}
              disabled={!canStart}
            >
              {canStart ? "START GAME" : `NEED ${4 - connectedCount} MORE PLAYER${4 - connectedCount !== 1 ? "S" : ""}`}
            </button>
            {!canStart && connectedCount > 0 && (
              <p className="online-lobby-min-players">
                Minimum 4 connected players required
              </p>
            )}
          </div>
        )}

        {!isHost && (
          <div className="online-lobby-waiting">
            <p>Waiting for host to start the game...</p>
            <div className="online-lobby-waiting-dots">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineLobby;
