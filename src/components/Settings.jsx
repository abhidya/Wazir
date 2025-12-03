import { useState } from 'react';
import { getScoringConfig, setScoringConfig, resetScoringConfig } from '../utils/scoring';
import { exportScoreboard, importScoreboard } from '../utils/storage';
import './Settings.css';

function Settings({ roomCode, onBack }) {
  const [scoring, setScoring] = useState(() => getScoringConfig());
  const [importText, setImportText] = useState('');
  const [exportText, setExportText] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleScoringChange = (outcome, role, value) => {
    const newScoring = {
      ...scoring,
      [outcome]: {
        ...scoring[outcome],
        [role]: parseInt(value) || 0
      }
    };
    setScoring(newScoring);
    setScoringConfig(newScoring);
    setMessage({ type: 'success', text: 'Scoring configuration saved.' });
    setTimeout(() => setMessage({ type: '', text: '' }), 2000);
  };

  const handleResetScoring = () => {
    const defaultConfig = resetScoringConfig();
    setScoring(defaultConfig);
    setMessage({ type: 'success', text: 'Scoring configuration reset to defaults.' });
    setTimeout(() => setMessage({ type: '', text: '' }), 2000);
  };

  const handleExport = () => {
    if (!roomCode) {
      setMessage({ type: 'error', text: 'No room code specified. Join a room first.' });
      return;
    }
    const json = exportScoreboard(roomCode);
    setExportText(json);
    setMessage({ type: 'success', text: 'Scoreboard exported. Copy the text below.' });
  };

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportText).then(() => {
      setMessage({ type: 'success', text: 'Copied to clipboard!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
    }).catch(() => {
      setMessage({ type: 'error', text: 'Failed to copy. Please select and copy manually.' });
    });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      setMessage({ type: 'error', text: 'Please paste scoreboard JSON to import.' });
      return;
    }
    
    const result = importScoreboard(importText);
    if (result.success) {
      setMessage({ type: 'success', text: `Scoreboard imported for room: ${result.roomCode}` });
      setImportText('');
    } else {
      setMessage({ type: 'error', text: `Import failed: ${result.error}` });
    }
  };

  return (
    <div className="settings">
      <header className="settings-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Settings</h1>
      </header>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Scoring Configuration */}
      <section className="settings-section">
        <h2>Scoring Configuration</h2>
        
        <div className="scoring-table">
          <h3>When WAZIR correctly identifies CHOR:</h3>
          <div className="scoring-grid">
            {['BADSHA', 'WAZIR', 'CHOR', 'SIPAHI'].map(role => (
              <div key={role} className="scoring-item">
                <label>{role}</label>
                <input
                  type="number"
                  value={scoring.wazirCorrect[role]}
                  onChange={(e) => handleScoringChange('wazirCorrect', role, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="scoring-table">
          <h3>When WAZIR fails (CHOR escapes):</h3>
          <div className="scoring-grid">
            {['BADSHA', 'WAZIR', 'CHOR', 'SIPAHI'].map(role => (
              <div key={role} className="scoring-item">
                <label>{role}</label>
                <input
                  type="number"
                  value={scoring.wazirWrong[role]}
                  onChange={(e) => handleScoringChange('wazirWrong', role, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="reset-button" onClick={handleResetScoring}>
          Reset to Defaults
        </button>
      </section>

      {/* Export/Import */}
      <section className="settings-section">
        <h2>Export/Import Scoreboard</h2>
        
        <div className="export-section">
          <h3>Export</h3>
          <p>Export current room scoreboard to save or share with others for reconciliation.</p>
          {roomCode && <p className="current-room">Current room: <strong>{roomCode}</strong></p>}
          <button className="export-button" onClick={handleExport}>
            Export Scoreboard
          </button>
          
          {exportText && (
            <div className="export-result">
              <textarea readOnly value={exportText} rows={6} />
              <button className="copy-button" onClick={handleCopyExport}>
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>

        <div className="import-section">
          <h3>Import</h3>
          <p>Paste previously exported scoreboard JSON to restore scores.</p>
          <textarea
            placeholder="Paste scoreboard JSON here..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={6}
          />
          <button className="import-button" onClick={handleImport}>
            Import Scoreboard
          </button>
        </div>
      </section>

      {/* Privacy Info */}
      <section className="settings-section privacy-section">
        <h2>Privacy Notice</h2>
        <p>
          This app is front-end only. All data is stored locally on your device.
          No information is sent to any server.
        </p>
        <p>
          <strong>Secrets rely on keeping your playerNumber private.</strong> Anyone who
          enters another player's private number can reveal their role on their device.
        </p>
        <p>
          Recommend physical private assignment of playerNumbers or single-use printed number slips.
        </p>
      </section>
    </div>
  );
}

export default Settings;
