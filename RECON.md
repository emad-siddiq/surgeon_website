# RECON — drsiddiq practice site

Audit date: 2026-08-02. Read-only audit; no files modified. All paths relative
to repo root. Line numbers verified against the working tree at audit time.

---

## 1. Stack & build

- **Framework:** React 18.3.1 + TypeScript 5.5.4, SPA. Router: `react-router-dom` 7.1.1 (`src/App.tsx` route table, 10 canonical routes + 4 `<Navigate>` aliases + 404).
- **Build:** Vite 5.4 (`vite.config.ts`), `tsc -b` before build. `vite-plugin-sitemap` generates `dist/sitemap.xml` from `SITE_URL` at build; `public/sitemap.xml` is a dev-server copy (both route lists must stay in sync — noted in the file).
- **Package manager:** npm (`package-lock.json` present; no `packageManager` pin).
- **CSS strategy:** Tailwind 3.4.7, hand-rolled design system. **No purchased theme, no vendor-owned files.** Everything under `src/` is safe to edit.
- **Component libraries:** none (no shadcn/MUI/Bootstrap). 18 in-house primitives in `src/components/ui/`.
- **CMS/content source:** none — all copy lives in `src/content/*.ts` (enforced by project rule; `TODO(content):` marks unverified values).
- **Markup constraints:** Google Maps iframe embed (`src/content/contact.ts:32` key, consumed in `src/pages/Location.tsx`); WhatsApp deep link (`contact.ts:18`); two outbound YouTube card blocks (`src/pages/Teaching.tsx`, Home MediaTeaser). No analytics, no chat widget, no form embeds (Consultation is deliberately not a form — `src/pages/Consultation.tsx:1-13`).
- **Note:** the repo was restructured on 2026-08-01 (former `frontend/` hoisted to root; Go backend deleted). Older docs may still reference `frontend/` paths.

## 2. Design tokens (as-defined vs. as-used)

**Defined in two mirrored sources** (sync is manual — drift risk is structural):
`tailwind.config.ts:15-76` (utilities) and `src/design-system/tokens.css:19-79` (CSS custom properties + `@font-face`).

- **Colors:** canvas `#FFFFFF`, surface `#F9FAFB`, gradient trio `#FDF8F6/#F9E4DA/#E3E3FA`, primary `#0D6EFD` (+hover `#0B5ED7`), accent `#39A7F1`, text `#1F2937/#34495E/#6C757D`, borders `#E5E7EB/#D1D5DB`, success/warn. Footer gradient hardcodes 4 extra hexes (`tokens.css:70-76`).
- **Type:** single self-hosted variable font, Roboto Flex 100–1000 (`tokens.css:11-17`). Scale defined as utilities `t-display/t-h1..h3/t-body-lg/t-body/t-caption/t-eyebrow` in `src/index.css:119-144`.
- **Spacing:** no custom scale — Tailwind default, orchestrated through `Section` size prop (`src/components/ui/Section.tsx:15-18`) and `Container` gutters (`src/components/ui/Container.tsx`: `px-4 sm:px-6 md:px-10`, `max-w-container` = 1280px).
- **Radii:** xs 4 / sm 8 / md 12 / lg 16 / xl 24px (+pill). **Shadows:** card/raised/focus (`tailwind.config.ts:50-54`). **Breakpoints:** Tailwind defaults (no custom `screens`).

**Drift report** (counts from `grep` over `src/**/*.tsx`):

- **117 arbitrary-value utilities** total. The bulk are semantically sound but unsystematized *measure* tokens: `max-w-[22ch]`×9, `max-w-[62ch]`×6, `max-w-[24ch]`×5, `max-w-[56ch]`×4, `max-w-[20ch]`×4 — a `ch`-based measure scale exists in practice but not in the config (only `max-w-prose: 64ch` is defined, and it is barely used).
- **7 inline hex sites** outside the token system:
  1. `src/components/ui/BookingActions.tsx:34` — `bg-[#25D366] hover:bg-[#1fb655]` (WhatsApp green)
  2. `src/components/layout/MobileBookingBar.tsx:55` — same pair duplicated
  3. `src/components/ui/Tag.tsx:8` — `text-[#0B6FA8]` (ad-hoc darkened accent)
  4. `src/pages/Teaching.tsx:63` — `from-[#1a1a1a] via-[#0d0d0d]…` card gradient
  5. `src/pages/Teaching.tsx:114` — `from-[#1c2836] via-[#141d28] to-[#1c2836]` (a *second, slightly different* dark gradient)
  6. `src/pages/Home.tsx:297` — `bg-[#FF0033]` (YouTube red)
  7. `tokens.css:70-76` — footer gradient hexes not in the Tailwind config
- **Other notable one-offs:** `text-[20px]` and `text-[1.375rem]` (two ad-hoc font sizes outside the scale); `duration-[180ms]`×4 (the motion token `--motion-micro` exists but isn't wired to a Tailwind utility); `tracking-[0.18em]` and `tracking-[0.14em]`×2 competing with `t-eyebrow`'s `0.12em` — three different eyebrow letter-spacings in one codebase; decoration magic numbers `w-[3px]`, `left-[5px]`, `w-[11px]` (SectionProgress rail).

Verdict: drift is real but small and enumerable — this is a disciplined codebase, not a hex soup.

## 3. Spacing audit (the whitespace complaint)

**Section-level vertical padding distribution** (all `py-*` with breakpoints, whole `src/`):
base: `py-8`×6, `py-10`×8, `py-12`×2 · sm: `py-12`×7, `py-14`×5, `py-16`×1, `py-20`×1 · md: `py-16`×6, `py-20`×7, `py-24`×1, `py-28`×1 · lg: `py-24`×2, `py-20`×1. (Remaining small `py-1..6` are chips/buttons/cells, not sections.)

That is **3 base values, 4 sm values, 5 md values** — two competing rhythm systems:

1. The `Section` component scale (`Section.tsx:15-18`): sm `py-8 md:py-12`, md `py-8 sm:py-14 md:py-20`, lg `py-10 sm:py-20 md:py-28`.
2. **Home's className overrides fighting it:** four Home sections pass `className="py-10 sm:py-12 md:py-16"` (`src/pages/Home.tsx:140, 188, 229, 331, 381, 441` area) on top of `size="md"`, and Stats passes `py-5 sm:py-6 md:py-8` (`Home.tsx:110`). Result: at md, Home's internal rhythm is 64px-pad sections butting against 80px-pad sections elsewhere — adjacent-section mismatch is the main *remaining* rhythm break.

**Outliers:** `md:py-28` (112px, `Section` lg — used on Gallery/Transformations) and `sm:py-20` are the largest steps; defensible on gallery pages, but they are the biggest single whitespace values on the site.

**Whitespace mechanics — checked and mostly clean:**
- No spacer divs, no empty wrappers double-padding, no `height:100vh`/`min-h-screen` on non-hero blocks (only `min-h-[44px]` touch targets). Paddings, not margins, drive section rhythm → no margin-collapse surprises.
- **One `<br />`** used for spacing: `src/pages/Location.tsx:86`.
- Mobile paddings were tightened on 2026-08-01 and are now **test-enforced**: opening-section container ≤40px top padding, leads ≤160 chars, Home hero ≤800px at 360×800, no horizontal scroll at 360px (`scripts/ux-flow.spec.mjs`, flow `mobile-density`). The historical "desktop padding surviving to 375px" cause is fixed and locked.

**Measure (line length):** prose is capped via `max-w-[56ch]`/`[62ch]`/`[64ch]` — nothing exceeds ~75ch. Tightest is `max-w-[42ch]` (fine, aside copy). No squeezed <45ch body blocks found.

**Max content width:** `max-w-container` (1280px) via `Container` — consistent on every page; one `max-w-[42rem]` sub-block (NotFound area). No page deviates.

## 4. Page & component inventory

| Route | Purpose | ~Sections |
|---|---|---|
| `/` (`Home.tsx`) | Marketing landing: Hero, Stats, AboutTeaser, FeaturedProcedures, DistinctionTeaser, MediaTeaser, ReviewsTeaser, ConsultCta | 8 (+SectionProgress rail) |
| `/about` | Bio (bioShort + 3-para bioLong), credentials, intro video | 3 |
| `/procedures` | 10 procedure cards → detail modal | 2 |
| `/bariatric` | Bariatric deep-dive, 4 procedures | 3 |
| `/distinctions` | Awards (Presidential Award, POMSS presidency, case volume) | 2 |
| `/teaching` | YouTube channel + podcast outbound | 2 |
| `/transformations` | Before/after sliders (3 pairs) | 1 (+CtaBand) |
| `/location` | Ambient video, map iframe, directions, hours | 2 |
| `/consultation` | WhatsApp/phone booking, script card, provider portrait | 2 |
| `/gallery` | 15-photo grid | 1 |
| `*` | 404 with return-home | 1 |

**Reuse is good** (18 primitives; `ClickableCard`, `PageHeader`, `Section`, `CtaBand`, `BookingActions` are shared), with three duplication flags:

1. **About and Consultation rebuild `PageHeader` by hand** — both open with a bespoke `<section className="bg-gradient-hero"><Container className="py-8 sm:py-14 …">` block (`About.tsx:29`, `Consultation.tsx:45-46`) instead of the shared component. Any header retune must now touch 3 places.
2. **Two near-identical dark video-card blocks** in `Teaching.tsx:63` and `Teaching.tsx:114` with slightly different hardcoded gradients; Home's MediaTeaser card (`Home.tsx:266` comment admits "same shell as ClickableCard but a real `<a>`") is a third variant.
3. **WhatsApp button markup + SVG path duplicated verbatim** in `BookingActions.tsx` and `MobileBookingBar.tsx` (including the hex pair) — one `WhatsAppButton` primitive is missing.

**Structurally inconsistent page:** `/about` — the only page whose opening section is also its main content (bio + CTAs + video in one block), and one of the two bypassing `PageHeader`. Also the only page exempted from the lead-length test (by design).

## 5. Typography

- **Loading:** one self-hosted variable TTF, Roboto Flex weight-range 100–1000, `font-display: swap` (`tokens.css:11-17`). No Google Fonts request — good. **But:** it ships as **1.6MB TrueType** (`src/assets/fonts/RobotoFlex-VariableFont.ttf`). No woff2, no subsetting. That's the single largest render-blocking-adjacent asset. Only ~2 effective weights are used (regular + medium — `font-medium` ×48 is the *only* weight utility in the codebase), so a 100–1000 axis range is paid for and unused.
- **Rendered scale** (from `src/index.css:119-144`, rem×16):
  - `t-display` 36 → sm 48 → lg 60px, lh 1.1, medium
  - `t-h1` 30 → 36 → 48px, lh 1.15 · `t-h2` 24 → md 30px, lh 1.25 · `t-h3` 18 → md 20px, lh 1.375
  - `t-body-lg` 18px / 1.625 · `t-body` 16 / 1.625 · `t-caption` 14 / 1.5 · `t-eyebrow` 12px, uppercase, tracking .12em
- **Hierarchy is scale-driven, not weight-driven** (everything is `font-medium` or regular) — consistent with the "quiet" brief. **Flags:** two off-scale sizes (`text-[20px]`, `text-[1.375rem]`); three competing eyebrow letter-spacings (.12em system vs `tracking-[0.14em]`×2, `tracking-[0.18em]` — plus `tracking-widest`×3); ALL-CAPS usage is confined to eyebrows/tags (not overused).

## 6. Responsive

- **Defined:** Tailwind default breakpoints. **Used:** `sm:`/`md:`/`lg:` heavily; `xl:` exactly once; `2xl:` never. Container caps at 1280 (= xl), so the unused upper range is harmless.
- **Fixed px:** only icon dims and `min-h-[44px]` touch targets — no fixed-width layout blocks.
- **Overflow:** none at 360 or 390 (test-enforced per route: `mobile-density / no-h-scroll`). Historical 375px audit also clean.
- **Mobile spacing scales down and is locked** by tests (≤40px opening padding, hero ≤1 viewport at 360×800). The desktop-padding-on-mobile failure mode is now structurally prevented.
- **No-mobile-treatment components:** none found; `SectionProgress` rail and the drawer are viewport-gated (`lg:` boundaries), `MobileBookingBar` is `<lg` only.

## 7. Content & trust signals (medical-specific)

**Present:**
- **Credentials:** MBBS, FRCS, Chief of Surgery, 25+ years, 1,400+ laparoscopic cases (`src/content/doctor.ts:14, 35-36`); surfaced in hero proof points, AboutTeaser, About, Footer.
- **Affiliations:** Shifa International Hospital throughout; POMSS presidency (`src/content/distinctions.ts:34`).
- **Procedure depth:** strong — 10 services with recommended/how/recovery/when-to-call sections + 4 bariatric procedures with candidacy/technique/outcomes/recovery/long-term (`src/content/services.ts`).
- **Before/after:** 3 consented pairs; consent + variance language in the page lead (`src/pages/Transformations.tsx:28`); per-story figures deliberately withheld pending patient-record verification (`src/content/media.ts:53-60`).
- **Booking path:** clear and redundant — `/consultation` (channels + verbatim script + provider portrait), persistent `MobileBookingBar`, CtaBands, footer.
- **Location:** map embed + directions deep-link + address; hours block exists but see gaps.

**Missing / unverified (all already flagged as TODOs in-repo):**
- **Hours are a placeholder** — "Mon – Sat / By appointment", `src/content/contact.ts:37` TODO.
- **No insurance or pricing information anywhere** (grep confirms; goal-state G5 lists fee range/insurance as a top-5 phone-call driver).
- **Zero individual patient quotes** — `patientReviews` is an empty array pending consent (`src/content/reviews.ts:55`).
- **Review aggregate unverified** — "4.8/5, 1,100+ reviews" carries a verify-before-launch TODO (`reviews.ts:22-30`).

**Claims to review verbatim (accuracy/compliance):**
- `src/content/services.ts:369` — "Most patients lose 60–80% of their excess body weight over 12–18 months. Type 2 diabetes goes into remission or impro…"
- `src/content/services.ts:403` — "Most patients lose 50–70% of their excess body weight over 12–18 months. Significant improvements in type 2 diabete…"
- `src/content/services.ts:479` — "Reflux resolution rates are very high when converting sleeve to Roux-en-Y for that indication."
- `src/content/services.ts:46` — `volume: 9000` (gall-bladder count; also shown as "9,000+" in Home stats, `src/pages/Home.tsx:124`)
- `src/content/distinctions.ts:27,30` — "970 bariatric procedures"
- `src/content/doctor.ts:36` — "1,400+ laparoscopic cases"
- `src/content/reviews.ts:30` — "Average across more than 1,100 patient reviews on independent healthcare directories."
No guarantees or "success rate" language found (banned by the copy-integrity test, `scripts/ux-flow.spec.mjs:72-85`, which also bans superlatives).

## 8. Assets & performance

- **Weight totals:** videos **39MB** (both referenced: `shifa.mp4` 22MB ambient loop + `shifa-video.mp4` 17MB intro, `src/content/media.ts:34-35`), images **10MB**, font 1.6MB. Zero webp/avif — formats are 17 jpg / 12 jpeg / 5 png.
- **The 22MB ambient video `autoPlay`s on /location** (`src/pages/Location.tsx:50-59`, `preload="metadata"` mitigates initial load but playback pulls the full file). On the stated 4G/LCP budget this is the site's worst perf liability.
- **Oversized images (>300KB, top offenders):** `distinctions/oxford.png` **1.5MB** at 980×1400 — a photo stored as PNG; `oxford1.png` 1.1MB; `gallery/8.jpg` 992KB at 2016×1512 (displayed as a ~400–600px grid tile); `gallery/6.jpg` 780KB; `gallery/4.jpg` 596KB; `before_3.png`/`after_3.png` ~500KB each (photos as PNG); `experience.jpg` 436KB — 11 files total >300KB.
- **Hygiene is otherwise good:** `width`/`height` present on content imgs, gallery lazy-loads beyond index 3 (`src/pages/Gallery.tsx`), Home portrait uses `fetchPriority="high"` + aspect-ratio skeleton slot (CLS-guarded, `Home.tsx:143-162`), reduced-motion honoured.
- **Icons:** 19 inline SVGs across 14 files — no icon font, no sprite; fine at this scale, though the WhatsApp path is pasted twice (see §4).
- **LCP/CLS risks:** hero slideshow image on `/`, the 1.6MB TTF (swap flash), and `/location` video. CLS is well-defended (explicit slots).

## 9. Accessibility quick pass

- **Contrast (computed against tokens):**
  - **FAIL — white on WhatsApp green `#25D366`: 1.98:1** (`BookingActions.tsx:34`, `MobileBookingBar.tsx:55`). The primary conversion button on the site fails AA at any size.
  - **Borderline — textMuted `#6C757D` on surface `#F9FAFB`: 4.49:1** (just under AA 4.5 for the 14px captions that use it).
  - textMuted on gradientVia `#F9E4DA`: 3.83:1 — AA-large only; small muted text on gradient bands is not compliant.
  - accent `#39A7F1` on white: 2.63:1 — would fail, but no `text-accent` usage exists (Tag uses a darkened `#0B6FA8` instead: 4.9:1 territory — the drift in §2 is actually load-bearing here).
  - Passing: textPrimary 14.68, textSecondary 9.29, primary-on-white and white-on-primary both exactly 4.50.
- **Headings:** exactly one h1 per route (test-enforced, `seo / unique-h1`); no order skips observed in sampled pages.
- **Alt text:** all content images populated from content files; intentional `alt=""` on decorative slides/thumb (`About.tsx:80`).
- **Focus:** global `:focus-visible` style (`src/index.css:71`); modal + drawer focus traps covered by ux-flow.
- **Tap targets:** `min-h-[44px]` enforced in the shared `Button` (`Button.tsx:26`).
- **Forms:** none exist (booking is via tel/WhatsApp), so no label-association surface.

## 10. Output

### (a) Top 10 issues, ranked by visual-impact ÷ effort

1. **WhatsApp CTA contrast 1.98:1** — `BookingActions.tsx:34`, `MobileBookingBar.tsx:55`. The most important button on the site fails AA; a darker green or dark text is a 10-minute, site-wide polish win.
2. **22MB autoplaying video on /location** — `Location.tsx:50-59`. Directly defeats the 4G/LCP goal on the page patients open to find the clinic; poster + click-to-play or a 2–3MB re-encode.
3. **1.5MB photo-as-PNG** — `src/assets/images/distinctions/oxford.png` (+`oxford1.png` 1.1MB). Two files ≈ 25% of the image budget; convert to jpg/webp at display size.
4. **Gallery JPGs 3–5× display size** — `gallery/8.jpg:992KB`, `6.jpg`, `4.jpg` et al. Resize + webp cuts ~3MB from a single route.
5. **1.6MB TTF variable font** — `tokens.css:16`. woff2 conversion + axis subsetting (only 2 weights used) ≈ 70–80% smaller with zero visual change.
6. **Home rhythm overrides fighting the Section scale** — `Home.tsx:140/188/229/331/381/441` (`py-10 sm:py-12 md:py-16` over `size="md"`). The remaining source of "inconsistent whitespace"; pick one scale step and delete the overrides.
7. **About + Consultation bypass PageHeader** — `About.tsx:29`, `Consultation.tsx:45`. Header retunes silently miss these two pages; consolidation is mechanical.
8. **Hours placeholder + zero insurance/fee info** — `contact.ts:37` TODO; §7 gaps. Top phone-call drivers per the project's own goal-state; blocked on practice input, not code.
9. **Unverified trust numbers** — `reviews.ts:30` (4.8/1,100+), `services.ts:369/403/479` (EWL % and remission claims), `distinctions.ts:27` (970). Needs practice sign-off before launch; compliance exposure until then.
10. **Eyebrow letter-spacing drift (3 values) + 2 off-scale font sizes** — `tracking-[0.14em]`/`[0.18em]` vs `t-eyebrow`, `text-[20px]`, `text-[1.375rem]`. Small, but it's the difference between "designed" and "assembled" at close reading.

### (b) Theme verdict

**Salvageable — clearly.** This is not a purchased theme; it's a coherent hand-rolled system (tokenized colors, a real type scale, one font, a Section rhythm component, 18 primitives) that has already had its mobile spacing tuned and test-locked. Nothing about the look needs a new design layer. The gap between current and "classy" is: (1) the media pipeline (video/image/font weight), (2) one contrast failure on the primary CTA, (3) unifying the last two rhythm/header inconsistencies, (4) trust content that only the practice can supply. Retune tokens and finish the content — do not redesign.

### (c) Blast radius of a design retune

- **Single-point leverage (safe, high-reach):** `tailwind.config.ts` + `src/design-system/tokens.css` (must be edited **in pairs** — the dual-source sync is manual and is itself a standing risk), `src/index.css` (type scale), `Section.tsx`, `PageHeader.tsx`, `Container.tsx`, `Button.tsx` — these six files style effectively every page.
- **Per-page touch if headers/rhythm unify:** `Home.tsx`, `About.tsx`, `Consultation.tsx`, `Teaching.tsx` (bespoke blocks listed in §4).
- **Risky/constrained:** none vendor-owned. Constraints are the Google Maps iframe (`Location.tsx` — its key at `contact.ts:32` is marked rotate-before-launch), WhatsApp/YouTube outbound links, and **the test harness itself**: `scripts/ux-flow.spec.mjs` enforces copy rules (no em dashes/superlatives), lead length ≤160ch, opening padding ≤40px, hero ≤800px@360, plus visual-qa baselines in `visual-tests/`. Any retune must keep those green or consciously renegotiate the caps.
- **Content layer** (`src/content/*.ts`) is copy-locked by project rule — design changes must not require copy edits without sign-off.

### (d) Open questions before any change

1. **Production domain** — everything (canonical, OG, sitemap) uses placeholder `https://drsiddiq.example` (`Seo.tsx:14`). What is the real hostname, and when is `SITE_URL` set?
2. **Practice-supplied facts:** OPD hours, consultation fee range, insurance/panel status, and verification of 1,400+/970/9,000/4.8-across-1,100 figures and EWL/remission percentages — who signs these off, and by when?
3. **Consent pipeline:** are individual patient quotes and per-story before/after figures (weight/timeframe) obtainable with written consent? Both trust surfaces are built and empty.
4. **Is the /location ambient video a requirement**, or can it become poster + click-to-play (or be dropped)? 22MB is the single biggest perf spend on the site.
5. **Hosting target for the image pipeline** — static host with build-time image optimization (e.g. vite-imagetools) vs. a CDN with on-the-fly transforms determines how §8 gets fixed.
6. **Is Roboto Flex mandated as-is**, or may the font be subset to the two used weights/axes (woff2)?
7. **WhatsApp brand green:** is exact `#25D366` a brand requirement, or may it darken (~`#128C4B`-range) to clear AA contrast on the primary CTA?
