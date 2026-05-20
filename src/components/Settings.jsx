import { useState } from "react";
import {
  getScoringConfig,
  setScoringConfig,
  resetScoringConfig,
} from "../utils/scoring";
import {
  exportScoreboard,
  importScoreboard,
  loadGameMode,
  saveGameMode,
} from "../utils/storage";
import "./Settings.css";

function Settings({ roomCode, onBack }) {
  const [scoring, setScoring] = useState(() => getScoringConfig());
  const [importText, setImportText] = useState("");
  const [exportText, setExportText] = useState("");
  const [gameMode, setGameMode] = useState(() => loadGameMode());
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleScoringChange = (outcome, role, value) => {
    const newScoring = {
      ...scoring,
      [outcome]: {
        ...scoring[outcome],
        [role]: parseInt(value) || 0,
      },
    };
    setScoring(newScoring);
    setScoringConfig(newScoring);
    setMessage({ type: "success", text: "Scoring configuration saved." });
    setTimeout(() => setMessage({ type: "", text: "" }), 2000);
  };

  const handleResetScoring = () => {
    const defaultConfig = resetScoringConfig();
    setScoring(defaultConfig);
    setMessage({
      type: "success",
      text: "Scoring configuration reset to defaults.",
    });
    setTimeout(() => setMessage({ type: "", text: "" }), 2000);
  };

  const handleExport = () => {
    if (!roomCode) {
      setMessage({
        type: "error",
        text: "No room code specified. Join a room first.",
      });
      return;
    }
    const json = exportScoreboard(roomCode);
    setExportText(json);
    setMessage({
      type: "success",
      text: "Scoreboard exported. Copy the text below.",
    });
  };

  const handleCopyExport = () => {
    navigator.clipboard
      .writeText(exportText)
      .then(() => {
        setMessage({ type: "success", text: "Copied to clipboard!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 2000);
      })
      .catch(() => {
        setMessage({
          type: "error",
          text: "Failed to copy. Please select and copy manually.",
        });
      });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setMessage({
        type: "error",
        text: "Please paste scoreboard JSON to import.",
      });
      return;
    }

    const result = importScoreboard(importText);
    if (result.success) {
      setMessage({
        type: "success",
        text: `Scoreboard imported for room: ${result.roomCode}`,
      });
      setImportText("");
    } else {
      setMessage({ type: "error", text: `Import failed: ${result.error}` });
    }
  };

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
    saveGameMode(mode);
    setMessage({
      type: "success",
      text: `Game mode set to ${mode === "peer" ? "Online Sync" : "Manual/Offline"}.`,
    });
    setTimeout(() => setMessage({ type: "", text: "" }), 2000);
  };

  const roleColors = {
    BADSHA: "var(--role-badshah)",
    WAZIR: "var(--role-wazir)",
    CHOR: "var(--role-chor)",
    SIPAHI: "var(--role-sipahi)",
  };

  return (
    <div className="settings">
      <div className="settings-bg" />

      <div className="settings-inner">
        <header className="settings-header">
          <button className="settings-back-btn" onClick={onBack}>
            &larr; Back
          </button>
          <h1 className="settings-title">Settings</h1>
        </header>

        {message.text && (
          <div className={`settings-message settings-message-${message.type}`}>
            {message.text}
          </div>
        )}

        <section className="settings-section">
          <h2>Scoring Configuration</h2>

          <div className="settings-scoring-block">
            <h3>When WAZEER correctly identifies CHOR:</h3>
            <div className="settings-scoring-grid">
              {["BADSHA", "WAZIR", "CHOR", "SIPAHI"].map((r) => (
                <div key={r} className="settings-scoring-item">
                  <label style={{ color: roleColors[r] }}>{r}</label>
                  <input
                    type="number"
                    value={scoring.wazirCorrect[r]}
                    onChange={(e) =>
                      handleScoringChange("wazirCorrect", r, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="settings-scoring-block">
            <h3>When WAZEER fails (CHOR escapes):</h3>
            <div className="settings-scoring-grid">
              {["BADSHA", "WAZIR", "CHOR", "SIPAHI"].map((r) => (
                <div key={r} className="settings-scoring-item">
                  <label style={{ color: roleColors[r] }}>{r}</label>
                  <input
                    type="number"
                    value={scoring.wazirWrong[r]}
                    onChange={(e) =>
                      handleScoringChange("wazirWrong", r, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="arcade-btn arcade-btn-ghost settings-reset-btn"
            onClick={handleResetScoring}
          >
            RESET TO DEFAULTS
          </button>
        </section>

      <section className="settings-section">
        <h2>Export / Import Scoreboard</h2>

        <div className="settings-export">
          <h3>Export</h3>
          <p>
            Export current room scoreboard to save or share for
            reconciliation.
          </p>
          {roomCode && (
            <p className="settings-current-room">
              Current room: <strong>{roomCode}</strong>
            </p>
          )}
          <button
            className="arcade-btn arcade-btn-purple"
            onClick={handleExport}
          >
            EXPORT SCOREBOARD
          </button>

          {exportText && (
            <div className="settings-export-result">
              <textarea readOnly value={exportText} rows={6} />
              <button
                className="arcade-btn arcade-btn-ghost"
                onClick={handleCopyExport}
              >
                COPY TO CLIPBOARD
              </button>
            </div>
          )}
        </div>

        <div className="settings-import">
          <h3>Import</h3>
          <p>Paste previously exported scoreboard JSON to restore scores.</p>
          <textarea
            placeholder="Paste scoreboard JSON here..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
          />
          <button
            className="arcade-btn arcade-btn-teal"
            onClick={handleImport}
          >
            IMPORT SCOREBOARD
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h2>Connectivity / Game Mode</h2>
        <p className="settings-gamemode-desc">
          Choose how players interact. Manual/Offline mode works without
          network. Online Sync mode uses peer-to-peer connections to keep all
          players in sync.
        </p>
        <div className="settings-gamemode-options">
          <button
            className={`arcade-btn ${gameMode === "manual" ? "arcade-btn-gold" : "arcade-btn-ghost"} settings-gamemode-btn`}
            onClick={() => handleGameModeChange("manual")}
          >
            MANUAL / OFFLINE
          </button>
          <button
            className={`arcade-btn ${gameMode === "peer" ? "arcade-btn-teal" : "arcade-btn-ghost"} settings-gamemode-btn`}
            onClick={() => handleGameModeChange("peer")}
          >
            ONLINE SYNC
          </button>
        </div>
        {gameMode === "peer" && (
          <div className="settings-gamemode-note">
            Online Sync requires all players to have internet access. One
            player creates a room and others join using the room code.
          </div>
        )}
      </section>
      </div>
    </div>
  );
}

export default Settings;
