/**
 * E2E: Full 4-player PeerJS Online Sync game
 *
 * - Four isolated browser contexts (not tabs) to avoid localStorage/clientId collision
 * - Unique room per run: E2E${Date.now().toString(36).toUpperCase()}
 * - Workers=1, fullyParallel=false (avoid PeerJS room ID collision)
 * - Trace/video/screenshot on failure
 * - Prefer accessible selectors (getByRole, getByLabel)
 */
import { test, expect } from "@playwright/test";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Unique room code per test run */
function makeRoomCode() {
  return `E2E${Date.now().toString(36).toUpperCase()}`;
}

/** Open the app in a fresh browser context and navigate to home */
async function openApp(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      // eslint-disable-next-line no-console
      console.log(`[BROWSER ${msg.type()}]`, msg.text());
    }
  });
  await page.goto("/");
  await page.waitForSelector("text=MERA WAZEER KAUN?");
  return { context, page };
}

/** From HomeScreen, click CREATE ONLINE ROOM and fill the form */
async function createOnlineRoom(page, roomCode, displayName) {
  await page.getByRole("button", { name: "CREATE ONLINE ROOM" }).click();
  // Fill the form using accessible label selectors
  await page.getByLabel("Room Code").fill(roomCode);
  await page.getByLabel("Your Name").fill(displayName);
  await page.getByRole("button", { name: "CREATE ROOM" }).click();
}

/** From HomeScreen, click JOIN ONLINE ROOM and fill the form */
async function joinOnlineRoom(page, roomCode, displayName) {
  await page.getByRole("button", { name: "JOIN ONLINE ROOM" }).click();
  await page.getByLabel("Room Code").fill(roomCode);
  await page.getByLabel("Your Name").fill(displayName);
  await page.getByRole("button", { name: "JOIN ROOM" }).click();
}

/** Expect the roster in OnlineLobby to contain the given player names */
async function expectRoster(page, expectedNames) {
  const lobby = page.locator(".online-lobby");
  await expect(lobby).toBeVisible({ timeout: 15_000 });

  for (const name of expectedNames) {
    await expect(
      lobby.locator(".online-lobby-player-name", { hasText: name }),
    ).toBeVisible({ timeout: 10_000 });
  }
}

/** Expect all four pages to be in OnlineGame (past lobby) */
async function expectAllInGame(pages) {
  for (const page of pages) {
    await expect(page.locator(".online-game")).toBeVisible({ timeout: 20_000 });
  }
}

/** Click through RoleReveal: REVEAL MY ROLE → Skip Video → I'M READY.
 *  No-ops if the phase has already advanced past secretReveal. */
async function revealRole(page) {
  const revealOrPast = page.locator(
    ".rolereveal, .online-game-bluff, .online-game-outcome-buttons, .online-game-score-reveal",
  );
  await expect(revealOrPast.first()).toBeVisible({ timeout: 20_000 });

  const reveal = page.locator(".rolereveal");
  if (!(await reveal.isVisible({ timeout: 500 }).catch(() => false))) return;

  await page.getByRole("button", { name: "REVEAL MY ROLE" }).click();

  const skipBtn = page.getByRole("button", { name: "Skip Video" });
  if (await skipBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await skipBtn.click();
  }

  await page.getByRole("button", { name: "I'M READY" }).click();
}

/** Read the scoreboard from a page in score-reveal phase */
async function collectScores(page) {
  const items = page.locator(".online-game-scoreboard-item");
  await expect(items.first()).toBeVisible({ timeout: 10_000 });
  const count = await items.count();
  const scores = {};
  for (let i = 0; i < count; i++) {
    const name = await items.nth(i).locator(".online-game-scoreboard-name").textContent();
    const score = await items.nth(i).locator(".online-game-scoreboard-score").textContent();
    // Clean name (strip "YOU" tag)
    const cleanName = name.replace(/\s*YOU\s*/, "").trim();
    scores[cleanName] = Number(score);
  }
  return scores;
}

/** Verify all pages show the same scoreboard */
async function expectSameScoresAcrossPages(pages) {
  const allScores = [];
  for (const page of pages) {
    const scores = await collectScores(page);
    allScores.push(scores);
  }
  // All score maps should be equal
  const first = JSON.stringify(Object.entries(allScores[0]).sort());
  for (let i = 1; i < allScores.length; i++) {
    const current = JSON.stringify(Object.entries(allScores[i]).sort());
    expect(current).toBe(first);
  }
}

/**
 * Find which player page has a given role by checking the role indicator.
 * Returns the page that shows "You are the {role}".
 */
async function findPlayerByRole(pages, role) {
  for (const page of pages) {
    const indicator = page.locator(
      `.online-game-role-indicator:has-text("You are the ${role}")`,
    );
    if (await indicator.isVisible({ timeout: 2_000 }).catch(() => false)) {
      return page;
    }
  }
  return null;
}

/** Dump all page screenshots on failure */
async function dumpPages(pages, prefix = "failure") {
  for (let i = 0; i < pages.length; i++) {
    try {
      await pages[i].screenshot({
        path: `test-results/${prefix}-player-${i + 1}.png`,
      });
    } catch {
      // best-effort
    }
  }
}

// ─── Test 1: Full 4-player game ─────────────────────────────────────────────

test("full 4-player online game through one round", async ({ browser }) => {
  test.setTimeout(90_000);
  const ROOM = makeRoomCode();
  const players = [
    { name: "Manny", isHost: true },
    { name: "Mom", isHost: false },
    { name: "Boba", isHost: false },
    { name: "Computer", isHost: false },
  ];

  // 1. Open four isolated browser contexts
  const sessions = [];
  for (const p of players) {
    const { context, page } = await openApp(browser);
    sessions.push({ context, page, ...p });
  }

  try {
    // 2. Host creates room
    const host = sessions[0];
    await createOnlineRoom(host.page, ROOM, host.name);

    // 3. Three clients join
    for (let i = 1; i < sessions.length; i++) {
      const client = sessions[i];
      await joinOnlineRoom(client.page, ROOM, client.name);
    }

    // 4. All see the lobby with 4 connected players
    const pages = sessions.map((s) => s.page);
    for (const page of pages) {
      await expectRoster(page, players.map((p) => p.name));
    }

    // 5. Host clicks START GAME
    await host.page
      .getByRole("button", { name: "START GAME" })
      .click();

    // 6. All players enter OnlineGame
    await expectAllInGame(pages);

    // 7. All players click through RoleReveal
    // Clients first (they only set local state), then host last
    // (host's "I'M READY" advances everyone to bluff phase)
    for (let i = 1; i < sessions.length; i++) {
      await revealRole(sessions[i].page);
    }
    await revealRole(host.page);

    // 8. Bluff phase — host advances
    // Wait for bluff phase to appear
    await expect(host.page.locator(".online-game-bluff")).toBeVisible({
      timeout: 10_000,
    });

    // Find who is WAZIR
    const wazirPage = await findPlayerByRole(pages, "WAZIR");
    const isHostWazir = wazirPage === host.page;

    if (isHostWazir) {
      // Host is WAZIR: "MAKE YOUR GUESS" button appears
      await host.page
        .getByRole("button", { name: "MAKE YOUR GUESS" })
        .click();

      // Host selects a player to accuse (pick the first guessable card)
      const guessCard = host.page.locator(".online-game-guess-card").first();
      await expect(guessCard).toBeVisible({ timeout: 5_000 });
      await guessCard.click();

      // Confirm the guess
      await host.page
        .getByRole("button", { name: /ACCUSE/ })
        .click();
      await host.page
        .getByRole("button", { name: "CONFIRM" })
        .click();
    } else {
      // Host is NOT WAZIR: click PASS TO WAZIR to advance
      await host.page
        .getByRole("button", { name: "PASS TO WAZIR" })
        .click();

      // WAZIR client guesses
      if (wazirPage) {
        const guessCard = wazirPage.locator(".online-game-guess-card").first();
        await expect(guessCard).toBeVisible({ timeout: 10_000 });
        await guessCard.click();
        await wazirPage
          .getByRole("button", { name: /ACCUSE/ })
          .click();
        await wazirPage
          .getByRole("button", { name: "CONFIRM" })
          .click();
      }
    }

    // 9. Post-round: host selects an outcome
    await expect(
      host.page.locator(".online-game-outcome-buttons"),
    ).toBeVisible({ timeout: 10_000 });

    // Click "WAZEER CAUGHT THE CHOR" (teal outcome button)
    await host.page
      .getByRole("button", { name: "WAZEER CAUGHT THE CHOR" })
      .click();

    // Confirm points
    await host.page
      .getByRole("button", { name: "APPLY POINTS" })
      .click();

    // 10. Score reveal — all pages see the same scoreboard
    for (const page of pages) {
      await expect(page.locator(".online-game-score-reveal")).toBeVisible({
        timeout: 10_000,
      });
    }
    await expectSameScoresAcrossPages(pages);
  } catch (e) {
    await dumpPages(
      sessions.map((s) => s.page),
      "full-game",
    );
    throw e;
  } finally {
    for (const s of sessions) {
      await s.context.close().catch(() => {});
    }
  }
});

// ─── Test 2: Start-game regression (clients leave lobby) ────────────────────

test("clients transition from lobby to game on GAME_STARTED", async ({
  browser,
}) => {
  test.setTimeout(60_000);
  const ROOM = makeRoomCode();

  const sessions = [];
  for (const p of [
    { name: "Host1", isHost: true },
    { name: "Client1", isHost: false },
    { name: "Client2", isHost: false },
    { name: "Client3", isHost: false },
  ]) {
    const { context, page } = await openApp(browser);
    sessions.push({ context, page, ...p });
  }

  try {
    const host = sessions[0];
    await createOnlineRoom(host.page, ROOM, host.name);

    for (let i = 1; i < sessions.length; i++) {
      await joinOnlineRoom(sessions[i].page, ROOM, sessions[i].name);
    }

    // All see lobby
    const pages = sessions.map((s) => s.page);
    for (const page of pages) {
      await expectRoster(page, ["Host1", "Client1", "Client2", "Client3"]);
    }

    // Host starts game
    await host.page.getByRole("button", { name: "START GAME" }).click();

    // ALL pages should transition out of lobby into OnlineGame
    await expectAllInGame(pages);
  } catch (e) {
    await dumpPages(
      sessions.map((s) => s.page),
      "start-game-regression",
    );
    throw e;
  } finally {
    for (const s of sessions) {
      await s.context.close().catch(() => {});
    }
  }
});

// ─── Test 3: Join link prefills room code ────────────────────────────────────

test("join URL prefills room code on OnlineRoomSetup", async ({ browser }) => {
  test.setTimeout(30_000);
  const ROOM = makeRoomCode();

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate directly to the app with ?mode=peer&room=ROOM
    await page.goto(`/?mode=peer&room=${ROOM}`);
    await page.waitForSelector("text=JOIN ONLINE ROOM");

    // The room code input should be prefilled
    const roomInput = page.getByLabel("Room Code");
    await expect(roomInput).toHaveValue(ROOM);
  } finally {
    await context.close().catch(() => {});
  }
});
