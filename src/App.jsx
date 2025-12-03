import { useState } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [screen, setScreen] = useState('lobby'); // 'lobby', 'game', 'settings'
  const [gameData, setGameData] = useState(null);

  const handleJoinRoom = (data) => {
    setGameData(data);
    setScreen('game');
  };

  const handleLeaveRoom = () => {
    setScreen('lobby');
    setGameData(null);
  };

  const handleOpenSettings = () => {
    setScreen('settings');
  };

  const handleCloseSettings = () => {
    setScreen(gameData ? 'game' : 'lobby');
  };

  return (
    <div className="app">
      {screen !== 'settings' && (
        <button className="settings-toggle" onClick={handleOpenSettings}>
          ⚙️ Settings
        </button>
      )}

      {screen === 'lobby' && (
        <Lobby onJoinRoom={handleJoinRoom} />
      )}

      {screen === 'game' && gameData && (
        <Game
          roomCode={gameData.roomCode}
          playerNumber={gameData.playerNumber}
          numPlayers={gameData.numPlayers}
          roundNumber={gameData.roundNumber}
          displayName={gameData.displayName}
          onLeave={handleLeaveRoom}
        />
      )}

      {screen === 'settings' && (
        <Settings
          roomCode={gameData?.roomCode}
          onBack={handleCloseSettings}
        />
      )}
    </div>
  );
}

export default App;
