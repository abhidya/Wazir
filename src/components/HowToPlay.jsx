import { useState } from 'react';
import './HowToPlay.css';

function HowToPlay({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal howtoplay-modal" onClick={e => e.stopPropagation()}>
        <h2 className="howtoplay-title">HOW TO PLAY</h2>

        <div className="howtoplay-section">
          <h3>Roles</h3>
          <div className="howtoplay-roles">
            <div className="howtoplay-role howtoplay-role-gold">
              <strong>BADSHAH</strong> - The King. Decides the WAZIR and asks the question.
            </div>
            <div className="howtoplay-role howtoplay-role-teal">
              <strong>WAZEER</strong> - The Minister. Must find the CHOR.
            </div>
            <div className="howtoplay-role howtoplay-role-crimson">
              <strong>CHOR</strong> - The Thief. Must blend in and escape.
            </div>
            <div className="howtoplay-role howtoplay-role-cyan">
              <strong>SIPAHI</strong> - The Soldier. Helps the WAZEER.
            </div>
          </div>
        </div>

        <div className="howtoplay-section">
          <h3>Setup</h3>
          <ol>
            <li>All players enter the same Room Code on their phones</li>
            <li>Privately assign player numbers (folded slips, hat draw, etc.)</li>
            <li>Each player enters their secret player number</li>
            <li>Tap &quot;Reveal My Role&quot; — hide your screen from others!</li>
          </ol>
        </div>

        <div className="howtoplay-section">
          <h3>Gameplay</h3>
          <ol>
            <li>BADSHAH asks the WAZIR a question aloud</li>
            <li>WAZEER must identify who they think is the CHOR</li>
            <li>CHOR tries to blend in with SIPAHI</li>
            <li>Group performs the physical reveal</li>
            <li>Each player taps the outcome on their phone</li>
          </ol>
        </div>

        <div className="howtoplay-section">
          <h3>Scoring</h3>
          <div className="howtoplay-scoring">
            <div>WAZEER finds CHOR: WAZEER +5, BADSHAH +3, SIPAHI +1, CHOR +0</div>
            <div>CHOR escapes: CHOR +6, WAZEER -1, BADSHAH +0, SIPAHI +0</div>
          </div>
        </div>

        <div className="howtoplay-privacy">
          This app is front-end only. No data leaves your phone. Secrets rely on keeping your player number private.
        </div>

        <button className="arcade-btn arcade-btn-gold" onClick={onClose}>
          GOT IT
        </button>
      </div>
    </div>
  );
}

export default HowToPlay;
