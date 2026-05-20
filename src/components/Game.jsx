import { useState, useEffect } from 'react';
import { getRoleForPlayer, getRoleTip, generateRoles } from '../utils/roleDistribution';
import { loadScoreboard, saveScoreboard, saveRoomState } from '../utils/storage';
import { calculateDeltas, applyDeltas, summarizeDeltas } from '../utils/scoring';
import RoleReveal from './RoleReveal';
import './Game.css';

const PHASES = {
  SECRET_REVEAL: 'secretReveal',
  BLUFF: 'bluff',
  WAZIR_GUESS: 'wazirGuess',
  POST_ROUND: 'postRound',
  SCORE_REVEAL: 'scoreReveal',
};

const ROLE_COLORS = {
  BADSHA: 'gold',
  WAZIR: 'teal',
  CHOR: 'crimson',
  SIPAHI: 'cyan',
};

function Game({ roomCode, playerNumber, numPlayers, roundNumber: initialRound, displayName, onLeave }) {
  const [roundNumber, setRoundNumber] = useState(initialRound);
  const [phase, setPhase] = useState(PHASES.SECRET_REVEAL);
  const [roleRevealed, setRoleRevealed] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scoreboard, setScoreboard] = useState(() => loadScoreboard(roomCode));
  const [wazirGuess, setWazirGuess] = useState('');
  const [showWazirGuessConfirm, setShowWazirGuessConfirm] = useState(false);
  const [lastDeltas, setLastDeltas] = useState(null);
  const [lastOutcome, setLastOutcome] = useState(null);

  const role = getRoleForPlayer(roomCode, roundNumber, numPlayers, playerNumber);
  const roleTip = getRoleTip(role);
  const roleColor = ROLE_COLORS[role] || 'cyan';

  useEffect(() => {
    saveRoomState(roomCode, { roundNumber, numPlayers });
  }, [roomCode, roundNumber, numPlayers]);

  const handleRoleReady = () => {
    setRoleRevealed(true);
    setPhase(PHASES.BLUFF);
  };

  const handleStartGuess = () => {
    if (role === 'WAZIR') {
      setPhase(PHASES.WAZIR_GUESS);
    } else {
      setPhase(PHASES.POST_ROUND);
    }
  };

  const handleWazirGuessSelect = (num) => {
    setWazirGuess(num);
  };

  const handleWazirGuessConfirm = () => {
    setShowWazirGuessConfirm(true);
  };

  const confirmWazirGuess = () => {
    setShowWazirGuessConfirm(false);
    setPhase(PHASES.POST_ROUND);
  };

  const cancelWazirGuess = () => {
    setShowWazirGuessConfirm(false);
  };

  const handleEndRound = () => {
    setPhase(PHASES.POST_ROUND);
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
    setLastDeltas(summarizeDeltas(deltas, generateRoles(roomCode, roundNumber, numPlayers)));
    setLastOutcome(selectedOutcome);

    setShowConfirmation(false);
    setSelectedOutcome(null);
    setRoleRevealed(false);
    setWazirGuess('');
    setPhase(PHASES.SCORE_REVEAL);
  };

  const handleCancelPoints = () => {
    setShowConfirmation(false);
    setSelectedOutcome(null);
  };

  const handleNextRound = () => {
    setLastDeltas(null);
    setLastOutcome(null);
    setRoundNumber(prev => prev + 1);
    setPhase(PHASES.SECRET_REVEAL);
  };

  const handleSkipRound = () => {
    setRoleRevealed(false);
    setWazirGuess('');
    setRoundNumber(prev => prev + 1);
    setPhase(PHASES.SECRET_REVEAL);
  };

  const getDeltasSummary = () => {
    if (!selectedOutcome) return [];
    const roles = generateRoles(roomCode, roundNumber, numPlayers);
    const deltas = calculateDeltas(roomCode, roundNumber, numPlayers, selectedOutcome);
    return summarizeDeltas(deltas, roles);
  };

  const sortedScores = Object.entries(scoreboard)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="game">
      <div className="game-bg" />

      <header className="game-header">
        <div className="game-info">
          <span className="game-room">Room: <strong>{roomCode}</strong></span>
          <span className="game-round">Round {roundNumber}</span>
          <span className="game-players">{numPlayers} Players</span>
        </div>
        <button className="game-leave-btn" onClick={onLeave}>Leave</button>
      </header>

      {displayName && (
        <div className="game-player-name">Playing as: <strong>{displayName}</strong></div>
      )}

      {/* Phase: Secret Reveal */}
      {phase === PHASES.SECRET_REVEAL && !roleRevealed && (
        <RoleReveal role={role} onReady={handleRoleReady} />
      )}

      {/* Phase: Bluff */}
      {phase === PHASES.BLUFF && (
        <div className="game-phase">
          <div className={`game-role-indicator game-role-${roleColor}`}>
            You are the <strong>{role}</strong>
          </div>
          <p className="game-role-tip">{roleTip}</p>

          <div className="bluff-screen">
            <h2 className="bluff-title">Accuse. Defend. Lie.</h2>
            <p className="bluff-subtitle">
              {role === 'BADSHA' && 'Ask the WAZEER a question aloud.'}
              {role === 'WAZIR' && 'Listen carefully. Who is the CHOR?'}
              {role === 'CHOR' && 'Blend in. Act like a SIPAHI.'}
              {role === 'SIPAHI' && 'Watch and observe. Help the WAZEER.'}
            </p>
            <button className="arcade-btn arcade-btn-gold" onClick={handleStartGuess}>
              {role === 'WAZIR' ? 'MAKE YOUR GUESS' : 'END ROUND'}
            </button>
          </div>

          <div className="game-round-controls">
            <button className="arcade-btn arcade-btn-ghost" onClick={handleSkipRound}>
              SKIP ROUND (ABORTED)
            </button>
          </div>
        </div>
      )}

      {/* Phase: WAZIR Guess */}
      {phase === PHASES.WAZIR_GUESS && (
        <div className="game-phase">
          <h2 className="guess-title">
            WAZEER, WHO IS THE CHOR?
          </h2>
          <div className="guess-cards">
            {Array.from({ length: numPlayers }, (_, i) => i + 1)
              .filter(num => num !== playerNumber)
              .map(num => (
                <button
                  key={num}
                  className={`guess-card ${wazirGuess === num ? 'guess-card-selected' : ''}`}
                  onClick={() => handleWazirGuessSelect(num)}
                >
                  <span className="guess-card-number">{num}</span>
                  <span className="guess-card-label">Player {num}</span>
                </button>
              ))}
          </div>
          <button
            className="arcade-btn arcade-btn-teal"
            onClick={handleWazirGuessConfirm}
            disabled={!wazirGuess}
          >
            ACCUSE PLAYER {wazirGuess || '?'}
          </button>
          <div className="guess-disclaimer">
            Local only — recorded for your reference
          </div>

          {showWazirGuessConfirm && (
            <div className="modal-overlay" onClick={cancelWazirGuess}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <h2>Confirm Your Accusation</h2>
                <p>You believe Player {wazirGuess} is the CHOR.</p>
                <p>This is recorded locally for your reference during the group reveal.</p>
                <div className="modal-buttons">
                  <button className="arcade-btn arcade-btn-teal" onClick={confirmWazirGuess}>
                    CONFIRM
                  </button>
                  <button className="arcade-btn arcade-btn-ghost" onClick={cancelWazirGuess}>
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Phase: Post Round */}
      {phase === PHASES.POST_ROUND && !showConfirmation && (
        <div className="game-phase">
          <h2 className="outcome-title">Who won this round?</h2>
          <p className="outcome-subtitle">The group performs the physical reveal and decides the result.</p>
          <div className="outcome-buttons">
            <button
              className="arcade-btn arcade-btn-teal outcome-btn"
              onClick={() => handleOutcomeSelect('wazirCorrect')}
            >
              WAZEER CAUGHT THE CHOR
            </button>
            <button
              className="arcade-btn arcade-btn-crimson outcome-btn"
              onClick={() => handleOutcomeSelect('wazirWrong')}
            >
              CHOR ESCAPED!
            </button>
          </div>
          <button className="arcade-btn arcade-btn-ghost" onClick={handleSkipRound}>
            SKIP ROUND (ABORTED)
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay" onClick={handleCancelPoints}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Confirm Points</h2>
            <p className="outcome-result">
              {selectedOutcome === 'wazirCorrect'
                ? 'WAZEER correctly identified the CHOR!'
                : 'CHOR escaped detection!'}
            </p>
            <div className="deltas-summary">
              <h3>Points to be applied:</h3>
              {getDeltasSummary().map(({ playerNumber: pNum, role: pRole, delta }) => (
                <div key={pNum} className={`delta-item ${pNum === playerNumber ? 'delta-item-you' : ''}`}>
                  <span>
                    Player {pNum} ({pRole}){pNum === playerNumber ? ' — You' : ''}
                  </span>
                  <span className={`delta-value ${delta > 0 ? 'delta-positive' : delta < 0 ? 'delta-negative' : ''}`}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="arcade-btn arcade-btn-gold" onClick={handleConfirmPoints}>
                APPLY POINTS
              </button>
              <button className="arcade-btn arcade-btn-ghost" onClick={handleCancelPoints}>
                CANCEL
              </button>
            </div>
            <p className="sync-warning">
              Points applied locally on this phone. Others must also apply to keep scores consistent.
            </p>
          </div>
        </div>
      )}

      {/* Phase: Score Reveal */}
      {phase === PHASES.SCORE_REVEAL && (
        <div className="game-phase">
          <div className="score-reveal">
            <div className={`score-headline ${lastOutcome === 'wazirCorrect' ? 'headline-wazir' : 'headline-chor'}`}>
              {lastOutcome === 'wazirCorrect' ? 'WAZEER CAUGHT THE CHOR!' : 'CHOR ESCAPED!'}
            </div>

            {lastDeltas && (
              <div className="score-deltas">
                {lastDeltas.map(({ playerNumber: pNum, delta }) => (
                  <div key={pNum} className={`score-delta ${pNum === playerNumber ? 'score-delta-you' : ''} ${delta > 0 ? 'score-delta-pos' : delta < 0 ? 'score-delta-neg' : 'score-delta-zero'}`}>
                    <span>Player {pNum}{pNum === playerNumber ? ' (You)' : ''}</span>
                    <span className="score-delta-value">{delta > 0 ? '+' : ''}{delta}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="scoreboard">
              <h3 className="scoreboard-title">Scoreboard</h3>
              {sortedScores.length === 0 ? (
                <p className="scoreboard-empty">No scores yet</p>
              ) : (
                <div className="scoreboard-list">
                  {sortedScores.map(([playerNum, score], index) => (
                    <div
                      key={playerNum}
                      className={`scoreboard-item ${parseInt(playerNum) === playerNumber ? 'scoreboard-item-you' : ''} ${index === 0 ? 'scoreboard-item-leader' : ''}`}
                    >
                      <div className="scoreboard-rank">
                        {index === 0 && <span className="scoreboard-crown">&#x1F451;</span>}
                        <span>#{index + 1}</span>
                      </div>
                      <div className="scoreboard-name">
                        Player {playerNum}
                        {parseInt(playerNum) === playerNumber && <span className="scoreboard-you-tag">YOU</span>}
                      </div>
                      <div className="scoreboard-score">{score}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="arcade-btn arcade-btn-gold" onClick={handleNextRound}>
              NEXT ROUND
            </button>
          </div>
        </div>
      )}

      {/* Inline scoreboard when not in score reveal phase */}
      {phase !== PHASES.SCORE_REVEAL && phase !== PHASES.SECRET_REVEAL && (
        <div className="game-scoreboard-mini">
          <h3>Scores</h3>
          <div className="game-scores-list">
            {sortedScores.length === 0 ? (
              <p className="game-no-scores">No scores yet</p>
            ) : (
              sortedScores.map(([playerNum, score]) => (
                <div key={playerNum} className={`game-score-row ${parseInt(playerNum) === playerNumber ? 'game-score-you' : ''}`}>
                  <span>Player {playerNum}{parseInt(playerNum) === playerNumber ? ' (You)' : ''}</span>
                  <span className="game-score-val">{score}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
