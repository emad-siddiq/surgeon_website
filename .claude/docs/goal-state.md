# Goal state

The target the agent loop is driving toward. `/iterate` picks its fix from
here when the quality bar is clean; it stops and reports **GOAL REACHED**
when every item is checked so the user can set a new goal.

## North star
A UI-error-free, mobile-and-web-ready website for **Dr. Ghulam Siddiq**
(Chief of Surgery, Shifa International Hospital, Islamabad) that:

1. **Converts** — every patient who lands can call Shifa or open WhatsApp in
   one tap, and knows to ask for Dr. Siddiq by name.
2. **Ranks** — for the queries *"best surgeon in pakistan"*, *"best surgeon
   in islamabad"*, *"laparoscopic surgeon islamabad"*, *"bariatric surgeon
   pakistan"*.
3. **Signals prestige** — reads like the practice of the country's leading
   laparoscopic bariatric surgeon. Quiet, confident, unhurried.
4. **Educates** — each procedure page answers the FAQs patients would
   otherwise phone the clinic about (indications, how it's done, recovery,
   when to call).

## Priority order when goals conflict
1. Zero UI errors (prerequisite — the quality bar).
2. Appointment conversion surface (phone + WhatsApp always reachable).
3. Prestige tone (copy, layout, typography hierarchy).
4. SEO technicals (metadata, structured data, sitemap, H1s, alt text).
5. Educational depth (procedure detail coverage).

If a fix improves a lower-priority goal while degrading a higher one, pick a
different fix.

## Checklist

Maintained by the optimizer. Mark `[x]` in the commit that achieves it.
Source of truth lives in this file, not scattered across other docs.

### G1 — UI error-free (mobile + web)
- [ ] `visual-qa` reports **0 critical, 0 major** issues across all 42 shots.
- [ ] `ux-flow` reports **0 failed** flows.
- [x] No Tailwind-collision regressions (`bg-base`, `text-base`, etc. — see
  design-tokens.md "Never do"). `index.html` body class swapped from
  `bg-base` → `bg-canvas`; `bg-base` no longer appears in the codebase and
  Tailwind config exposes no `base` color key.
- [ ] No horizontal scroll at 375px on any route.
- [ ] All images have non-empty `alt`; no broken `<img>` src at any viewport.

### G2 — Appointment conversion
- [ ] WhatsApp CTA + Shifa phone CTA visible above the fold on every route
  at 390px (header or hero, not only footer).
- [ ] Phone links use `tel:` with the `contact.phone.tel` value; WhatsApp
  links point at `contact.whatsapp.url`. Grep confirms no hardcoded numbers.
- [ ] `bookingLine` ("ask specifically for Dr. Ghulam Siddiq, Chief of
  Surgery") appears on `/consultation` and on procedure pages where a CTA
  fires.
- [ ] `BookingFeedbackPrompt` fires after WhatsApp/phone click and POSTs to
  `/api/feedback` (ux-flow covers this — keep it green).
- [ ] `/location` embeds Shifa Hospital map with a click-through to Google
  Maps directions.

### G3 — Prestige tone
- [ ] Hero headline reads as authority, not advertising. Current copy
  ("Pioneer of Laparoscopic Bariatric Surgery in Pakistan") is on-tone —
  do not weaken it.
- [ ] Credentials surface on every page header/footer: *Chief of Surgery,
  Shifa International Hospital · FRCS · 25+ years · 1,400+ laparoscopic
  cases*. Numbers must match `doctor.ts` exactly.
- [ ] No emoji, no "Book now!" exclamation CTAs, no countdown timers, no
  testimonial carousels with stars. Consent-backed quotes only.
- [ ] Typography hierarchy uses `t-display` / `t-h1..h3` utilities, not
  ad-hoc sizes (enforced by quality bar; restated here because it's load-
  bearing for prestige).

### G4 — SEO (rank for "best surgeon in pakistan/islamabad")
- [ ] Every route renders a unique `<title>`, `<meta name="description">`,
  and `<link rel="canonical">` via the `Seo` component.
- [ ] `<h1>` present exactly once per route (ux-flow asserts presence; add
  a uniqueness check).
- [ ] `Physician` JSON-LD on Home carries `name`, `medicalSpecialty`,
  `address`, `geo`, `telephone`, `areaServed: Islamabad, Pakistan`,
  `hasCredential` for FRCS, and `memberOf` for Shifa International Hospital.
- [ ] `MedicalProcedure` JSON-LD emitted per procedure on `/procedures` and
  `/bariatric`, linked to the `Physician` by `@id`.
- [ ] `/sitemap.xml` exists at the site root with every route and current
  `lastmod`. Robots.txt already references it; the file itself is missing.
- [ ] Open Graph image (`og:image`) exists and renders correctly in the
  share-card preview for Home, About, and Procedures.
- [ ] Target-phrase coverage: the strings **"best laparoscopic surgeon in
  Pakistan"**, **"bariatric surgeon in Islamabad"**, **"laparoscopic
  surgery Islamabad"** appear naturally (not keyword-stuffed) in Home H1/H2,
  About intro, or Procedures intro copy. Needs user sign-off on exact copy
  per CLAUDE.md rule 3 — flag in `history.md` § Decisions needed.
- [ ] All content images have descriptive `alt` — gallery, B/A, hero
  portrait. Track under G1 too but audit explicitly for SEO.
- [ ] `lang="en"` set on `<html>` via `Seo` (already done — keep it).

### G5 — Educational depth (reduce FAQ phone volume)
- [ ] Every `ServiceEntry` in `services.ts` has the four canonical detail
  sections: *When it is recommended · How the operation is performed ·
  Recovery · When to call the clinic*. Audit: all 10 currently present ✅
  for 2/10; several are missing "When to call". Confirm and fill.
- [ ] Every `BariatricProcedure` in `services.ts` has sections covering
  candidacy, how it's performed, typical outcomes, recovery, long-term
  commitments. Audit: 4/4 present ✅.
- [ ] Pre-op and post-op expectations answered on `/consultation` or a
  linked page: what to bring, fasting, approximate fee range, insurance
  status, expected hospital stay, follow-up cadence. These are the
  top-five reasons patients call; confirm copy with the practice before
  launch (TODOs already flagged in `contact.ts`).
- [ ] `/about` carries the long bio from `doctor.bioLong` (3 paragraphs),
  education list, and case-volume proof points.
- [ ] `/location` answers: address, parking, which entrance, OPD floor,
  hours, phone — a patient reading it should not need to call to find the
  clinic.

## How `/iterate` uses this file

1. After the optimizer commits its fix, the parent re-reads this file and
   each of the three test reports.
2. For each unchecked item, judge whether the current state satisfies it.
   Update the checkbox in the same commit if the optimizer's fix closed it.
3. If every item is checked, print:

   ```
   GOAL REACHED — please set a new goal in .claude/docs/goal-state.md.
   ```

   Do not start another iteration.
4. Otherwise, print the top 3 unchecked items (highest-priority bucket
   first) as the follow-up candidates.

## Amending the goal
Only the user edits the North Star, priority order, or the set of buckets.
The optimizer only flips checkboxes and may append audit notes under a
bucket as a nested bullet (never rewrite existing items).
