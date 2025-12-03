/**
 * Scoring Module
 * 
 * Handles scoring rules and calculations for the BADSHA-WAZIR-CHOR-SIPAHI game.
 */

import { generateRoles } from './roleDistribution';
import { loadScoringConfig, saveScoringConfig } from './storage';

// Default scoring configuration
export const DEFAULT_SCORING = {
  wazirCorrect: {
    BADSHA: 3,
    WAZIR: 5,
    CHOR: 0,
    SIPAHI: 1
  },
  wazirWrong: {
    BADSHA: 0,
    WAZIR: -1,
    CHOR: 6,
    SIPAHI: 0
  }
};

/**
 * Gets the current scoring configuration.
 */
export function getScoringConfig() {
  const saved = loadScoringConfig();
  return saved || DEFAULT_SCORING;
}

/**
 * Saves scoring configuration.
 */
export function setScoringConfig(config) {
  saveScoringConfig(config);
}

/**
 * Resets scoring configuration to defaults.
 */
export function resetScoringConfig() {
  saveScoringConfig(DEFAULT_SCORING);
  return DEFAULT_SCORING;
}

/**
 * Calculates score deltas for all players based on round outcome.
 * 
 * @param {string} roomCode - The room code
 * @param {number} roundNumber - The round number
 * @param {number} numPlayers - Number of players
 * @param {'wazirCorrect'|'wazirWrong'} outcome - The outcome of the round
 * @returns {Object} Map of playerNumber to delta
 */
export function calculateDeltas(roomCode, roundNumber, numPlayers, outcome) {
  const roles = generateRoles(roomCode, roundNumber, numPlayers);
  const config = getScoringConfig();
  const deltas = {};
  
  const deltaMap = config[outcome];
  if (!deltaMap) {
    throw new Error(`Invalid outcome: ${outcome}`);
  }
  
  for (let i = 0; i < numPlayers; i++) {
    const playerNumber = i + 1;
    const role = roles[i];
    deltas[playerNumber] = deltaMap[role] || 0;
  }
  
  return deltas;
}

/**
 * Applies score deltas to a scoreboard.
 * 
 * @param {Object} scoreboard - Current scoreboard (playerNumber -> score)
 * @param {Object} deltas - Deltas to apply (playerNumber -> delta)
 * @returns {Object} New scoreboard with applied deltas
 */
export function applyDeltas(scoreboard, deltas) {
  const newScoreboard = { ...scoreboard };
  
  for (const [playerNumber, delta] of Object.entries(deltas)) {
    const current = newScoreboard[playerNumber] || 0;
    newScoreboard[playerNumber] = current + delta;
  }
  
  return newScoreboard;
}

/**
 * Generates a summary of deltas for confirmation dialog.
 * 
 * @param {Object} deltas - The deltas to summarize
 * @param {string[]} roles - The roles array for context
 * @returns {Array} Array of {playerNumber, role, delta} objects
 */
export function summarizeDeltas(deltas, roles) {
  return Object.entries(deltas).map(([playerNumber, delta]) => ({
    playerNumber: parseInt(playerNumber),
    role: roles[parseInt(playerNumber) - 1],
    delta
  })).sort((a, b) => a.playerNumber - b.playerNumber);
}

export default {
  DEFAULT_SCORING,
  getScoringConfig,
  setScoringConfig,
  resetScoringConfig,
  calculateDeltas,
  applyDeltas,
  summarizeDeltas
};
