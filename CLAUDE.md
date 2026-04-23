# Dr. Ghulam Siddiq — Practice Site (Agent Entry Point)

Production website for a laparoscopic / bariatric surgeon. **Vite + React + TS
+ Tailwind** frontend, **Go + mux** backend. No DB; consultation + feedback
posts log to stdout.

## Where to look
- **Product state**: [README.md](README.md) — stack, scripts, envs, deploy.
- **Design tokens**: [.claude/docs/design-tokens.md](.claude/docs/design-tokens.md) — palette, type, radii, shadows. Source of truth alongside `frontend/tailwind.config.ts` + `frontend/src/design-system/tokens.css`.
- **Architecture**: [.claude/docs/architecture.md](.claude/docs/architecture.md) — routes, components, content files, backend handlers.
- **Quality bar**: [.claude/docs/quality-bar.md](.claude/docs/quality-bar.md) — what "good" looks like; enforced by the optimizer agent.
- **Testing**: [.claude/docs/testing.md](.claude/docs/testing.md) — visual-qa, ux-flow, api-mock scripts.
- **History / pre-launch checklist**: [.claude/docs/history.md](.claude/docs/history.md) — archive of migration plan, before/after receipts, open TODOs.

## Agents & commands
- `/iterate` — one 2h product-cycle loop: visual-qa → ux-flow → api-mock → optimizer → commit.
- `/snapshot` — cheaper: visual-qa only, produces the 42-shot set + JSON report.
- Subagents live in `.claude/agents/` (Task tool, or called from `/iterate`).

## Hot rules (do not violate)
1. **Tailwind color token `canvas` NOT `base`.** `text-base` is a built-in font-size utility; naming a color `base` overrides it and paints text white. Fixed in commit `1658d97`.
2. **Dev server port is 5175, not 5173.** Port 5173 is squatted by an unrelated project's dev server. See `.claude/launch.json`.
3. **Content is data-driven.** User-visible strings live in `frontend/src/content/*.ts`. Do not hardcode copy in components.
4. **No analytics, no third-party scripts.** Only external loads allowed: Google Maps iframe on `/location` (lazy), WhatsApp deep-link on user click.
5. **Commit per iteration.** One fix, one commit. Message format: `fix(frontend): <concise>` or `feat(frontend): <concise>`.

## Loop budget
Each `/iterate` run has a **2 hour wall-clock budget**. Wrap up and commit between the **1h45m–2h00m** mark. If a fix isn't ready by then, revert and leave a note in `.claude/docs/history.md`.
