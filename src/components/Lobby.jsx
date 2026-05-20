import { useState } from "react";
import {
  loadPlayerData,
  savePlayerData,
  loadRoomState,
  saveRoomState,
} from "../utils/storage";
import "./Lobby.css";

function Lobby({ onJoinRoom, onBack, prefilledRoomCode }) {
  const savedData = loadPlayerData();
  const [roomCode, setRoomCode] = useState(
    prefilledRoomCode || savedData?.roomCode || ""
  );
  const [playerNumber, setPlayerNumber] = useState("");
  const [numPlayers, setNumPlayers] = useState("4");
  const [displayName, setDisplayName] = useState(savedData?.displayName || "");
  const [error, setError] = useState("");

  const handleJoin = () => {
    setError("");

    if (!roomCode.trim()) {
      setError("Please enter a room code.");
      return;
    }

    const playerNum = parseInt(playerNumber);
    const numPlayersNum = parseInt(numPlayers);

    if (isNaN(playerNum) || playerNum < 1) {
      setError("Please enter a valid player number (1 or higher).");
      return;
    }

    if (isNaN(numPlayersNum) || numPlayersNum < 4) {
      setError("At least 4 players are required.");
      return;
    }

    if (playerNum > numPlayersNum) {
      setError(`Player number cannot exceed total players (${numPlayersNum}).`);
      return;
    }

    savePlayerData({
      roomCode: roomCode.trim(),
      playerNumber: playerNum,
      displayName: displayName.trim(),
      numPlayers: numPlayersNum,
    });

    let roomState = loadRoomState(roomCode.trim());
    if (!roomState) {
      roomState = {
        roundNumber: 1,
        numPlayers: numPlayersNum,
      };
      saveRoomState(roomCode.trim(), roomState);
    }

    onJoinRoom({
      roomCode: roomCode.trim(),
      playerNumber: playerNum,
      numPlayers: roomState.numPlayers || numPlayersNum,
      displayName: displayName.trim(),
      roundNumber: roomState.roundNumber || 1,
    });
  };

  return (
    <div className="lobby">
      <div className="lobby-bg" />

      <div className="lobby-glass">
        {onBack && (
          <button className="lobby-back-btn" onClick={onBack}>
            &larr; Back
          </button>
        )}

        <h1 className="lobby-title">JOIN ROOM</h1>
        <p className="lobby-subtitle">
          Enter the shared room code and your secret identity
        </p>

        <div className="lobby-form">
          <div className="lobby-field">
            <label htmlFor="roomCode">
              Room Code <span className="lobby-shared-badge">Shared</span>
            </label>
            <input
              id="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g., GAME123"
              maxLength={20}
              autoComplete="off"
            />
          </div>

          <div className="lobby-field">
            <label htmlFor="numPlayers">Number of Players</label>
            <input
              id="numPlayers"
              type="number"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              min="4"
              max="20"
            />
          </div>

          <div className="lobby-field">
            <label htmlFor="playerNumber">Your Player Number</label>
            <input
              id="playerNumber"
              type="number"
              value={playerNumber}
              onChange={(e) => setPlayerNumber(e.target.value)}
              min="1"
              max={numPlayers}
              placeholder="Your assigned number"
            />
          </div>

          <div className="lobby-field">
            <label htmlFor="displayName">
              Display Name{" "}
              <span className="lobby-optional-badge">Optional</span>
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              maxLength={30}
              autoComplete="off"
            />
          </div>
        </div>

        {error && <div className="lobby-error">{error}</div>}

        <button
          className="arcade-btn arcade-btn-gold lobby-join-btn"
          onClick={handleJoin}
        >
          JOIN ROOM
        </button>
      </div>
    </div>
  );
}

export default Lobby;
