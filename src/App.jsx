import { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import Lobby from './components/Lobby';
import Game from './components/Game';
import Settings from './components/Settings';
import HowToPlay from './components/HowToPlay';
import './App.css';

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function App() {
  const [screen, setScreen] = useState('home');
  const [gameData, setGameData] = useState(null);
  const [showLobby, setShowLobby] = useState(false);
  const [lobbyMode, setLobbyMode] = useState('join');
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handlePlayNow = useCallback(() => {
    setLobbyMode('join');
    setShowLobby(true);
  }, []);

  const handleJoinRoom = useCallback(() => {
    setLobbyMode('join');
    setShowLobby(true);
  }, []);

  const handleCreateRoom = useCallback(() => {
    setLobbyMode('create');
    setShowLobby(true);
  }, []);

  const handleHowToPlay = useCallback(() => {
    setShowHowToPlay(true);
  }, []);

  const handleLobbyJoin = useCallback((data) => {
    setGameData(data);
    setScreen('game');
    setShowLobby(false);
  }, []);

  const handleLobbyBack = useCallback(() => {
    setShowLobby(false);
  }, []);

  const handleLeaveRoom = useCallback(() => {
    setScreen('home');
    setGameData(null);
    setShowLobby(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setScreen('settings');
  }, []);

  const handleCloseSettings = useCallback(() => {
    setScreen(gameData ? 'game' : 'home');
  }, [gameData]);

  const closeHowToPlay = useCallback(() => {
    setShowHowToPlay(false);
  }, []);

  return (
    <div className="app">
      {screen !== 'settings' && (
        <button className="settings-toggle" onClick={handleOpenSettings}>
          Settings
        </button>
      )}

      {screen === 'home' && !showLobby && (
        <HomeScreen
          onPlayNow={handlePlayNow}
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
          onHowToPlay={handleHowToPlay}
        />
      )}

      {showLobby && (
        <Lobby
          onJoinRoom={handleLobbyJoin}
          onBack={handleLobbyBack}
          prefilledRoomCode={lobbyMode === 'create' ? generateRoomCode() : undefined}
        />
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

      {showHowToPlay && (
        <HowToPlay onClose={closeHowToPlay} />
      )}
    </div>
  );
}

export default App;
