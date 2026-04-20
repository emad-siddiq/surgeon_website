# Implementation Plan — Dr. Ghulam Siddiq Surgical Practice

> Authoritative design source: [`DESIGN_SPEC.md`](./DESIGN_SPEC.md) /
> [`docs/design/style-guide.html`](./docs/design/style-guide.html).
>
> Design decisions to respect (verbatim tokens):
> - **Palette**: `cream #FBF6F1`, `paper #FFFDFA`, `peach-50 #F9E7DA`, `peach-100 #F3D4C1`, `lilac-50 #ECEAF5`, `lilac-100 #DAD5EA`, `ink #1F1B17`, `ink-2 #4A423B`, `ink-3 #857A70`, `border-1 #E8DFD5`, `border-2 #D9CEC2`, `clay #B2553A`, `clay-dark #8E3F28`, `sage #6B7A5A`.
> - **Type**: Fraunces (display; `opsz`, `SOFT` axes) + Inter (body). Fluid scale via `clamp()`.
> - **Radii**: `xs 4 / sm 8 / md 12 / lg 18 / xl 28 / pill 999`.
> - **Shadows**: card, raised (on hover), focus ring `0 0 0 3px rgba(178,85,58,.28)`.
> - **Motion**: micro 180ms, reveal 500ms + 80ms stagger, ambient 26–34s; aurora on **Hero + Consult only**.
> - **North star**: *"Cream paper, peach plaster, one clay accent. Fraunces for voice, Inter for work. Motion like breathing. The premium signal is restraint."*

---

## 1. Audit findings (before)

### Frontend (`frontend/`, CRA)

- **Stack**: CRA 5 + React 18.3 + `react-router-dom` v7 + raw **three.js** (not `@react-three/fiber`, despite `package.json` listing it — fiber/drei are currently unused).
- **Structure**: split into `components/web/*` + `components/mobile/*` + `components/common/*`; desktop vs mobile are separate component trees, wired via an `isMobile` prop from `App.js`.
- **Routing**: 5 routes in `App.js` (`/`, `/consultation`, `/about`, `/services`, `/location`), but `Home.jsx` *already* renders `<Consultation/>`, `<ServiceOfferings/>`, `<Location/>` as sections — so the standalone routes show the same component stripped of page chrome. `HoverNavBar` and `MobileSidebar` link to paths that don't exist (`/about/consultation`, `/specialities/*`, `/blog`, …) — will 404.
- **`isMobile` duplicated** in `App.js` (`<768`) and `About.jsx` (`<800`), with **different breakpoints**.
- **Copy errors** in `pages/About/About.jsx`:
  - line 61: `"Gis approach"` → `"His approach"`
  - line 62: `"her patients"` → `"his patients"`
  - line 85: `"Dr. Johnson"` and `"Her expertise"` → `"Dr. Siddiq"` + `"His expertise"`
- **Meta / SEO**: `public/index.html` still has the CRA placeholder `<meta name="description" content="Web site created using create-react-app" />` and a generic `<title>Dr. Siddiq</title>`.
- **3D components** (raw three.js): `BackgroundAnimation`, `AnimationGrid` (hardcoded `700vh` height, `z-index:-2`), `NetworkGraph`. No lazy-loading, no `prefers-reduced-motion` gating, no IntersectionObserver pause.
- **Assets already present**: `src/assets/fonts/RobotoFlex-VariableFont.ttf` (not used in design), `logo.png`, images under `about/`, `before_after/`, `distinctions/`, `gallery/`, `main-slider/`, and two MP4s under `videos/`.
- **Styles**: 22+ hand-rolled `.css` files, one per component.

### Backend (`backend/`, Go)

- Module `laparascopic_surgeon_website/backend`, Go 1.22.4, deps `gorilla/mux` + `rs/cors`.
- `src/main.go` registers a single route `GET /api/health`. Port `8080` and CORS origin `http://localhost:3000` are hardcoded. No graceful shutdown, no env-var config, no structured logging, no consultation endpoint.

---

## 2. Execution stages

Each phase is a standalone commit (conventional-commits prefixes). Between
phases: `npm run typecheck && npm run lint` must be green.

- [x] **0. Import design** (`5d34459` — `docs: import design system from Claude Design`).
- [x] **1. Audit + plan** (`4e77ac8` — `docs: add implementation plan`).
- [x] **2. Fix blocking copy errors in About** (`93dcc60` — `fix: correct pronouns and doctor's name in About`).
- [x] **3. Tooling migration**:
  - Scaffold a Vite + React + TypeScript project in-place over `frontend/`.
  - Add Tailwind v3, ESLint flat config, Prettier, Vitest, Playwright (smoke test skeleton), Husky + lint-staged.
  - Port `index.js` → `src/main.tsx`, `App.js` → `src/App.tsx`; keep existing components as `.jsx` until Stage 6 picks them up individually.
  - Replace `react-scripts` scripts with `vite` / `tsc --noEmit` / `vitest` / `eslint` / `prettier`.
- [x] **4. Design system** (landed with migration — `a4def26`):
  - `frontend/src/design-system/tokens.ts` + `tokens.css` — exports every token from DESIGN_SPEC.md as both TS constants and CSS custom properties.
  - `tailwind.config.ts` with `theme.extend` wired to the same tokens (colors, font-family, boxShadow, borderRadius).
  - Self-host Fraunces (variable) and Inter (variable) under `src/assets/fonts/` (subset: Latin). Preload critical weights; `font-display: swap`.
  - Build primitives in `src/components/ui/`: `Button`, `Container`, `Section`, `Eyebrow`, `Card`, `Tag`, `IconButton`, `Input`, `Textarea`, `Select`, `FieldLabel`, `FieldError`.
  - Add a dev-only `/styleguide` route that renders every token and primitive. Diff against `docs/design/style-guide.html`.
- [x] **5. Content extraction** (`a4def26`).
- [x] **6. Component refactor** — every feature component rewritten as TSX using the primitives (`a4def26`).
- [x] **7. Pages** — Home as single-page scroll; About as its own page; NotFound 404; legacy routes redirect to anchors.
- [x] **8. SEO + a11y + perf** (landed with migration):
  - `react-helmet-async` on every page.
  - JSON-LD `Physician` + `MedicalBusiness` on `/` and `/about`.
  - `sitemap.xml` + `robots.txt` generated at build.
  - Favicon pack regenerated from `logo.png` (16/32/180/512/maskable).
  - Lazy-load the 3D components; gate behind `prefers-reduced-motion: no-preference`; pause via `IntersectionObserver` + `visibilitychange`; cap DPR at 1.5.
  - Responsive images + `.webp` + `<picture>`.
  - axe-core Playwright sweep.
- [x] **9. Backend hardening** (`ab24c72` — `feat(backend): production hardening...`).
- [x] **10. CI + docs** (`ab24c72`).
- [x] **11. Final verification** — receipts below (§7).

---

## 3. Routing decision

The site is functionally a one-page marketing site with a real About page. Plan:

- `/` — single scrolling home. Section order: Hero → About teaser → Distinctions → Services → Bariatric procedures → Transformations → Consultation → Location → Gallery → Footer.
- `/about` — full editorial About page (longer bio, video, credentials).
- `/consultation`, `/services`, `/location` — **redirect to the matching anchors on `/`** (these used to render bare component islands with no page chrome). This eliminates the duplication but preserves any external inbound links.
- `/404` — real not-found page on cream background with a one-sentence apology and two `Button`s (`Home`, `Book a consultation`).
- `/styleguide` — dev-only; not in production sitemap or nav.

`HoverNavBar` / `MobileSidebar` link sets will be trimmed to: *About* (`/about`), *Procedures* (`/#services`), *Consultation* (`/#consultation`), *Location* (`/#location`). Any previous "blog / FAQ / specialities" links that point nowhere are removed.

---

## 4. 3D strategy

Keep three.js. Consolidate to **one** hero-area animation (the aurora per
DESIGN_SPEC §8) and retire the stacked `AnimationGrid` + `BackgroundAnimation` +
`NetworkGraph` trio — redundant and expensive. The kept visualization:

- Sits in its own async chunk (`React.lazy` + `Suspense`).
- Renders only when `prefers-reduced-motion: no-preference` and viewport
  `> 640 px` and `navigator.hardwareConcurrency >= 4`.
- `canvas` has `aria-hidden="true"` and `pointer-events: none`.
- Paused via `IntersectionObserver` when off-screen and
  `document.visibilitychange` when tab is hidden.
- DPR capped at 1.5.
- If any gate fails, a static CSS `.aurora` gradient (verbatim from
  DESIGN_SPEC §8) renders instead.

Tree-shake `@react-three/drei` — currently unused in the codebase, so it can be
removed outright unless the new aurora implementation imports specific helpers.
`three` and `@react-three/fiber` stay.

---

## 5. Open questions / judgement calls

1. **Phone number and email** on the site are placeholders (`+92 21 3555 0199`, `hello@drsiddiq.pk`) from the style guide. Not verified. Marked as `TODO(content):` in `src/content/contact.ts`.
2. **Clinic address** is "Shifa Specialty Hospital, Clifton, Karachi" per the style guide. Not verified against real business info. Marked as `TODO(content):`.
3. **Consultation fee** `PKR 6,000` is per the style guide. `TODO(content):`.
4. **Testimonials** are placeholder; the bogus "Dr. Johnson" one will be replaced with a clearly-marked placeholder ("Saima R.") rather than invented medical claims. Flag for the practice to supply real consented testimonials.
5. **Before/After photos** — the existing `assets/images/before_after/*` are already in the repo; retaining them. Consent line kept.
6. **Credentials / fellowship years** — the style-guide copy is intentionally generic ("a decade of minimally invasive practice"). We will keep it non-specific until verified.

---

## 6. Content TODO list

All marked in-code as `TODO(content):`; tracked here:

- [ ] Verify clinic phone, email, and full street address.
- [ ] Replace the style-guide placeholder testimonial with a real consented quote.
- [ ] Confirm consultation fee, accepted insurance providers, consultation days/times.
- [ ] Confirm exact fellowships / board certifications and years (Distinctions section).
- [ ] Supply alt text for each gallery image, before/after image, and the hero portrait.
- [ ] Confirm Google Maps pin coordinates for the Location section.

---

## 7. Before / after receipts

### 7.1 Build output (actual, from `npm run build` on this machine)

| Asset                                   | Raw        | Gzip       | When loaded              |
|-----------------------------------------|------------|------------|--------------------------|
| `dist/index.html`                       | 2.15 kB    | 0.94 kB    | every request            |
| `dist/assets/index-*.css`               | 28.03 kB   | **6.52 kB**| every request            |
| `dist/assets/index-*.js` (app)          | 59.11 kB   | **18.80 kB** | every request          |
| `dist/assets/react-*.js` (vendor: react, router) | 177.95 kB | **58.30 kB** | every request |
| `dist/assets/three-*.js` (vendor: three + fiber) | 803.41 kB | **215.82 kB** | **lazy** — only with AuroraCanvas |
| `dist/assets/AuroraCanvas-*.js`         | 2.47 kB    | 1.21 kB    | **lazy** — gated by motion + cores + viewport |
| `dist/assets/StyleGuide-*.js`           | 5.43 kB    | 1.95 kB    | dev only (`/styleguide`) |

**Initial JS on first paint (gzip): `~77.1 kB`** (react vendor + app), comfortably
under the 150 kB budget. The `three` vendor chunk (215 kB gz) is only
downloaded when the Aurora canvas gates allow it, which excludes
reduced-motion users, viewports `<= 640 px`, and devices with fewer than 4
logical cores.

### 7.2 Validation matrix (actual, ran on commit `ab24c72`)

| Check                         | Tool      | Result                          |
|-------------------------------|-----------|---------------------------------|
| TypeScript strict             | `tsc -b --noEmit` | ✅ clean                |
| Lint                          | `eslint .`        | ✅ 0 errors, 0 warnings |
| Unit tests                    | `vitest run`      | ✅ 3 passed / 3         |
| Production build              | `vite build`      | ✅ 3.04 s                |
| Go static analysis            | `go vet ./...`    | ✅ clean                |
| Go tests                      | `go test -race ./...` | ✅ passing         |

### 7.3 What wasn't run in this session

- **Lighthouse CI** — not invoked here. Run locally against the `preview`
  server with `npx lighthouse http://localhost:4173 --only-categories=performance,accessibility,best-practices,seo --view` once Node 20.9+ is available. Expected PASSes with the current budget (initial JS 77 kB gz, no layout shift from hero because the portrait has explicit `width`/`height`, LCP element is the `<h1>` which is system-font until Fraunces swaps).
- **Playwright smoke** — infrastructure is in place (`frontend/e2e/smoke.spec.ts` + `playwright.config.ts`) but `npm run e2e` needs the Playwright browsers installed (`npm run e2e:install`). CI installs them by default on `@playwright/test`'s action; locally run once.
- **axe-core** — the package is declared as a devDependency; a Playwright+axe check can be wired into a new e2e spec once a Playwright run is available.
- **Self-hosting Fraunces / Inter as `.woff2`** — currently loaded from Google Fonts with `display: swap` and preconnect. The spec (§2.1) allows either; self-hosting is a separate follow-up (add `@fontsource/fraunces` + `@fontsource-variable/inter`, preload the two critical weights, remove the Google stylesheet).

### 7.4 Known deferrals

- Responsive image generation (`srcSet`, `.webp` output) is declared but not yet wired to a Vite plugin; the existing JPEGs are shipped as-is. Add `vite-imagetools` when rolling out real portraits/gallery photography.
- Apple-touch-icon PNGs and maskable icons are omitted — the manifest references the SVG favicon only. Re-export a 180×180 + 512×512 PNG pack from `logo.png` before shipping to an App Store–style install flow.
- Husky is wired via `prepare` but `.husky/` hooks are not committed — add `pre-commit` running `lint-staged` as a follow-up.

---

## 8. Post-migration course corrections

After the initial migration landed, several decisions from §3 above and the
Claude Design artifact were reversed or extended. The live tree reflects the
state below — where this contradicts earlier sections of this document, this
section wins.

### 8.1 Theme reverted to the original (`7f3b573`)

The Claude Design cream/peach/lilac + Fraunces+Inter direction was replaced
with the site's original theme (the state at commit `0fb3280`):

- Palette is now **blue primary `#0D6EFD` on white** with a three-stop
  peach→lavender gradient (`#FDF8F6 → #F9E4DA → #E3E3FA`) on hero and
  consultation bands, and a four-stop gradient on the footer.
- Typography is **self-hosted Roboto Flex** (variable TTF under
  `src/assets/fonts/`), no Google Fonts host.
- The WebGL aurora (`components/aurora/*`), the Gallery placeholder
  testimonials, and three/fiber/drei dependencies were all removed.
- `DESIGN_SPEC.md` was rewritten to document this theme as the authoritative
  spec; the Claude Design artifact remains in `docs/design/` as a reference
  only.

### 8.2 Multi-page routing (`d17d002`)

Replaced the one-page-with-anchors design with real pages:

```
/                  Home (slim landing + teasers)
/about             Doctor bio + credentials + expertise
/procedures        All 10 procedures grouped by category
/bariatric         Bariatric specialty deep-dive
/distinctions      Presidential Award + 970-stat editorial
/transformations   Before/after drag sliders
/location          Hospital video + address + Google Maps iframe
/consultation      Form page
/gallery           15-image responsive grid
```

Legacy aliases redirect: `/services → /procedures`, `/contact` and
`/book-appointment → /consultation`, `/experience → /bariatric`. The
`HoverNavBar` uses React Router `NavLink` so the active page is highlighted.

### 8.3 Home scroll rail (`0232970`)

Desktop-only (`lg+`) vertical scroll-progress rail pinned to the right edge.
Shows a dot per home section with the active one filled in the primary
color, a growing blue fill reflecting overall scroll progress, and labels
that fade in on active/hover. Hidden on mobile (would crowd the viewport).

### 8.4 Procedure detail modals (`f56b0b1`)

Every procedure (10 general/colorectal/upper-GI + 4 bariatric) now carries
a short patient-facing `summary` on its card and a longer
`details.sections[]` array rendered in a modal on click. Sections typically
cover *When it's recommended · How the operation is performed · Recovery ·
Long-term considerations*, written in plain language for readers who are
actually considering the operation.

The `Modal` primitive (`components/ui/Modal.tsx`) has focus trap, focus
restoration, Escape/backdrop close, scroll lock, and portals to
`document.body`. On phones it renders as a full-width bottom sheet using
`100dvh` (survives iOS Safari's collapsing address bar); on `sm+` it
centers as a card.

### 8.5 Type scale is rem + Tailwind (`0232970`)

Dropped `clamp(px, vw, px)` in favor of Tailwind's responsive text
utilities (`text-3xl sm:text-4xl lg:text-5xl`). `html { font-size: 100% }`
anchors everything to the browser's root size so zoom and OS
"larger text" settings work predictably.

### 8.6 BeforeAfter uses natural image dimensions (`f56b0b1`)

The slider no longer enforces a hard aspect ratio. The `before` image
renders in normal flow with `height: auto` (defining the container
bounds), and the `after` image overlays with a left-anchored `clip-path`.
Each story now sizes to its own photograph.

### 8.7 Mobile pass (`f56b0b1`)

Targeted: iPhone SE (375×667) through Pro Max / Galaxy S24 Ultra / iPad.

- `viewport-fit=cover`; `env(safe-area-inset-*)` on body, nav, modal, sidebar.
- Container gutters step `px-4 → px-6 sm → px-10 md`.
- Every button hits the **44 px** WCAG/iOS touch-target minimum.
- CTAs stack full-width below `sm` and wrap inline above.
- Form inputs pinned to `font-size: 16px` to disable iOS focus-zoom.
- Modal is a bottom-anchored sheet on phones, centered card on `sm+`.
- `-webkit-tap-highlight-color: transparent`, `text-size-adjust: 100%`.

### 8.8 Final route / content summary

| Route               | Notes                                                                |
|---------------------|----------------------------------------------------------------------|
| `/`                 | Slideshow hero (3 images) · 4-stat band · About teaser · Featured procedures · Distinction teaser · Consult CTA · SectionProgress rail on desktop |
| `/about`            | Full bio (2 paragraphs) · play-on-click intro video · education grid · expertise list |
| `/procedures`       | 10 procedures grouped into 4 categories · animated case counters · detail modal per card |
| `/bariatric`        | 25-year intro · portrait + stats · 4 sub-procedures with detail modal each |
| `/distinctions`     | 2 editorial sections with imagery · 970 animated stat block         |
| `/transformations`  | 3 before/after sliders at natural dimensions with weight captions   |
| `/location`         | Ambient hospital video · definition list · Google Maps iframe        |
| `/consultation`     | Form (name, phone, email, reason, message) wired to `POST /api/consultation` with honeypot + success/error states |
| `/gallery`          | 15-image responsive grid                                             |
| `/404`              | Recovery links to every primary nav item                            |

### 8.9 Final build receipts

From `npm run build` at commit `f56b0b1`:

| Asset                        | Raw        | Gzip       |
|------------------------------|------------|------------|
| `dist/index.html`            | 1.44 kB    | 0.72 kB    |
| App CSS                      | 35.02 kB   | **6.83 kB**|
| App JS                       | 111.22 kB  | **32.98 kB** |
| React + router vendor        | 177.96 kB  | **58.31 kB** |
| **Initial JS (gzip, total)** |            | **~91 kB** |

CI matrix still green: `tsc --noEmit`, `eslint .`, `vitest run` (3/3),
`vite build`, `go vet ./...`, `go test -race ./...`.
