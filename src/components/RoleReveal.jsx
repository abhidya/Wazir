import { useState, useRef, useEffect } from "react";
import "./RoleReveal.css";

const BASE = import.meta.env.BASE_URL;

const ROLE_MEDIA = {
  BADSHA: `${BASE}media/role-badshah.mp4`,
  BADSHAH: `${BASE}media/role-badshah.mp4`,
  WAZIR: `${BASE}media/role-wazir.mp4`,
  CHOR: `${BASE}media/role-chor.mp4`,
  SIPAHI: `${BASE}media/role-sipahi.mp4`,
};

const ROLE_COLORS = {
  BADSHA: "gold",
  BADSHAH: "gold",
  WAZIR: "teal",
  CHOR: "crimson",
  SIPAHI: "cyan",
};

const ROLE_TIPS = {
  BADSHA: "Decide the WAZIR and ask the question aloud.",
  BADSHAH: "Decide the WAZIR and ask the question aloud.",
  WAZIR: "Detect and identify the CHOR.",
  CHOR: "Blend in with SIPAHI. Don't get caught.",
  SIPAHI: "Observe and help identify the CHOR.",
};

function RoleReveal({ role, onReady }) {
  const [phase, setPhase] = useState("privacy");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleShowRole = () => {
    setPhase("video");
  };

  const handleVideoCanPlay = () => {
    setVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setPhase("card");
  };

  const handleVideoError = () => {
    setVideoFailed(true);
    setPhase("card");
  };

  const handleSkipVideo = () => {
    setVideoFailed(true);
    setPhase("card");
  };

  const handleReady = () => {
    onReady();
  };

  const normalizedRole = role === "BADSHA" ? "BADSHAH" : role;
  const videoSrc = ROLE_MEDIA[normalizedRole] || ROLE_MEDIA[role];
  const roleColor = ROLE_COLORS[normalizedRole] || ROLE_COLORS[role] || "cyan";
  const roleTip = ROLE_TIPS[normalizedRole] || ROLE_TIPS[role] || "";

  return (
    <div className={`rolereveal rolereveal-${roleColor}`}>
      {phase === "privacy" && (
        <div className="rolereveal-privacy">
          <div className="rolereveal-privacy-icon">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="rolereveal-privacy-title">Secret Identity</h2>
          <p className="rolereveal-privacy-text">
            Hide your screen from others.
            <br />
            Your role is about to reveal.
          </p>
          <button
            className="arcade-btn arcade-btn-gold"
            onClick={handleShowRole}
          >
            REVEAL MY ROLE
          </button>
        </div>
      )}

      {phase === "video" && !videoFailed && (
        <div className="rolereveal-video-container">
          <video
            ref={videoRef}
            className="rolereveal-video"
            src={videoSrc}
            muted
            playsInline
            autoPlay
            preload="metadata"
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onCanPlay={handleVideoCanPlay}
          />
          <button className="rolereveal-skip-btn" onClick={handleSkipVideo}>
            Skip Video
          </button>
          {videoPlaying && (
            <div className="rolereveal-video-hint">Playing role reveal...</div>
          )}
          {!videoPlaying && !videoFailed && (
            <div className="rolereveal-video-hint">Loading...</div>
          )}
        </div>
      )}

      {phase === "card" && (
        <div className="rolereveal-card">
          <div
            className={`rolereveal-card-badge rolereveal-badge-${roleColor}`}
          >
            {role}
          </div>
          <p className="rolereveal-card-tip">{roleTip}</p>
          <button className="arcade-btn arcade-btn-gold" onClick={handleReady}>
            I&apos;M READY
          </button>
        </div>
      )}
    </div>
  );
}

export default RoleReveal;
