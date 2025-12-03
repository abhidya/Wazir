# BADSHA–WAZIR–CHOR–SIPAHI Game

A front-end only implementation of the classic Indian party game. No backend, no network - all game logic runs locally on each player's device.

## About the Game

BADSHA–WAZIR–CHOR–SIPAHI is a social deduction game where players are secretly assigned roles:

- **BADSHA** (King): Decides the WAZIR and asks the question aloud
- **WAZIR** (Minister): Must detect and identify the CHOR
- **CHOR** (Thief): Must blend in with SIPAHI and avoid detection
- **SIPAHI** (Soldier): Observes and helps identify the CHOR

## How It Works

1. All players enter the same **Room Code** on their phones
2. Each player privately enters their **Player Number** (assigned via paper slips, hat draw, etc.)
3. The app deterministically assigns roles based on the room code and round number
4. Each phone only shows its own player's role
5. After the group reveals and decides the winner, each player taps the outcome on their phone
6. Scores are tracked locally on each device

## Privacy & Security

⚠️ **Important Privacy Notice:**

- This app is **front-end only** - no data is sent to any server
- **Secrets rely on keeping your player number private**
- Anyone who enters another player's number can see their role
- Use physical methods to assign player numbers privately (paper slips, hat draw, etc.)

## Setup Instructions

### For Players

1. Open the app on all participating devices
2. Choose a shared **Room Code** (e.g., "GAME123")
3. Decide on the number of players (minimum 4)
4. **Privately** assign player numbers 1 through N:
   - Use folded paper slips with numbers
   - Draw numbers from a hat
   - Any other private method
5. Each player enters:
   - The shared room code
   - Their private player number
   - Optional display name
6. Tap "Join Room" to enter the game

### During the Game

1. **Starting a Round:**
   - Tap "Show My Role" to see your secret role
   - Follow the role tips displayed
   
2. **Playing the Round:**
   - BADSHA starts by asking the WAZIR a question aloud
   - WAZIR must identify who they think is the CHOR
   - CHOR tries to blend in and avoid detection
   - SIPAHI observes and may help the WAZIR
   
3. **Ending a Round:**
   - Perform the physical reveal as a group
   - Decide if WAZIR correctly identified the CHOR
   - **Each player** taps the outcome on their phone:
     - "WAZIR succeeded" if CHOR was caught
     - "CHOR succeeded" if CHOR escaped
   - Confirm the point changes

4. **Scoring (Default):**
   - WAZIR correct: WAZIR +5, BADSHA +3, SIPAHI +1, CHOR +0
   - WAZIR wrong: CHOR +6, WAZIR -1, BADSHA +0, SIPAHI +0

5. **If a round is aborted** (e.g., accidental role reveal):
   - Tap "Skip Round (Aborted)" to move to the next round without scoring

## Features

- **Deterministic Roles**: Same room code + round = same role assignment across all devices
- **Local Scoring**: Each phone tracks its own scoreboard
- **Export/Import**: Save and restore scoreboard data via JSON
- **Configurable Scoring**: Customize point values in Settings
- **No Network Required**: Works completely offline

## Development

### Prerequisites

- Node.js 18+
- npm

### Running Locally

```bash
npm install
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Manual Acceptance Tests

- **T1**: Phones with identical roomCode, roundNumber, and numPlayers compute identical role arrays
- **T2**: Each phone shows only its own role based on private playerNumber
- **T3**: After all phones tap the same outcome, local deltas are applied consistently
- **T4**: Export/import scoreboard restores scores correctly
- **T5**: Reload and re-enter same roomCode + playerNumber restores scoreboard
- **T6**: Aborted round with incremented roundNumber produces different role distribution

## License

MIT
