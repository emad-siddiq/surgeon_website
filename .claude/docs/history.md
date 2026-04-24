# History

Squashed archive of pre-loop docs (PLAN.md, two CLAUDE_*_PROMPT bootstrap
files — all deleted 2026-04-23). The only content kept here is what future
iterations may still need to reference.

## Pre-launch content checklist (was PLAN.md § 6)

Every item maps to a `TODO(content):` comment in
`frontend/src/content/*.ts`. Must be resolved with the practice before
launch.

- [ ] Verify clinic phone, email, and full street address.
- [ ] Replace placeholder testimonial with a real consented quote.
- [ ] Confirm consultation fee, insurance providers, hours.
- [ ] Confirm fellowships / board certs / years for Distinctions.
- [ ] Supply alt text for every gallery image, B/A image, hero portrait.
- [ ] Confirm Google Maps pin coordinates for the Location section.

## Major architectural decisions worth remembering

- **Vite + React** migration from CRA happened pre-loop. Don't un-do.
- **Palette decision 2025**: archived Claude-Design cream/peach/lilac +
  Fraunces/Inter proposal was rejected. Current palette is white + blue
  primary + peach/lavender gradient bands. See `.claude/docs/design-tokens.md`.
- **No DB v1**: consultation + feedback are stdout logs only.
- **No analytics**: explicit design constraint.
- **Self-hosted fonts**: Roboto Flex only.

## Decisions needed

Unresolved, awaits user input:

- **rs/cors preflight quirk** (surfaced 2026-04-23): `rs/cors` v1.11.1
  aborts OPTIONS preflight with `Preflight aborted: headers '[Content-Type]'
  not allowed`, even with `Content-Type` in `AllowedHeaders`. Browser POSTs
  currently work because `Content-Type: application/x-www-form-urlencoded`
  is CORS-safe, but any `application/json` POST from a browser at a
  non-whitelisted origin will 403 at the preflight. Investigate before
  launch.
- **Replacement photos for B/A story 2** (surfaced 2026-04-23): the source
  assets `frontend/src/assets/images/before_after/before_2.jpg` and
  `after_2.jpg` ship with a circular photo mask and baked-in "Before" /
  "After" watermark text, which broke the rectangular drag-to-compare
  pattern mid-drag (visual-qa major on `transformations/slider-35-*`).
  The story has been temporarily removed from `beforeAfterStories` in
  `frontend/src/content/media.ts`. Request clean, rectangular, unwatermarked
  originals from the practice for the 150 kg → 70 kg / 9-month patient and
  reinstate the entry when received.

## Unfinished iterations

Agents append under this heading when they revert a half-done change at the
`1h45m` mark. Format: `YYYY-MM-DD — <issue> — <reason reverted>`.
