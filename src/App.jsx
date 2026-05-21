import { useState, useCallback } from "react";
import HomeScreen from "./components/HomeScreen";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import Settings from "./components/Settings";
import HowToPlay from "./components/HowToPlay";
import OnlineRoomSetup from "./components/OnlineRoomSetup";
import OnlineLobby from "./components/OnlineLobby";
import OnlineGame from "./components/OnlineGame";
import { MSG } from "./network/PeerJsRoomTransport";
import { saveGameMode } from "./utils/storage";
import "./App.css";

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function getInitialOnlineState() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const room = params.get("room");

  if (mode === "peer" && room) {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    saveGameMode("peer");
    return { onlineScreen: "setup", onlineSetupMode: "client", prefilledRoom: room.toUpperCase() };
  }
  return { onlineScreen: null, onlineSetupMode: "host", prefilledRoom: "" };
}

function App() {
  const [screen, setScreen] = useState("home");
  const [gameData, setGameData] = useState(null);
  const [showLobby, setShowLobby] = useState(false);
  const [lobbyMode, setLobbyMode] = useState("join");
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const initialOnline = useState(getInitialOnlineState)[0];
  const [onlineScreen, setOnlineScreen] = useState(initialOnline.onlineScreen);
  const [onlineSetupMode, setOnlineSetupMode] = useState(initialOnline.onlineSetupMode);
  const [prefilledRoom, setPrefilledRoom] = useState(initialOnline.prefilledRoom);
  const [transport, setTransport] = useState(null);
  const [onlineInfo, setOnlineInfo] = useState(null);
  const [initialOnlineGameState, setInitialOnlineGameState] = useState(null);
  const [pendingPrivateRole, setPendingPrivateRole] = useState(null);

  const handlePlayNow = useCallback(() => {
    setLobbyMode("join");
    setCreatedRoomCode(null);
    setShowLobby(true);
  }, []);

  const handleJoinRoom = useCallback(() => {
    setLobbyMode("join");
    setCreatedRoomCode(null);
    setShowLobby(true);
  }, []);

  const handleCreateRoom = useCallback(() => {
    setLobbyMode("create");
    setCreatedRoomCode(generateRoomCode());
    setShowLobby(true);
  }, []);

  const handleHowToPlay = useCallback(() => {
    setShowHowToPlay(true);
  }, []);

  const handleCreateOnlineRoom = useCallback(() => {
    setOnlineSetupMode("host");
    setPrefilledRoom("");
    setOnlineScreen("setup");
    saveGameMode("peer");
  }, []);

  const handleJoinOnlineRoom = useCallback(() => {
    setOnlineSetupMode("client");
    setPrefilledRoom("");
    setOnlineScreen("setup");
    saveGameMode("peer");
  }, []);

  const handleOnlineConnected = useCallback((newTransport, info) => {
    setTransport(newTransport);
    setOnlineInfo(info);
    setInitialOnlineGameState(null);
    setPendingPrivateRole(null);
    setOnlineScreen("lobby");
  }, []);

  const handleOnlineLobbyBack = useCallback(() => {
    if (transport) {
      transport.disconnect();
    }
    setTransport(null);
    setOnlineInfo(null);
    setInitialOnlineGameState(null);
    setPendingPrivateRole(null);
    setOnlineScreen("setup");
  }, [transport]);

  const handleStartOnlineGame = useCallback((payload) => {
    if (onlineInfo?.isHost) {
      // Host clicked START GAME from lobby
      const roster = Array.isArray(payload) ? payload : transport.roster;
      const roundRoster = roster
        .filter((p) => p.connected)
        .sort((a, b) => a.seatNumber - b.seatNumber);

      if (roundRoster.length < 4) return;

      const scoreboardByClientId = {};
      for (const player of roundRoster) {
        scoreboardByClientId[player.clientId] = 0;
      }

      const startState = {
        mode: "peer",
        roomCode: onlineInfo.roomCode,
        hostClientId: onlineInfo.clientId,
        roundNumber: 1,
        phase: "secretReveal",
        roster,
        roundRoster,
        scoreboardByClientId,
      };

      transport.setPublicState(startState);
      transport.broadcast({ type: MSG.GAME_STARTED, ...startState });

      setInitialOnlineGameState(startState);
      setOnlineScreen("game");
      return;
    }

    // Client path: received GAME_STARTED / PUBLIC_STATE from lobby listener
    setInitialOnlineGameState(payload);
    setOnlineScreen("game");
  }, [onlineInfo, transport]);

  const handleLeaveOnline = useCallback(() => {
    if (transport) {
      transport.disconnect();
    }
    setTransport(null);
    setOnlineInfo(null);
    setInitialOnlineGameState(null);
    setPendingPrivateRole(null);
    setOnlineScreen(null);
    setScreen("home");
  }, [transport]);

  const handleOnlineSetupBack = useCallback(() => {
    setOnlineScreen(null);
    setScreen("home");
  }, []);

  const handleLobbyJoin = useCallback((data) => {
    setGameData(data);
    setScreen("game");
    setShowLobby(false);
  }, []);

  const handleLobbyBack = useCallback(() => {
    setShowLobby(false);
  }, []);

  const handleLeaveRoom = useCallback(() => {
    setScreen("home");
    setGameData(null);
    setShowLobby(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setScreen("settings");
  }, []);

  const handleCloseSettings = useCallback(() => {
    setScreen(gameData ? "game" : "home");
  }, [gameData]);

  const closeHowToPlay = useCallback(() => {
    setShowHowToPlay(false);
  }, []);

  const isOnlineActive = onlineScreen === "lobby" || onlineScreen === "game";

  return (
    <div className="app">
      {!isOnlineActive && screen !== "settings" && (
        <button className="settings-toggle" onClick={handleOpenSettings}>
          Settings
        </button>
      )}

      {screen === "home" && !showLobby && !onlineScreen && (
        <HomeScreen
          onPlayNow={handlePlayNow}
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
          onHowToPlay={handleHowToPlay}
          onCreateOnlineRoom={handleCreateOnlineRoom}
          onJoinOnlineRoom={handleJoinOnlineRoom}
        />
      )}

      {showLobby && (
        <Lobby
          onJoinRoom={handleLobbyJoin}
          onBack={handleLobbyBack}
          prefilledRoomCode={
            lobbyMode === "create" ? createdRoomCode : undefined
          }
        />
      )}

      {screen === "game" && gameData && (
        <Game
          roomCode={gameData.roomCode}
          playerNumber={gameData.playerNumber}
          numPlayers={gameData.numPlayers}
          roundNumber={gameData.roundNumber}
          displayName={gameData.displayName}
          onLeave={handleLeaveRoom}
        />
      )}

      {onlineScreen === "setup" && (
        <OnlineRoomSetup
          mode={onlineSetupMode}
          prefilledRoom={prefilledRoom}
          onConnected={handleOnlineConnected}
          onBack={handleOnlineSetupBack}
        />
      )}

      {onlineScreen === "lobby" && transport && onlineInfo && (
        <OnlineLobby
          transport={transport}
          onlineInfo={onlineInfo}
          onStartGame={handleStartOnlineGame}
          onPrivateRole={setPendingPrivateRole}
          onBack={handleOnlineLobbyBack}
        />
      )}

      {onlineScreen === "game" && transport && onlineInfo && (
        <OnlineGame
          transport={transport}
          onlineInfo={onlineInfo}
          initialState={initialOnlineGameState}
          initialPrivateRole={pendingPrivateRole}
          onLeave={handleLeaveOnline}
        />
      )}

      {screen === "settings" && (
        <Settings roomCode={gameData?.roomCode} onBack={handleCloseSettings} />
      )}

      {showHowToPlay && <HowToPlay onClose={closeHowToPlay} />}
    </div>
  );
}

export default App;
