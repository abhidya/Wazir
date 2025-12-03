import { useState, useEffect } from 'react';
import { getRoleForPlayer, getRoleTip, generateRoles } from '../utils/roleDistribution';
import { loadScoreboard, saveScoreboard, saveRoomState } from '../utils/storage';
import { calculateDeltas, applyDeltas, summarizeDeltas } from '../utils/scoring';
import './Game.css';

function Game({ roomCode, playerNumber, numPlayers, roundNumber: initialRound, displayName, onLeave }) {
  const [roundNumber, setRoundNumber] = useState(initialRound);
  const [showRole, setShowRole] = useState(false);
  const [showPostRound, setShowPostRound] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [scoreboard, setScoreboard] = useState(() => loadScoreboard(roomCode));
  const [wazirGuess, setWazirGuess] = useState('');
  const [showWazirGuessConfirm, setShowWazirGuessConfirm] = useState(false);

  const role = getRoleForPlayer(roomCode, roundNumber, numPlayers, playerNumber);
  const roleTip = getRoleTip(role);

  useEffect(() => {
    // Save room state whenever round changes
    saveRoomState(roomCode, { roundNumber, numPlayers });
  }, [roomCode, roundNumber, numPlayers]);

  const handleShowRole = () => {
    setShowRole(true);
  };

  const handleHideRole = () => {
    setShowRole(false);
  };

  const handleEndRound = () => {
    setShowPostRound(true);
  };

  const handleOutcomeSelect = (outcome) => {
    setSelectedOutcome(outcome);
    setShowConfirmation(true);
  };

  const handleConfirmPoints = () => {
    const deltas = calculateDeltas(roomCode, roundNumber, numPlayers, selectedOutcome);
    const newScoreboard = applyDeltas(scoreboard, deltas);
    
    setScoreboard(newScoreboard);
    saveScoreboard(roomCode, newScoreboard);
    
    // Reset and move to next round
    setShowPostRound(false);
    setShowConfirmation(false);
    setSelectedOutcome(null);
    setShowRole(false);
    setWazirGuess('');
    setRoundNumber(prev => prev + 1);
  };

  const handleCancelPoints = () => {
    setShowConfirmation(false);
    setSelectedOutcome(null);
  };

  const handleCancelPostRound = () => {
    setShowPostRound(false);
    setSelectedOutcome(null);
  };

  const handleSkipRound = () => {
    // Skip round without applying points (for aborted rounds)
    setShowRole(false);
    setWazirGuess('');
    setRoundNumber(prev => prev + 1);
  };

  const handleWazirGuess = () => {
    setShowWazirGuessConfirm(true);
  };

  const confirmWazirGuess = () => {
    setShowWazirGuessConfirm(false);
    // Just local recording - no actual network action
    alert(`You have recorded your guess: Player ${wazirGuess} is the CHOR. Remember this for the reveal!`);
  };

  const cancelWazirGuess = () => {
    setShowWazirGuessConfirm(false);
  };

  // Calculate deltas for confirmation dialog
  const getDeltasSummary = () => {
    if (!selectedOutcome) return [];
    const roles = generateRoles(roomCode, roundNumber, numPlayers);
    const deltas = calculateDeltas(roomCode, roundNumber, numPlayers, selectedOutcome);
    return summarizeDeltas(deltas, roles);
  };

  return (
    <div className="game">
      <header className="game-header">
        <div className="game-info">
          <span>Room: {roomCode}</span>
          <span>Round: {roundNumber}</span>
          <span>Players: {numPlayers}</span>
        </div>
        <button className="leave-button" onClick={onLeave}>Leave</button>
      </header>

      {displayName && <div className="player-name">Playing as: {displayName}</div>}

      {/* Role Reveal Section */}
      <div className="role-section">
        {!showRole ? (
          <div className="role-reveal-prompt">
            <p className="privacy-reminder">
              ⚠️ Do not show this screen to others
            </p>
            <p>Show my role for player number <strong>{playerNumber}</strong></p>
            <button className="show-role-button" onClick={handleShowRole}>
              Show My Role
            </button>
          </div>
        ) : (
          <div className="role-display">
            <div className={`role-badge role-${role.toLowerCase()}`}>
              {role}
            </div>
            <p className="role-tip">{roleTip}</p>
            
            {/* WAZIR Guess UI */}
            {role === 'WAZIR' && (
              <div className="wazir-guess-section">
                <h3>WAZIR, choose the player number you think is the CHOR</h3>
                <div className="wazir-guess-input">
                  <select 
                    value={wazirGuess} 
                    onChange={(e) => setWazirGuess(e.target.value)}
                    className="guess-select"
                  >
                    <option value="">Select player...</option>
                    {Array.from({ length: numPlayers }, (_, i) => i + 1)
                      .filter(num => num !== playerNumber)
                      .map(num => (
                        <option key={num} value={num}>Player {num}</option>
                      ))}
                  </select>
                  <button 
                    className="confirm-guess-button"
                    onClick={handleWazirGuess}
                    disabled={!wazirGuess}
                  >
                    Confirm Guess
                  </button>
                </div>
              </div>
            )}
            
            <button className="hide-role-button" onClick={handleHideRole}>
              Hide Role
            </button>
          </div>
        )}
      </div>

      {/* Round Controls */}
      <div className="round-controls">
        <button className="end-round-button" onClick={handleEndRound}>
          End Round (Apply Points)
        </button>
        <button className="skip-round-button" onClick={handleSkipRound}>
          Skip Round (Aborted)
        </button>
      </div>

      {/* Scoreboard Preview */}
      <div className="scoreboard-preview">
        <h3>Current Scores</h3>
        <div className="scores-list">
          {Object.entries(scoreboard).length === 0 ? (
            <p className="no-scores">No scores yet</p>
          ) : (
            Object.entries(scoreboard)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([playerNum, score]) => (
                <div key={playerNum} className={`score-item ${parseInt(playerNum) === playerNumber ? 'current-player' : ''}`}>
                  <span>Player {playerNum}{parseInt(playerNum) === playerNumber ? ' (You)' : ''}</span>
                  <span className="score-value">{score}</span>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Post-Round Modal */}
      {showPostRound && !showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Who won this round?</h2>
            <p>The group performs the physical reveal and decides the result.</p>
            <div className="outcome-buttons">
              <button 
                className="outcome-button wazir-won"
                onClick={() => handleOutcomeSelect('wazirCorrect')}
              >
                WAZIR succeeded
              </button>
              <button 
                className="outcome-button chor-won"
                onClick={() => handleOutcomeSelect('wazirWrong')}
              >
                CHOR succeeded
              </button>
            </div>
            <button className="cancel-button" onClick={handleCancelPostRound}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Points</h2>
            <p>
              {selectedOutcome === 'wazirCorrect' 
                ? 'WAZIR correctly identified the CHOR!'
                : 'CHOR escaped detection!'
              }
            </p>
            <div className="deltas-summary">
              <h3>Points to be applied:</h3>
              {getDeltasSummary().map(({ playerNumber: pNum, role: pRole, delta }) => (
                <div key={pNum} className={`delta-item ${pNum === playerNumber ? 'current-player' : ''}`}>
                  <span>
                    Player {pNum} ({pRole}){pNum === playerNumber ? ' - You' : ''}:
                  </span>
                  <span className={`delta-value ${delta > 0 ? 'positive' : delta < 0 ? 'negative' : ''}`}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                </div>
              ))}
            </div>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmPoints}>
                Apply Points
              </button>
              <button className="cancel-button" onClick={handleCancelPoints}>
                Cancel
              </button>
            </div>
            <p className="sync-warning">
              Points applied locally on this phone. Others must also apply to keep scores consistent.
            </p>
          </div>
        </div>
      )}

      {/* WAZIR Guess Confirmation */}
      {showWazirGuessConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Your Guess</h2>
            <p>You think Player {wazirGuess} is the CHOR.</p>
            <p>This is recorded locally for your reference.</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={confirmWazirGuess}>
                Confirm
              </button>
              <button className="cancel-button" onClick={cancelWazirGuess}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
