# Quality bar

The optimizer enforces these. If a change would violate any of them, the
optimizer should pick a different fix.

## Visual
- **Contrast AA minimum** for body/nav/link text. The textPrimary
  (`#1F2937`) on canvas (`#FFFFFF`) or gradient-from (`#FDF8F6`) baseline
  passes; do not swap to textSecondary or textMuted on surfaces lighter
  than gradient-via.
- **No white text on white** or other Tailwind-collision artefacts (see
  design-tokens.md → "Never do").
- **Responsive**: every page must be readable at 375px — the smallest
  supported phone. Horizontal scroll is a bug.
- **Mobile nav**: hamburger appears below `lg` (1024px). The desktop
  inline nav appears at `lg` and up.
- **Modal + drawer**: opaque panel + dim backdrop; focus moves in on open,
  returns on close; Esc closes.

## Typography
- Headlines use `t-display` / `t-h1..h3` utilities, not ad-hoc sizes.
- Body copy ≥ 16px on mobile.
- Line length: long-form prose capped near 62ch (`max-w-[62ch]`).

## Copy
- Strings live in `frontend/src/content/*.ts`. Do not hardcode copy in
  components.
- Do not rewrite copy as part of a bug fix. Copy changes need explicit
  user sign-off.
- Numbers (years, case counts) must match `doctor.ts` — do not invent.

## Motion
- Respect `prefers-reduced-motion`. The `SectionProgress`, B/A slider,
  modal, and drawer already do; match that pattern if adding animation.
- No aurora / WebGL. That was cut from the superseded Claude-Design
  palette and is not coming back without a design review.

## Backend
- Every handler writes JSON. Never HTML.
- Every handler logs one structured `slog` line per request (INFO for
  success, WARN+ for 4xx/5xx).
- Do not introduce state. V1 is stateless; consultation + feedback log
  to stdout only.

## Commits
- Conventional-commit prefix: `fix(frontend):`, `fix(backend):`,
  `feat(...):`, `docs:`, `chore:`.
- One fix per commit. One commit per `/iterate` run.
- Co-author line preserved.
