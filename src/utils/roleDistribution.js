/**
 * Deterministic Role Distribution Module
 * 
 * Computes role assignments for the BADSHA-WAZIR-CHOR-SIPAHI game.
 * 
 * Roles per round: exactly one BADSHA, one WAZIR, one CHOR, remaining players are SIPAHI.
 * 
 * Algorithm:
 * 1. Compute a stable 32-bit seed by hashing: roomCode + "|" + roundNumber + "|" + "BADSHA-WAZIR-CHOR-SIPAHI"
 * 2. Use that seed to drive a deterministic RNG (Mulberry32)
 * 3. Use seed-based Fisher-Yates shuffle of the roles array
 * 4. The shuffled array maps to playerNumber 1..N
 */

// Simple string hash function that produces a 32-bit integer
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Mulberry32: A simple deterministic PRNG with good distribution
function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle using a seeded RNG
function shuffleArray(array, rng) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates roles array for a given room, round, and number of players.
 * 
 * @param {string} roomCode - The shared room code
 * @param {number} roundNumber - The current round number (≥1)
 * @param {number} numPlayers - Number of players (≥4)
 * @returns {string[]} Array of roles indexed by playerNumber - 1
 */
export function generateRoles(roomCode, roundNumber, numPlayers) {
  if (numPlayers < 4) {
    throw new Error("Minimum 4 players required");
  }
  
  // Create the roles array: 1 BADSHA, 1 WAZIR, 1 CHOR, rest SIPAHI
  const roles = ['BADSHA', 'WAZIR', 'CHOR'];
  for (let i = 3; i < numPlayers; i++) {
    roles.push('SIPAHI');
  }
  
  // Compute seed from the deterministic string
  const seedString = `${roomCode}|${roundNumber}|BADSHA-WAZIR-CHOR-SIPAHI`;
  const seed = hashString(seedString);
  
  // Create RNG and shuffle
  const rng = mulberry32(seed);
  return shuffleArray(roles, rng);
}

/**
 * Gets the role for a specific player.
 * 
 * @param {string} roomCode - The shared room code
 * @param {number} roundNumber - The current round number (≥1)
 * @param {number} numPlayers - Number of players (≥4)
 * @param {number} playerNumber - The player's number (1..N)
 * @returns {string} The role for the specified player
 */
export function getRoleForPlayer(roomCode, roundNumber, numPlayers, playerNumber) {
  if (playerNumber < 1 || playerNumber > numPlayers) {
    throw new Error("Invalid player number");
  }
  
  const roles = generateRoles(roomCode, roundNumber, numPlayers);
  return roles[playerNumber - 1];
}

/**
 * Gets role tips for display.
 * 
 * @param {string} role - The player's role
 * @returns {string} Tip text for the role
 */
export function getRoleTip(role) {
  const tips = {
    'BADSHA': 'Decide the WAZIR and ask the question aloud.',
    'WAZIR': 'Detect and identify the CHOR.',
    'CHOR': 'Blend in with SIPAHI.',
    'SIPAHI': 'Observe and help identify the CHOR.'
  };
  return tips[role] || '';
}

export default { generateRoles, getRoleForPlayer, getRoleTip };
