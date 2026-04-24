---
description: One 2h product-cycle iteration. Runs visual-qa + ux-flow + api-mock in parallel, then the optimizer commits a single fix.
---

Run one product-cycle iteration toward
[.claude/docs/goal-state.md](../docs/goal-state.md). Budget:
**2 hours wall-clock**. Target: a clean commit landed between the **1h45m**
and **2h00m** marks.

## Steps

1. **Note start time.** Record `iterationStartedAt` in an internal scratch
   variable (an ISO timestamp). You will check it at step 5.

2. **Read the goal state.** Open `.claude/docs/goal-state.md` and note the
   unchecked items in priority order (G1 → G5). If every item is already
   `[x]`, skip to step 7 and print `GOAL REACHED` instead of iterating.

3. **Fan out, in parallel** (single Agent-tool message with three calls):
   - `visual-qa` subagent → returns `report.json` summary
   - `ux-flow` subagent → returns `ux-flow.json` summary
   - `api-mock` subagent → returns `api-mock.log` summary

   Do not wait sequentially; all three read the dev server on :5175, so the
   first caller starts it and the others reuse it.

4. **Merge the three reports.** You (the parent) should see ≤7KB of JSON
   total. Do not read raw screenshots at this step — the visual-qa agent
   already summarized them.

5. **Delegate to `optimizer`** with the merged reports **and the list of
   unchecked goal-state items** in its prompt. The optimizer picks ONE fix
   following its decision order (bugs first, then highest-priority goal
   gap), implements it, re-shoots the affected view, flips the goal-state
   checkbox if applicable, commits, and returns a summary.

6. **Time check.** If the optimizer is not done and the wall clock is past
   **1h45m** from `iterationStartedAt`, send the optimizer one final message:
   "Wrap up. Revert if not ready, or finalize now." The optimizer has its
   own internal budget rule and should comply.

7. **Report to user.** Re-read `.claude/docs/goal-state.md` (the optimizer
   may have flipped a checkbox). Print:
   - The commit SHA + message.
   - **Goal progress**: `<checked>/<total>` items, grouped by bucket —
     e.g. `G1 5/5 · G2 3/5 · G3 1/4 · G4 4/9 · G5 2/5`.
   - The top 3 remaining issues from the merged report, then the top 3
     unchecked goal items (highest-priority bucket first) as follow-up
     candidates.
   - If **every** goal-state checkbox is now `[x]`, print a final line:
     ```
     GOAL REACHED — please update .claude/docs/goal-state.md with a new goal.
     ```
     This is the signal the user is waiting for so they can set the next
     goal. Do not auto-start another iteration in that case.
   - Token usage for this iteration if available.

## Constraints
- If any subagent returns `failed: -1` (harness failure), stop. Surface the
  error to the user and ask whether to continue.
- Never run this loop recursively without an explicit user ask.
- Screenshots pile up fast — the `visual-qa.mjs` script overwrites files
  per-iteration, and `visual-tests/report.json` is append-less (single
  object). The `visual-tests/` folder is gitignored except for the
  `capture.mjs` wrapper and `report.json`.
