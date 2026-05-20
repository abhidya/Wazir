# MERA WAZEER KAUN?

A cinematic front-end party game — the classic Indian social deduction game BADSHA–WAZIR–CHOR–SIPAHI, reimagined with neon Mughal/arcade aesthetics. No backend, no network — all game logic runs locally on each player's device.

**Live:** [abhidya.github.io/Wazir](https://abhidya.github.io/Wazir/)

## About the Game

Players are secretly assigned roles:

| Role | Icon Color | Mission |
|------|-----------|---------|
| **BADSHAH** (King) | 🟡 Gold | Asks the WAZIR to identify the CHOR |
| **WAZIR** (Minister) | 🟢 Teal | Detect and identify the CHOR |
| **CHOR** (Thief) | 🔴 Crimson | Blend in with SIPAHI — don't get caught |
| **SIPAHI** (Soldier) | 🔵 Cyan | Observe and help identify the CHOR |

## Game Flow

1. **Home Screen** — Title screen with PLAY NOW / JOIN ROOM / CREATE ROOM / HOW TO PLAY
2. **Lobby** — Enter room code, player number, display name. CREATE ROOM auto-generates a code.
3. **Role Reveal** — Privacy warning → cinematic role-specific video → role card with tip → "I'm Ready"
4. **Bluff Phase** — Role-specific instructions displayed
5. **WAZIR Guess** — WAZIR picks who they think is the CHOR via player number grid
6. **Outcome** — Group decides: WAZIR caught the CHOR, or CHOR escaped
7. **Score Reveal** — Headline, point deltas, ranked scoreboard with crown for leader

## Privacy & Security

> **Important:** This app is **front-end only** — no data is sent to any server.

- **Secrets rely on keeping your player number private**
- Anyone who enters another player's number can see their role
- Use physical methods to assign player numbers privately (paper slips, hat draw, etc.)
- Scores are stored in localStorage on each device only

## Media Assets

Video and image assets live in `public/media/` and are referenced via `import.meta.env.BASE_URL` so they work under the `/Wazir/` GitHub Pages base path.

| File | Purpose |
|------|---------|
| `home-poster.png` | Home screen background |
| `intro.mp4` | Intro/attract loop video |
| `role-badshah.mp4` | BADSHAH role reveal video |
| `role-wazir.mp4` | WAZIR role reveal video |
| `role-chor.mp4` | CHOR role reveal video |
| `role-sipahi.mp4` | SIPAHI role reveal video |

To replace an asset, overwrite the file in `public/media/` with the same name. Videos should be short (5–10s), muted-compatible, and mobile-optimized (720p recommended).

## Scoring (Default)

| Outcome | BADSHAH | WAZIR | CHOR | SIPAHI |
|---------|---------|-------|------|--------|
| WAZIR correct | +3 | +5 | +0 | +1 |
| CHOR escaped | +0 | −1 | +6 | +0 |

Scoring is configurable in Settings.

## Features

- **Deterministic Roles** — Same room code + round = same role assignment across all devices
- **Cinematic Role Reveal** — Role-specific video playback with skip/fallback for autoplay failures
- **Phase State Machine** — Structured round flow: reveal → bluff → guess → outcome → scores
- **Arcade Scoreboard** — Ranked players, animated point deltas, crown for leader
- **Local Scoring** — Each phone tracks its own scoreboard
- **Export/Import** — Save and restore scoreboard data via JSON
- **Configurable Scoring** — Customize point values in Settings
- **No Network Required** — Works completely offline
- **Mobile-First** — Safe-area padding, tap-friendly buttons, `prefers-reduced-motion` support

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

### Deploying to GitHub Pages

The app is configured with `base: '/Wazir/'` in `vite.config.js`. Push to `main` and GitHub Actions deploys from the `dist/` folder.

## Project Structure

```
src/
├── App.jsx              # Screen routing (home, lobby, game, settings)
├── App.css              # App-level layout
├── index.css            # Design tokens (CSS custom properties) + global styles
├── main.jsx             # Vite entry point
├── components/
│   ├── HomeScreen.jsx   # Cinematic attract/title screen
│   ├── HomeScreen.css
│   ├── Lobby.jsx        # Room join/create with prefilled code
│   ├── Lobby.css
│   ├── RoleReveal.jsx   # Privacy → video → card reveal flow
│   ├── RoleReveal.css
│   ├── Game.jsx         # Phase state machine + gameplay
│   ├── Game.css
│   ├── Settings.jsx     # Scoring config, export/import, privacy
│   ├── Settings.css
│   ├── HowToPlay.jsx    # Rules modal
│   └── HowToPlay.css
├── utils/
│   ├── roleDistribution.js  # Deterministic role assignment
│   ├── scoring.js           # Scoring logic
│   └── storage.js           # localStorage persistence
public/
└── media/               # Video/image assets (see Media Assets above)
```

## Manual Acceptance Tests

- **T1**: Phones with identical roomCode, roundNumber, and numPlayers compute identical role arrays
- **T2**: Each phone shows only its own role based on private playerNumber
- **T3**: After all phones tap the same outcome, local deltas are applied consistently
- **T4**: Export/import scoreboard restores scores correctly
- **T5**: Reload and re-enter same roomCode + playerNumber restores scoreboard
- **T6**: Aborted round with incremented roundNumber produces different role distribution
- **T7**: CREATE ROOM auto-generates a 5-char room code (no ambiguous O/0/I/1)
- **T8**: Role reveal video plays; skip button and fallback work if autoplay blocked
- **T9**: Scoreboard ranks players by total score with crown on leader

## Limitations

- **No real-time sync** — Each player operates their phone independently; outcomes must be tapped on every device
- **Privacy depends on physical security** — Player numbers are the only secret; protect them
- **No cross-device score reconciliation** — Scores are local-only per device
- **Video autoplay** — May be blocked by some browsers; skip button provided as fallback

## License

MIT
