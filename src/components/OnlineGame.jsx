import { useState, useEffect, useCallback, useRef } from "react";
import { MSG } from "../network/PeerJsRoomTransport";
import {
  generateRoles,
  getRoleForPlayer,
  getRoleTip,
} from "../utils/roleDistribution";
import {
  applyDeltas,
  getScoringConfig,
} from "../utils/scoring";
import { saveOnlineRoomSnapshot } from "../utils/storage";
import RoleReveal from "./RoleReveal";
import "./OnlineGame.css";

const PHASES = {
  SECRET_REVEAL: "secretReveal",
  BLUFF: "bluff",
  WAZIR_GUESS: "wazirGuess",
  POST_ROUND: "postRound",
  SCORE_REVEAL: "scoreReveal",
};

const ROLE_COLORS = {
  BADSHA: "gold",
  WAZIR: "teal",
  CHOR: "crimson",
  SIPAHI: "cyan",
};

function OnlineGame({ transport, onlineInfo, onLeave }) {
  const { roomCode, clientId, displayName, isHost } = onlineInfo;

  const [phase, setPhase] = useState(PHASES.SECRET_REVEAL);
  const [roundNumber, setRoundNumber] = useState(1);
  const [roster, setRoster] = useState(transport.roster);
  const [roleRevealed, setRoleRevealed] = useState(false);
  const [explicitRole, setExplicitRole] = useState(null);
  const [wazirGuessClientId, setWazirGuessClientId] = useState(null);
  const [showWazirGuessConfirm, setShowWazirGuessConfirm] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scoreboardByClientId, setScoreboardByClientId] = useState({});
  const [lastDeltas, setLastDeltas] = useState(null);
  const [lastOutcome, setLastOutcome] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [hostAppliedRound, setHostAppliedRound] = useState(false);

  const stateRef = useRef({});
  useEffect(() => {
    stateRef.current = {
      phase,
      roundNumber,
      scoreboardByClientId,
      roster,
      selectedOutcome,
      hostAppliedRound,
      lastOutcome,
    };
  }, [phase, roundNumber, scoreboardByClientId, roster, selectedOutcome, hostAppliedRound, lastOutcome]);

  const numPlayers = roster.filter((p) => p.connected).length;

  const seatNumberOf = useCallback((cId) => {
    const entry = roster.find((p) => p.clientId === cId);
    return entry ? entry.seatNumber : 0;
  }, [roster]);

  const displayNameOf = useCallback((cId) => {
    const entry = roster.find((p) => p.clientId === cId);
    return entry ? entry.displayName : cId;
  }, [roster]);

  const computeRoleForClientId = useCallback(
    (cId, round) => {
      const seat = seatNumberOf(cId);
      if (!seat || numPlayers < 4) return "SIPAHI";
      return getRoleForPlayer(roomCode, round, numPlayers, seat);
    },
    [roomCode, numPlayers, seatNumberOf],
  );

  const hostComputedRole = isHost && numPlayers >= 4
    ? computeRoleForClientId(clientId, roundNumber)
    : null;

const myRole = explicitRole || hostComputedRole;
const roleTip = myRole ? getRoleTip(myRole) : "";

const broadcastPublicState = useCallback(
    (overrides = {}) => {
      if (!isHost) return;
      const state = {
        mode: "peer",
        roomCode,
        hostClientId: clientId,
        roundNumber: stateRef.current.roundNumber,
        phase: stateRef.current.phase,
        roster: stateRef.current.roster,
        scoreboardByClientId: stateRef.current.scoreboardByClientId,
        ...overrides,
      };
      transport.setPublicState(state);
      transport.broadcast({ type: MSG.PUBLIC_STATE, ...state });
    },
    [isHost, transport, roomCode, clientId],
  );

  const sendPrivateRoles = useCallback(
    (round) => {
      if (!isHost) return;
      const connectedPlayers = roster.filter((p) => p.connected);
      for (const player of connectedPlayers) {
        if (player.isHost) {
          const hostRole = computeRoleForClientId(player.clientId, round);
          setExplicitRole(hostRole);
          continue;
        }
        const role = computeRoleForClientId(player.clientId, round);
        transport.sendToClient(player.clientId, {
          type: MSG.PRIVATE_ROLE,
          roundNumber: round,
          role,
        });
      }
    },
    [isHost, roster, transport, computeRoleForClientId],
  );

  const advanceToPhase = useCallback(
    (newPhase, newRound) => {
      setPhase(newPhase);
      if (newRound !== undefined) {
        setRoundNumber(newRound);
      }
      if (isHost) {
        broadcastPublicState({
          phase: newPhase,
          roundNumber: newRound !== undefined ? newRound : stateRef.current.roundNumber,
        });
      }
    },
    [isHost, broadcastPublicState],
  );

  const handleRoleReady = useCallback(() => {
    setRoleRevealed(true);
    if (isHost) {
      advanceToPhase(PHASES.BLUFF);
    }
  }, [isHost, advanceToPhase]);

  const handleStartGuess = useCallback(() => {
    if (myRole === "WAZIR") {
      if (isHost) {
        advanceToPhase(PHASES.WAZIR_GUESS);
      } else {
        setPhase(PHASES.WAZIR_GUESS);
      }
    } else {
      if (isHost) {
        advanceToPhase(PHASES.POST_ROUND);
      } else {
        setPhase(PHASES.POST_ROUND);
      }
    }
  }, [myRole, isHost, advanceToPhase]);

  const handleWazirGuessSelect = useCallback((cId) => {
    setWazirGuessClientId(cId);
  }, []);

  const handleWazirGuessConfirm = useCallback(() => {
    setShowWazirGuessConfirm(true);
  }, []);

  const confirmWazirGuess = useCallback(() => {
    setShowWazirGuessConfirm(false);
    transport.sendToHost({
      type: MSG.WAZIR_GUESS,
      guessedClientId: wazirGuessClientId,
      roundNumber,
    });
    if (isHost) {
      advanceToPhase(PHASES.POST_ROUND);
    } else {
      setPhase(PHASES.POST_ROUND);
    }
  }, [wazirGuessClientId, roundNumber, transport, isHost, advanceToPhase]);

  const cancelWazirGuess = useCallback(() => {
    setShowWazirGuessConfirm(false);
  }, []);

  const handleOutcomeSelect = useCallback((outcome) => {
    setSelectedOutcome(outcome);
    setShowConfirmation(true);
  }, []);

  const handleConfirmPoints = useCallback(() => {
    const outcome = selectedOutcome;
    const currentRound = stateRef.current.roundNumber;
    const currentRoster = stateRef.current.roster;
    const connectedPlayers = currentRoster.filter((p) => p.connected);
    const currentNumPlayers = connectedPlayers.length;

    const roles = generateRoles(roomCode, currentRound, currentNumPlayers);
    const config = getScoringConfig();
    const deltaMap = config[outcome];

    const deltasByClientId = {};
    const deltasSummary = [];
    for (const player of connectedPlayers) {
      const role = roles[player.seatNumber - 1];
      const delta = deltaMap[role] || 0;
      deltasByClientId[player.clientId] = delta;
      deltasSummary.push({
        clientId: player.clientId,
        displayName: player.displayName,
        role,
        delta,
      });
    }

    const newScoreboard = applyDeltas(stateRef.current.scoreboardByClientId, deltasByClientId);

    setScoreboardByClientId(newScoreboard);
    setLastDeltas(deltasSummary);
    setLastOutcome(outcome);
    setShowConfirmation(false);
    setSelectedOutcome(null);
    setRoleRevealed(false);
    setWazirGuessClientId(null);
    setExplicitRole(null);
    setHostAppliedRound(true);
    setPhase(PHASES.SCORE_REVEAL);

    if (isHost) {
      broadcastPublicState({
        phase: PHASES.SCORE_REVEAL,
        scoreboardByClientId: newScoreboard,
        lastOutcome: outcome,
      });

      transport.broadcast({
        type: MSG.ROUND_APPLIED,
        roundNumber: currentRound,
        outcome,
        scoreboardByClientId: newScoreboard,
        deltasByClientId,
      });
    }

    saveOnlineRoomSnapshot(roomCode, {
      roomCode,
      roster: currentRoster,
      phase: PHASES.SCORE_REVEAL,
      roundNumber: currentRound,
      scoreboardByClientId: newScoreboard,
    });
  }, [selectedOutcome, roomCode, isHost, transport, broadcastPublicState]);

  const handleCancelPoints = useCallback(() => {
    setShowConfirmation(false);
    setSelectedOutcome(null);
  }, []);

  const handleNextRound = useCallback(() => {
    const nextRound = stateRef.current.roundNumber + 1;
    setLastDeltas(null);
    setLastOutcome(null);
    setRoundNumber(nextRound);
    setPhase(PHASES.SECRET_REVEAL);
    setRoleRevealed(false);
    setWazirGuessClientId(null);
    setExplicitRole(null);
    setHostAppliedRound(false);

    if (isHost) {
      const connectedPlayers = roster.filter((p) => p.connected);
      const nextNumPlayers = connectedPlayers.length;

      const newPublicState = {
        phase: PHASES.SECRET_REVEAL,
        roundNumber: nextRound,
        scoreboardByClientId: stateRef.current.scoreboardByClientId,
      };
      broadcastPublicState(newPublicState);

      for (const player of connectedPlayers) {
        if (player.isHost) continue;
        const role = getRoleForPlayer(roomCode, nextRound, nextNumPlayers, player.seatNumber);
        transport.sendToClient(player.clientId, {
          type: MSG.PRIVATE_ROLE,
          roundNumber: nextRound,
          role,
        });
      }

        const hostRole = getRoleForPlayer(roomCode, nextRound, nextNumPlayers, seatNumberOf(clientId));
        setExplicitRole(hostRole);
      }
    }, [isHost, roster, roomCode, clientId, transport, broadcastPublicState, seatNumberOf]);

  const handleSkipRound = useCallback(() => {
    const nextRound = stateRef.current.roundNumber + 1;
    setRoleRevealed(false);
    setWazirGuessClientId(null);
    setExplicitRole(null);
    setRoundNumber(nextRound);
    setPhase(PHASES.SECRET_REVEAL);
    setHostAppliedRound(false);

    if (isHost) {
      broadcastPublicState({
        phase: PHASES.SECRET_REVEAL,
        roundNumber: nextRound,
      });
      transport.broadcast({ type: MSG.SKIP_ROUND, roundNumber: nextRound });
      sendPrivateRoles(nextRound);

      const nextNumPlayers = roster.filter((p) => p.connected).length;
      const hostRole = getRoleForPlayer(roomCode, nextRound, nextNumPlayers, seatNumberOf(clientId));
      setExplicitRole(hostRole);
    }
  }, [isHost, transport, broadcastPublicState, sendPrivateRoles, roster, roomCode, clientId, seatNumberOf]);

  useEffect(() => {
    transport.onMessage((data) => {
      if (!data || !data.type) return;

      if (data.type === MSG.PUBLIC_STATE) {
        if (data.roundNumber) setRoundNumber(data.roundNumber);
        if (data.phase) setPhase(data.phase);
        if (data.scoreboardByClientId) setScoreboardByClientId(data.scoreboardByClientId);
        if (data.roster) setRoster(data.roster);
        if (data.phase === PHASES.SECRET_REVEAL) {
          setRoleRevealed(false);
          setWazirGuessClientId(null);
          setExplicitRole(null);
        }
      }

      if (data.type === MSG.PRIVATE_ROLE) {
        if (data.roundNumber === stateRef.current.roundNumber || data.roundNumber === stateRef.current.roundNumber + 1) {
          setExplicitRole(data.role);
        }
      }

      if (data.type === MSG.ROUND_APPLIED && !isHost) {
        if (data.scoreboardByClientId) setScoreboardByClientId(data.scoreboardByClientId);
        if (data.outcome) setLastOutcome(data.outcome);
        if (data.deltasByClientId) {
          const summary = Object.entries(data.deltasByClientId).map(([cId, delta]) => {
            const entry = (data.roster || roster).find((p) => p.clientId === cId);
            const roles = generateRoles(roomCode, data.roundNumber, numPlayers);
            const seat = entry ? entry.seatNumber : 0;
            return {
              clientId: cId,
              displayName: entry ? entry.displayName : cId,
              role: seat > 0 ? roles[seat - 1] : "?",
              delta,
            };
          });
          setLastDeltas(summary);
        }
        setPhase(PHASES.SCORE_REVEAL);
        setRoleRevealed(false);
        setWazirGuessClientId(null);
        setExplicitRole(null);
        setHostAppliedRound(true);
      }

      if (data.type === MSG.SKIP_ROUND && !isHost) {
        setRoundNumber(data.roundNumber);
        setPhase(PHASES.SECRET_REVEAL);
        setRoleRevealed(false);
        setWazirGuessClientId(null);
        setExplicitRole(null);
        setHostAppliedRound(false);
      }

      if (data.type === MSG.WAZIR_GUESS) {
        // Other player's WAZIR guess (informational for host)
      }
    });

    transport.onRosterChange((newRoster) => {
      setRoster([...newRoster]);
    });

    transport.onStatusChange((status) => {
      if (status === "disconnected") {
        setStatusMessage("Connection lost. Attempting to reconnect...");
      } else if (status === "host_disconnected") {
        setStatusMessage("Host disconnected. Scores are frozen.");
      } else {
        setStatusMessage("");
      }
    });
  }, [transport, isHost, roomCode, roster, numPlayers]);

  const roleColor = ROLE_COLORS[myRole] || "cyan";

  const sortedScores = Object.entries(scoreboardByClientId)
    .map(([cId, score]) => ({
      clientId: cId,
      displayName: displayNameOf(cId),
      score,
      isYou: cId === clientId,
    }))
    .sort((a, b) => b.score - a.score);

  const guessablePlayers = roster.filter(
    (p) => p.connected && p.clientId !== clientId,
  );

  const getDeltasSummary = () => {
    if (!selectedOutcome || numPlayers < 4) return [];
    const roles = generateRoles(roomCode, roundNumber, numPlayers);
    const config = getScoringConfig();
    const deltaMap = config[selectedOutcome];
    return roster
      .filter((p) => p.connected)
      .map((player) => {
        const role = roles[player.seatNumber - 1];
        return {
          clientId: player.clientId,
          displayName: player.displayName,
          role,
          delta: deltaMap[role] || 0,
          isYou: player.clientId === clientId,
        };
      });
  };

  return (
    <div className="online-game">
      <div className="online-game-bg" />

      <header className="online-game-header">
        <div className="online-game-info">
          <span className="online-game-room">
            Room: <strong>{roomCode}</strong>
          </span>
          <span className="online-game-round">Round {roundNumber}</span>
          <span className="online-game-players">{numPlayers} Online</span>
          <span className="online-game-sync-badge">SYNC</span>
        </div>
        <button className="online-game-leave-btn" onClick={onLeave}>
          Leave
        </button>
      </header>

      <div className="online-game-player-name">
        Playing as: <strong>{displayName}</strong>
        {isHost && <span className="online-game-host-tag">HOST</span>}
      </div>

      {statusMessage && (
        <div className="online-game-status">{statusMessage}</div>
      )}

      {phase === PHASES.SECRET_REVEAL && !roleRevealed && myRole && (
        <RoleReveal role={myRole} onReady={handleRoleReady} />
      )}

      {phase === PHASES.SECRET_REVEAL && !myRole && (
        <div className="online-game-waiting-role">
          <p>Waiting for role assignment...</p>
          <div className="online-game-waiting-dots">
            <span /><span /><span />
          </div>
        </div>
      )}

      {phase === PHASES.BLUFF && (
        <div className="online-game-phase">
          <div className={`online-game-role-indicator online-game-role-${roleColor}`}>
            You are the <strong>{myRole}</strong>
          </div>
          <p className="online-game-role-tip">{roleTip}</p>

          <div className="online-game-bluff">
            <h2 className="online-game-bluff-title">Accuse. Defend. Lie.</h2>
            <p className="online-game-bluff-subtitle">
              {myRole === "BADSHA" && "Ask for the WAZEER! Mera Wazeer Kaun!"}
              {myRole === "WAZIR" && "Listen carefully. Who is the CHOR?"}
              {myRole === "CHOR" && "Blend in. Act like a SIPAHI."}
              {myRole === "SIPAHI" && "Watch and observe. Help the WAZEER."}
            </p>
            <button
              className="arcade-btn arcade-btn-gold"
              onClick={handleStartGuess}
            >
              {myRole === "WAZIR" ? "MAKE YOUR GUESS" : "END ROUND"}
            </button>
          </div>

          {isHost && (
            <div className="online-game-round-controls">
              <button
                className="arcade-btn arcade-btn-ghost"
                onClick={handleSkipRound}
              >
                SKIP ROUND (ABORTED)
              </button>
            </div>
          )}
        </div>
      )}

      {phase === PHASES.WAZIR_GUESS && (
        <div className="online-game-phase">
          <h2 className="online-game-guess-title">WAZEER, WHO IS THE CHOR?</h2>
          <div className="online-game-guess-cards">
            {guessablePlayers.map((player) => (
              <button
                key={player.clientId}
                className={`online-game-guess-card ${wazirGuessClientId === player.clientId ? "online-game-guess-card-selected" : ""}`}
                onClick={() => handleWazirGuessSelect(player.clientId)}
              >
                <span className="online-game-guess-card-name">
                  {player.displayName}
                </span>
              </button>
            ))}
          </div>
          <button
            className="arcade-btn arcade-btn-teal"
            onClick={handleWazirGuessConfirm}
            disabled={!wazirGuessClientId}
          >
            ACCUSE {wazirGuessClientId ? displayNameOf(wazirGuessClientId) : "?"}
          </button>
          <div className="online-game-guess-disclaimer">
            Your guess is synced to the host
          </div>

          {showWazirGuessConfirm && (
            <div className="modal-overlay" onClick={cancelWazirGuess}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Confirm Your Accusation</h2>
                <p>
                  You believe <strong>{displayNameOf(wazirGuessClientId)}</strong> is the CHOR.
                </p>
                <div className="modal-buttons">
                  <button
                    className="arcade-btn arcade-btn-teal"
                    onClick={confirmWazirGuess}
                  >
                    CONFIRM
                  </button>
                  <button
                    className="arcade-btn arcade-btn-ghost"
                    onClick={cancelWazirGuess}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === PHASES.POST_ROUND && !showConfirmation && (
        <div className="online-game-phase">
          {isHost ? (
            <>
              <h2 className="online-game-outcome-title">Who won this round?</h2>
              <p className="online-game-outcome-subtitle">
                The group performs the physical reveal and the host records the result.
              </p>
              <div className="online-game-outcome-buttons">
                <button
                  className="arcade-btn arcade-btn-teal outcome-btn"
                  onClick={() => handleOutcomeSelect("wazirCorrect")}
                >
                  WAZEER CAUGHT THE CHOR
                </button>
                <button
                  className="arcade-btn arcade-btn-crimson outcome-btn"
                  onClick={() => handleOutcomeSelect("wazirWrong")}
                >
                  CHOR ESCAPED!
                </button>
              </div>
              <button
                className="arcade-btn arcade-btn-ghost"
                onClick={handleSkipRound}
              >
                SKIP ROUND (ABORTED)
              </button>
            </>
          ) : (
            <div className="online-game-waiting-outcome">
              <h2 className="online-game-outcome-title">Waiting for host...</h2>
              <p className="online-game-outcome-subtitle">
                The host will record the round result.
              </p>
              <div className="online-game-waiting-dots">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>
      )}

      {showConfirmation && (
        <div className="modal-overlay" onClick={handleCancelPoints}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Points</h2>
            <p className="outcome-result">
              {selectedOutcome === "wazirCorrect"
                ? "WAZEER correctly identified the CHOR!"
                : "CHOR escaped detection!"}
            </p>
            <div className="deltas-summary">
              <h3>Points to be applied:</h3>
              {getDeltasSummary().map(
                ({ clientId: cId, displayName: dName, role: pRole, delta, isYou }) => (
                  <div
                    key={cId}
                    className={`delta-item ${isYou ? "delta-item-you" : ""}`}
                  >
                    <span>
                      {dName} ({pRole})
                      {isYou ? " — You" : ""}
                    </span>
                    <span
                      className={`delta-value ${delta > 0 ? "delta-positive" : delta < 0 ? "delta-negative" : ""}`}
                    >
                      {delta > 0 ? "+" : ""}{delta}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="modal-buttons">
              <button
                className="arcade-btn arcade-btn-gold"
                onClick={handleConfirmPoints}
              >
                APPLY POINTS
              </button>
              <button
                className="arcade-btn arcade-btn-ghost"
                onClick={handleCancelPoints}
              >
                CANCEL
              </button>
            </div>
            <p className="online-game-sync-note">
              Points will be synced to all connected players.
            </p>
          </div>
        </div>
      )}

      {phase === PHASES.SCORE_REVEAL && (
        <div className="online-game-phase">
          <div className="online-game-score-reveal">
            <div
              className={`score-headline ${lastOutcome === "wazirCorrect" ? "headline-wazir" : "headline-chor"}`}
            >
              {lastOutcome === "wazirCorrect"
                ? "WAZEER CAUGHT THE CHOR!"
                : "CHOR ESCAPED!"}
            </div>

            {lastDeltas && (
              <div className="online-game-score-deltas">
                {lastDeltas.map(({ clientId: cId, displayName: dName, delta, isYou }) => (
                  <div
                    key={cId}
                    className={`score-delta ${isYou ? "score-delta-you" : ""} ${delta > 0 ? "score-delta-pos" : delta < 0 ? "score-delta-neg" : "score-delta-zero"}`}
                  >
                    <span>
                      {dName}
                      {isYou ? " (You)" : ""}
                    </span>
                    <span className="score-delta-value">
                      {delta > 0 ? "+" : ""}{delta}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="online-game-scoreboard">
              <h3 className="online-game-scoreboard-title">Scoreboard</h3>
              {sortedScores.length === 0 ? (
                <p className="online-game-scoreboard-empty">No scores yet</p>
              ) : (
                <div className="online-game-scoreboard-list">
                  {sortedScores.map((entry, index) => (
                    <div
                      key={entry.clientId}
                      className={`online-game-scoreboard-item ${entry.isYou ? "online-game-scoreboard-item-you" : ""} ${index === 0 ? "online-game-scoreboard-item-leader" : ""}`}
                    >
                      <div className="scoreboard-rank">
                        {index === 0 && (
                          <span className="scoreboard-crown">&#x1F451;</span>
                        )}
                        <span>#{index + 1}</span>
                      </div>
                      <div className="online-game-scoreboard-name">
                        {entry.displayName}
                        {entry.isYou && (
                          <span className="scoreboard-you-tag">YOU</span>
                        )}
                      </div>
                      <div className="online-game-scoreboard-score">{entry.score}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isHost && (
              <button
                className="arcade-btn arcade-btn-gold"
                onClick={handleNextRound}
              >
                NEXT ROUND
              </button>
            )}
            {!isHost && phase === PHASES.SCORE_REVEAL && (
              <div className="online-game-waiting-next">
                <p>Waiting for host to start next round...</p>
                <div className="online-game-waiting-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {phase !== PHASES.SCORE_REVEAL && phase !== PHASES.SECRET_REVEAL && (
        <div className="online-game-scoreboard-mini">
          <h3>Scores</h3>
          <div className="online-game-scores-list">
            {sortedScores.length === 0 ? (
              <p className="game-no-scores">No scores yet</p>
            ) : (
              sortedScores.map((entry) => (
                <div
                  key={entry.clientId}
                  className={`game-score-row ${entry.isYou ? "game-score-you" : ""}`}
                >
                  <span>
                    {entry.displayName}
                    {entry.isYou ? " (You)" : ""}
                  </span>
                  <span className="game-score-val">{entry.score}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OnlineGame;
