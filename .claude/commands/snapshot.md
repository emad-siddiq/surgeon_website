---
description: Cheap state snapshot. Runs only the visual-qa agent, no fixes.
---

Delegate to the **visual-qa** subagent. No fixes, no commits — this is a
read-only snapshot of the product's current visual state.

After the subagent returns:
1. Print the `qualityBar` view path and the top 5 issues, ranked by
   severity.
2. Point the user at `visual-tests/report.json` and the screenshot
   directories if they want to dig deeper.

Use this as a sanity check between `/iterate` runs, or when the user asks
"how does it look right now?"
