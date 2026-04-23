---
description: One 2h product-cycle iteration. Runs visual-qa + ux-flow + api-mock in parallel, then the optimizer commits a single fix.
---

Run one product-cycle iteration. Budget: **2 hours wall-clock**. Target: a
clean commit landed between the **1h45m** and **2h00m** marks.

## Steps

1. **Note start time.** Record `iterationStartedAt` in an internal scratch
   variable (an ISO timestamp). You will check it at step 5.

2. **Fan out, in parallel** (single Agent-tool message with three calls):
   - `visual-qa` subagent → returns `report.json` summary
   - `ux-flow` subagent → returns `ux-flow.json` summary
   - `api-mock` subagent → returns `api-mock.log` summary

   Do not wait sequentially; all three read the dev server on :5175, so the
   first caller starts it and the others reuse it.

3. **Merge the three reports.** You (the parent) should see ≤7KB of JSON
   total. Do not read raw screenshots at this step — the visual-qa agent
   already summarized them.

4. **Delegate to `optimizer`** with the merged reports in its prompt. The
   optimizer picks ONE fix, implements it, re-shoots the affected view,
   commits, and returns a summary.

5. **Time check.** If the optimizer is not done and the wall clock is past
   **1h45m** from `iterationStartedAt`, send the optimizer one final message:
   "Wrap up. Revert if not ready, or finalize now." The optimizer has its
   own internal budget rule and should comply.

6. **Report to user.** Print:
   - The commit SHA + message.
   - The top 3 remaining issues from the merged report (so the user can
     decide whether to call `/iterate` again).
   - Token usage for this iteration if available.

## Constraints
- If any subagent returns `failed: -1` (harness failure), stop. Surface the
  error to the user and ask whether to continue.
- Never run this loop recursively without an explicit user ask.
- Screenshots pile up fast — the `visual-qa.mjs` script overwrites files
  per-iteration, and `visual-tests/report.json` is append-less (single
  object). The `visual-tests/` folder is gitignored except for the
  `capture.mjs` wrapper and `report.json`.
