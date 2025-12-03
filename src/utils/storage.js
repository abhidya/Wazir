/**
 * Local Storage Module
 * 
 * Handles persistence of player data and scoreboards.
 * Data is scoped by roomCode for per-room persistence.
 */

const STORAGE_PREFIX = 'wazir_game_';

/**
 * Gets the storage key for room-specific data.
 */
function getRoomKey(roomCode, suffix) {
  return `${STORAGE_PREFIX}room_${roomCode}_${suffix}`;
}

/**
 * Gets the storage key for player-specific data.
 */
function getPlayerKey(suffix) {
  return `${STORAGE_PREFIX}player_${suffix}`;
}

/**
 * Saves player identity data.
 */
export function savePlayerData(data) {
  try {
    localStorage.setItem(getPlayerKey('identity'), JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save player data:', error);
  }
}

/**
 * Loads player identity data.
 */
export function loadPlayerData() {
  try {
    const data = localStorage.getItem(getPlayerKey('identity'));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load player data:', error);
    return null;
  }
}

/**
 * Saves scoreboard for a specific room.
 */
export function saveScoreboard(roomCode, scoreboard) {
  try {
    localStorage.setItem(getRoomKey(roomCode, 'scoreboard'), JSON.stringify(scoreboard));
  } catch (error) {
    console.error('Failed to save scoreboard:', error);
  }
}

/**
 * Loads scoreboard for a specific room.
 */
export function loadScoreboard(roomCode) {
  try {
    const data = localStorage.getItem(getRoomKey(roomCode, 'scoreboard'));
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to load scoreboard:', error);
    return {};
  }
}

/**
 * Saves room state (roundNumber, numPlayers, etc.).
 */
export function saveRoomState(roomCode, state) {
  try {
    localStorage.setItem(getRoomKey(roomCode, 'state'), JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save room state:', error);
  }
}

/**
 * Loads room state.
 */
export function loadRoomState(roomCode) {
  try {
    const data = localStorage.getItem(getRoomKey(roomCode, 'state'));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load room state:', error);
    return null;
  }
}

/**
 * Saves scoring configuration.
 */
export function saveScoringConfig(config) {
  try {
    localStorage.setItem(getPlayerKey('scoring_config'), JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save scoring config:', error);
  }
}

/**
 * Loads scoring configuration.
 */
export function loadScoringConfig() {
  try {
    const data = localStorage.getItem(getPlayerKey('scoring_config'));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load scoring config:', error);
    return null;
  }
}

/**
 * Exports all scoreboard data for a room as JSON string.
 */
export function exportScoreboard(roomCode) {
  const scoreboard = loadScoreboard(roomCode);
  const state = loadRoomState(roomCode);
  return JSON.stringify({
    roomCode,
    scoreboard,
    state,
    exportedAt: new Date().toISOString()
  }, null, 2);
}

/**
 * Imports scoreboard data from JSON string.
 */
export function importScoreboard(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!data.roomCode) {
      throw new Error('Invalid scoreboard data: missing roomCode');
    }
    if (data.scoreboard) {
      saveScoreboard(data.roomCode, data.scoreboard);
    }
    if (data.state) {
      saveRoomState(data.roomCode, data.state);
    }
    return { success: true, roomCode: data.roomCode };
  } catch (error) {
    console.error('Failed to import scoreboard:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Clears all data for a specific room.
 */
export function clearRoomData(roomCode) {
  try {
    localStorage.removeItem(getRoomKey(roomCode, 'scoreboard'));
    localStorage.removeItem(getRoomKey(roomCode, 'state'));
  } catch (error) {
    console.error('Failed to clear room data:', error);
  }
}

export default {
  savePlayerData,
  loadPlayerData,
  saveScoreboard,
  loadScoreboard,
  saveRoomState,
  loadRoomState,
  saveScoringConfig,
  loadScoringConfig,
  exportScoreboard,
  importScoreboard,
  clearRoomData
};
