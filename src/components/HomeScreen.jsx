import { useState } from "react";
import "./HomeScreen.css";

const BASE = import.meta.env.BASE_URL;

function HomeScreen({ onPlayNow, onJoinRoom, onCreateRoom, onHowToPlay, onCreateOnlineRoom, onJoinOnlineRoom }) {
  const [posterLoaded, setPosterLoaded] = useState(false);

  return (
    <div className="homescreen">
      <div
        className="homescreen-bg"
        style={{ backgroundImage: `url(${BASE}media/home-poster.png)` }}
      />
      <div className="homescreen-overlay" />

      {!posterLoaded && (
        <div className="homescreen-loader">
          <div className="loader-pulse" />
        </div>
      )}
      <img
        src={`${BASE}media/home-poster.png`}
        alt=""
        onLoad={() => setPosterLoaded(true)}
        onError={() => setPosterLoaded(true)}
        style={{ display: "none" }}
      />

      <div className="homescreen-content">
        <h1 className="homescreen-title">MERA WAZEER KAUN?</h1>
        <p className="homescreen-subtitle">
          BADSHAH &middot; WAZEER &middot; CHOR &middot; SIPAHI
        </p>
        <p className="homescreen-tagline">
          Play with friends. Bluff. Accuse. Survive. Trust no one.
        </p>

      <div className="homescreen-buttons">
        <button className="arcade-btn arcade-btn-gold" onClick={onPlayNow}>
          PLAY NOW
        </button>
        <button className="arcade-btn arcade-btn-teal" onClick={onJoinRoom}>
          JOIN ROOM
        </button>
        <button
          className="arcade-btn arcade-btn-purple"
          onClick={onCreateRoom}
        >
          CREATE ROOM
        </button>
        <div className="homescreen-divider">
          <span className="homescreen-divider-line" />
          <span className="homescreen-divider-text">ONLINE</span>
          <span className="homescreen-divider-line" />
        </div>
        <button
          className="arcade-btn arcade-btn-teal"
          onClick={onCreateOnlineRoom}
        >
          CREATE ONLINE ROOM
        </button>
        <button
          className="arcade-btn arcade-btn-purple"
          onClick={onJoinOnlineRoom}
        >
          JOIN ONLINE ROOM
        </button>
        <button className="arcade-btn arcade-btn-ghost" onClick={onHowToPlay}>
          HOW TO PLAY
        </button>
      </div>
      </div>


    </div>
  );
}

export default HomeScreen;
