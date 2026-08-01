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

## TDD discipline
The three agents above are **runners** — read-only by contract. The
optimizer is the only role that writes tests, and it must follow strict
red-green-refactor (CLAUDE.md hot rule #6, quality-bar.md → Process):

1. **RED** — extend the test that owns the regression *before* touching
   production code:
   - Functional / interaction / a11y → `scripts/ux-flow.spec.mjs`.
   - Backend contract → a new subtest under `TestMockFlows` in
     `backend/src/main_test.go`.
   - Visual-DOM (computed style, presence, layout box) → prefer a
     Playwright assertion in `ux-flow.spec.mjs`; only fall back to a
     `visual-qa.mjs` before/after pair when no code assertion is
     possible, and explain why in the commit body.
   Run the test. Confirm it fails *for the right reason*.
2. **GREEN** — make the smallest production change that flips the test
   green. Don't edit the test you just wrote.
3. **REFACTOR** — tighten under green; stop when the diff stops shrinking.
4. Commit the test and the fix together. The commit body names the
   test (file + case).

A test that was weakened, skipped, or deleted to "pass" is a process
failure, not a fix. If you believe a test is genuinely stale, log it
under `## Decisions needed` in `.claude/docs/history.md` and pick
another item.
