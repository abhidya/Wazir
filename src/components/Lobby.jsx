import { useState } from 'react';
import { loadPlayerData, savePlayerData, loadRoomState, saveRoomState } from '../utils/storage';
import './Lobby.css';

function Lobby({ onJoinRoom }) {
  const savedData = loadPlayerData();
  const [roomCode, setRoomCode] = useState(savedData?.roomCode || '');
  const [playerNumber, setPlayerNumber] = useState('');
  const [numPlayers, setNumPlayers] = useState('4');
  const [displayName, setDisplayName] = useState(savedData?.displayName || '');
  const [error, setError] = useState('');

  const handleJoin = () => {
    setError('');

    // Validate inputs
    if (!roomCode.trim()) {
      setError('Please enter a room code.');
      return;
    }

    const playerNum = parseInt(playerNumber);
    const numPlayersNum = parseInt(numPlayers);

    if (isNaN(playerNum) || playerNum < 1) {
      setError('Please enter a valid player number (1 or higher).');
      return;
    }

    if (isNaN(numPlayersNum) || numPlayersNum < 4) {
      setError('At least 4 players are required.');
      return;
    }

    if (playerNum > numPlayersNum) {
      setError(`Player number cannot exceed total players (${numPlayersNum}).`);
      return;
    }

    // Save player data
    savePlayerData({
      roomCode: roomCode.trim(),
      playerNumber: playerNum,
      displayName: displayName.trim(),
      numPlayers: numPlayersNum
    });

    // Load or create room state
    let roomState = loadRoomState(roomCode.trim());
    if (!roomState) {
      roomState = {
        roundNumber: 1,
        numPlayers: numPlayersNum
      };
      saveRoomState(roomCode.trim(), roomState);
    }

    onJoinRoom({
      roomCode: roomCode.trim(),
      playerNumber: playerNum,
      numPlayers: roomState.numPlayers || numPlayersNum,
      displayName: displayName.trim(),
      roundNumber: roomState.roundNumber || 1
    });
  };

  return (
    <div className="lobby">
      <h1>BADSHA–WAZIR–CHOR–SIPAHI</h1>
      
      <div className="warning-box">
        <strong>⚠️ Privacy Warning</strong>
        <p>Keep your player number secret. Enter the shared room code and your private player number.</p>
        <p>This app is front-end only. Secrets rely on keeping your playerNumber private. Anyone who enters another player's private number can reveal their role on their device.</p>
      </div>

      <div className="form-group">
        <label htmlFor="roomCode">Room Code (shared with all players)</label>
        <input
          id="roomCode"
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          placeholder="e.g., GAME123"
          maxLength={20}
        />
      </div>

      <div className="form-group">
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

      <div className="form-group">
        <label htmlFor="playerNumber">
          Your Player Number (keep private!)
          <span className="private-badge">🔒 Private</span>
        </label>
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

      <div className="form-group">
        <label htmlFor="displayName">Display Name (optional, local only)</label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          maxLength={30}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button className="join-button" onClick={handleJoin}>
        Join Room
      </button>

      <div className="info-box">
        <strong>How to assign player numbers privately:</strong>
        <ul>
          <li>Use folded paper slips with numbers written inside</li>
          <li>Have players draw numbers from a hat</li>
          <li>Use a separate app to assign numbers secretly</li>
        </ul>
      </div>
    </div>
  );
}

export default Lobby;
