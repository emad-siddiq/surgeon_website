# Testing

Three tiers, each with a dedicated subagent.

## 1. Visual QA — `scripts/visual-qa.mjs`
Captures 42 PNGs of every route + significant state at 390×844, 834×1194,
1920×1080. Writes `visual-tests/report.json` with a heuristic issue list.
- Run: `node scripts/visual-qa.mjs`
- Only one route: `node scripts/visual-qa.mjs --only home`
- Boots the dev server on :5175 if not already up.
- Deterministic: `reducedMotion: 'reduce'`, animations killed via init script,
  `serviceWorkers: 'block'` so a stale SW on :5173 can't hijack.

## 2. UX flow — `scripts/ux-flow.spec.mjs`
Scripted user journeys using raw Playwright. Writes
`visual-tests/ux-flow.json`.
- Run: `node scripts/ux-flow.spec.mjs`
- Exits 0 on pass, 1 on any failure, -1 on harness startup failure.
- Five flows: navigation, mobile drawer, procedure modal focus trap,
  booking-action anchors, 404 recovery.

## 3. API mock — `backend/src/main_test.go` → `TestMockFlows`
In-process httptest server + router + CORS middleware. Eight subtests cover
health, ready, consultation happy/bad-email/unknown-fields, feedback
happy/bad-outcome, CORS preflight.
- Run: `cd backend && go test ./src -run TestMockFlows -v`
- No live server needed.

## Running everything
- Slash command: `/iterate` runs all three in parallel via subagents and
  then delegates to the optimizer.
- Cheap state check: `/snapshot` runs visual-qa only.

## Smoke (legacy)
`frontend/e2e/smoke.spec.ts` is the `@playwright/test` smoke. It is
orthogonal to the loop — leave it alone unless the copy assertion
(`/Start with a conversation/`) needs syncing with the current home CTA.

## Budget + reporting shape
All three agents produce JSON reports ≤3KB each. The optimizer agent
consumes all three and picks **one** fix. One iteration = one commit.
