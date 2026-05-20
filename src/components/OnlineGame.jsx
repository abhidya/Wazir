import { useState, useEffect, useCallback, useRef } from "react";
import { MSG } from "../network/PeerJsRoomTransport";
import {
  generateRoles,
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
  const [wazirGuessLocked, setWazirGuessLocked] = useState(false);
  const [wazirGuesserName, setWazirGuesserName] = useState("");

  const stateRef = useRef({});
  useEffect(() => {
    stateRef.current = {
      phase,
      roundNumber,
      scoreboardByClientId,
      roster,
      selectedOutcome,
      lastOutcome,
    };
  }, [phase, roundNumber, scoreboardByClientId, roster, selectedOutcome, lastOutcome]);

  const connectedPlayers = roster.filter((p) => p.connected);
  const numPlayers = connectedPlayers.length;

  const displayNameOf = useCallback((cId) => {
    const entry = roster.find((p) => p.clientId === cId);
    return entry ? entry.displayName : cId;
  }, [roster]);

  /**
   * Build a frozen roundRoster: connected players sorted by seatNumber.
   * Role index = roundRoster index, NOT raw seatNumber - 1.
   * This fixes the bug where disconnected/removed players cause gaps.
   */
  const buildRoundRoster = useCallback((currentRoster) => {
    const connected = (currentRoster || roster).filter((p) => p.connected);
    return [...connected].sort((a, b) => a.seatNumber - b.seatNumber);
  }, [roster]);

  const computeRoleForClientId = useCallback(
    (cId, round, currentRoster) => {
      const roundRoster = buildRoundRoster(currentRoster);
      const idx = roundRoster.findIndex((p) => p.clientId === cId);
      if (idx === -1 || roundRoster.length < 4) return "SIPAHI";
      const roles = generateRoles(roomCode, round, roundRoster.length);
      return roles[idx];
    },
    [roomCode, buildRoundRoster],
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
        scoreboardByClientId: stateRef.current.scoreboardByClientId,
        ...overrides,
      };
      transport.setPublicState(state);
      transport.broadcast({ type: MSG.PUBLIC_STATE, ...state });
    },
    [isHost, transport, roomCode, clientId],
  );

  const sendPrivateRoles = useCallback(
    (round, currentRoster) => {
      if (!isHost) return;
      const roundRoster = buildRoundRoster(currentRoster);
      const connected = roundRoster.filter((p) => p.connected);
      for (const player of connected) {
        const idx = roundRoster.findIndex((p) => p.clientId === player.clientId);
        if (idx === -1) continue;
        const roles = generateRoles(roomCode, round, roundRoster.length);
        const role = roles[idx];
        if (player.isHost) {
          setExplicitRole(role);
          continue;
        }
        transport.sendToClient(player.clientId, {
          type: MSG.PRIVATE_ROLE,
          roundNumber: round,
          role,
        });
      }
    },
    [isHost, roomCode, transport, buildRoundRoster],
  );

  // ─── Host Phase Control ──────────────────────────────────────────────
  // Only the host advances phases. Clients update from PUBLIC_STATE messages.

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

  // Role reveal → Bluff: only host advances
  const handleRoleReady = useCallback(() => {
    setRoleRevealed(true);
    if (isHost) {
      advanceToPhase(PHASES.BLUFF);
    }
    // Clients wait for PUBLIC_STATE with phase=bluff
  }, [isHost, advanceToPhase]);

  // Bluff → WAZIR_GUESS or POST_ROUND: only host advances
  const handleStartGuess = useCallback(() => {
    if (!isHost) return;
    if (myRole === "WAZIR") {
      advanceToPhase(PHASES.WAZIR_GUESS);
    } else {
      advanceToPhase(PHASES.POST_ROUND);
    }
  }, [myRole, isHost, advanceToPhase]);

  // Host-only: Continue button when non-WAZIR host sees bluff
  // (All players see bluff; host clicks Continue to advance)
  const handleHostContinue = useCallback(() => {
    if (!isHost) return;
    advanceToPhase(PHASES.POST_ROUND);
  }, [isHost, advanceToPhase]);

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
      guessClientId: wazirGuessClientId,
      roundNumber,
    });
    // If WAZIR is host, advance immediately
    if (isHost) {
      // Broadcast that WAZIR has locked a guess
      broadcastPublicState({
        wazirGuessLocked: true,
        wazirGuesserClientId: clientId,
      });
      advanceToPhase(PHASES.POST_ROUND);
    }
    // If WAZIR is client, they wait for PUBLIC_STATE from host
  }, [wazirGuessClientId, roundNumber, transport, isHost, advanceToPhase, broadcastPublicState, clientId]);

  const cancelWazirGuess = useCallback(() => {
    setShowWazirGuessConfirm(false);
  }, []);

  const handleOutcomeSelect = useCallback((outcome) => {
    setSelectedOutcome(outcome);
    setShowConfirmation(true);
  }, []);

  // Host applies points — the ONLY place scores are computed authoritatively
  const handleConfirmPoints = useCallback(() => {
    const outcome = selectedOutcome;
    const currentRound = stateRef.current.roundNumber;
    const roundRoster = buildRoundRoster(roster);
    const currentNumPlayers = roundRoster.length;

    const roles = generateRoles(roomCode, currentRound, currentNumPlayers);
    const config = getScoringConfig();
    const deltaMap = config[outcome];

    const deltasByClientId = {};
    const deltasSummary = [];
    for (let i = 0; i < roundRoster.length; i++) {
      const player = roundRoster[i];
      const role = roles[i];
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
    setWazirGuessLocked(false);
    setWazirGuesserName("");
    setPhase(PHASES.SCORE_REVEAL);

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

    saveOnlineRoomSnapshot(roomCode, {
      roomCode,
      roster,
      phase: PHASES.SCORE_REVEAL,
      roundNumber: currentRound,
      scoreboardByClientId: newScoreboard,
    });
  }, [selectedOutcome, roomCode, roster, transport, broadcastPublicState, buildRoundRoster]);

  const handleCancelPoints = useCallback(() => {
    setShowConfirmation(false);
    setSelectedOutcome(null);
  }, []);

  // Host-only: Next Round
  const handleNextRound = useCallback(() => {
    if (!isHost) return;
    const nextRound = stateRef.current.roundNumber + 1;
    setLastDeltas(null);
    setLastOutcome(null);
    setRoundNumber(nextRound);
    setPhase(PHASES.SECRET_REVEAL);
    setRoleRevealed(false);
    setWazirGuessClientId(null);
    setExplicitRole(null);
    setWazirGuessLocked(false);
    setWazirGuesserName("");

    broadcastPublicState({
      phase: PHASES.SECRET_REVEAL,
      roundNumber: nextRound,
      scoreboardByClientId: stateRef.current.scoreboardByClientId,
    });

    sendPrivateRoles(nextRound, roster);
  }, [isHost, roster, broadcastPublicState, sendPrivateRoles]);

  // Host-only: Skip Round
  const handleSkipRound = useCallback(() => {
    if (!isHost) return;
    const nextRound = stateRef.current.roundNumber + 1;
    setRoleRevealed(false);
    setWazirGuessClientId(null);
    setExplicitRole(null);
    setRoundNumber(nextRound);
    setPhase(PHASES.SECRET_REVEAL);
    setWazirGuessLocked(false);
    setWazirGuesserName("");

    broadcastPublicState({
      phase: PHASES.SECRET_REVEAL,
      roundNumber: nextRound,
    });
    transport.broadcast({ type: MSG.SKIP_ROUND, roundNumber: nextRound });
    sendPrivateRoles(nextRound, roster);
  }, [isHost, transport, broadcastPublicState, sendPrivateRoles, roster]);

  // ─── Message Handler ──────────────────────────────────────────────────
  // Clients ONLY update phase from PUBLIC_STATE, ROUND_APPLIED, SKIP_ROUND, PRIVATE_ROLE.

  useEffect(() => {
    transport.onMessage((data) => {
      if (!data || !data.type) return;

      if (data.type === MSG.PUBLIC_STATE) {
        if (data.roundNumber) setRoundNumber(data.roundNumber);
        if (data.phase) setPhase(data.phase);
        if (data.scoreboardByClientId) setScoreboardByClientId(data.scoreboardByClientId);
        if (data.roster) setRoster(data.roster);
        if (data.wazirGuessLocked) {
          setWazirGuessLocked(true);
          if (data.wazirGuesserClientId) {
            setWazirGuesserName(displayNameOf(data.wazirGuesserClientId));
          }
        }
        if (data.phase === PHASES.SECRET_REVEAL) {
          setRoleRevealed(false);
          setWazirGuessClientId(null);
          setExplicitRole(null);
          setWazirGuessLocked(false);
          setWazirGuesserName("");
        }
      }

      if (data.type === MSG.PRIVATE_ROLE) {
        setExplicitRole(data.role);
      }

      if (data.type === MSG.ROUND_APPLIED && !isHost) {
        if (data.scoreboardByClientId) setScoreboardByClientId(data.scoreboardByClientId);
        if (data.outcome) setLastOutcome(data.outcome);
        if (data.deltasByClientId) {
          const roundRoster = buildRoundRoster();
          const roles = generateRoles(roomCode, data.roundNumber, roundRoster.length);
          const summary = Object.entries(data.deltasByClientId).map(([cId, delta]) => {
            const idx = roundRoster.findIndex((p) => p.clientId === cId);
            const role = idx >= 0 ? roles[idx] : "?";
            return { clientId: cId, displayName: displayNameOf(cId), role, delta };
          });
          setLastDeltas(summary);
        }
        setPhase(PHASES.SCORE_REVEAL);
        setRoleRevealed(false);
        setWazirGuessClientId(null);
        setExplicitRole(null);
        setWazirGuessLocked(false);
        setWazirGuesserName("");
      }

      if (data.type === MSG.SKIP_ROUND && !isHost) {
        setRoundNumber(data.roundNumber);
        setPhase(PHASES.SECRET_REVEAL);
        setRoleRevealed(false);
        setWazirGuessClientId(null);
        setExplicitRole(null);
        setWazirGuessLocked(false);
        setWazirGuesserName("");
      }

      if (data.type === MSG.WAZIR_GUESS && isHost) {
        // Host received a client's WAZIR guess
        setWazirGuessLocked(true);
        setWazirGuesserName(displayNameOf(data.clientId));
        broadcastPublicState({
          wazirGuessLocked: true,
          wazirGuesserClientId: data.clientId,
          phase: PHASES.POST_ROUND,
        });
        setPhase(PHASES.POST_ROUND);
      }

      if (data.type === MSG.PLAYER_READY) {
        // Future: track ready state per round. For v1, host has Continue buttons.
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
  }, [transport, isHost, roomCode, buildRoundRoster, displayNameOf, broadcastPublicState]);

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
    const roundRoster = buildRoundRoster();
    const roles = generateRoles(roomCode, roundNumber, roundRoster.length);
    const config = getScoringConfig();
    const deltaMap = config[selectedOutcome];
    return roundRoster.map((player, idx) => ({
      clientId: player.clientId,
      displayName: player.displayName,
      role: roles[idx],
      delta: deltaMap[roles[idx]] || 0,
      isYou: player.clientId === clientId,
    }));
  };

  // Determine if current player is WAZIR this round
  const isWazir = myRole === "WAZIR";

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

      {wazirGuessLocked && phase !== PHASES.SCORE_REVEAL && (
        <div className="online-game-guess-locked">
          {wazirGuesserName} has locked a guess.
        </div>
      )}

      {/* SECRET_REVEAL: show RoleReveal if role is available */}
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

      {phase === PHASES.SECRET_REVEAL && myRole && roleRevealed && !isHost && (
        <div className="online-game-waiting-role">
          <p>Waiting for host to start the round...</p>
          <div className="online-game-waiting-dots">
            <span /><span /><span />
          </div>
        </div>
      )}

      {/* BLUFF: host controls advancement */}
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
            {isHost && (
              <button
                className="arcade-btn arcade-btn-gold"
                onClick={isWazir ? handleStartGuess : handleHostContinue}
              >
                {isWazir ? "MAKE YOUR GUESS" : "END ROUND"}
              </button>
            )}
            {!isHost && (
              <div className="online-game-waiting-next">
                <p>Waiting for host to advance...</p>
                <div className="online-game-waiting-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
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

      {/* WAZIR_GUESS: only shown when host is WAZIR and advanced to this phase */}
      {phase === PHASES.WAZIR_GUESS && isWazir && (
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

      {/* WAZIR_GUESS phase but not WAZIR: show waiting */}
      {phase === PHASES.WAZIR_GUESS && !isWazir && (
        <div className="online-game-phase">
          <div className="online-game-waiting-outcome">
            <h2 className="online-game-outcome-title">WAZEER is making a guess...</h2>
            <p className="online-game-outcome-subtitle">
              The WAZEER will identify who they think is the CHOR.
            </p>
            <div className="online-game-waiting-dots">
              <span /><span /><span />
            </div>
          </div>
        </div>
      )}

      {/* POST_ROUND: host selects outcome, clients wait */}
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

      {/* Confirmation Modal (host only) */}
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

      {/* SCORE_REVEAL: host controls Next Round */}
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
            {!isHost && (
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

      {/* Mini scoreboard */}
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
