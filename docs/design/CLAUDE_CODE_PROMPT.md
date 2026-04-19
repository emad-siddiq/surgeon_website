# Claude Code Mega-Prompt — Dr. Ghulam Siddiq Surgical Practice Website

Paste the block below into Claude Code from the repo root. It fetches the hosted design artifact produced in the Claude Design phase and implements against it.

---

## THE PROMPT

You are working on a production website for **Dr. Ghulam Siddiq**, a board-certified laparoscopic and bariatric surgeon. The repo contains a React (Create React App) frontend in `frontend/` and a minimal Go backend in `backend/`. Your job is to take the project from "prototype" to "production-ready" — modernizing the stack, implementing the design system that was locked in during a dedicated design phase, polishing typography and layout, and shipping a site that looks and feels like a premium surgical practice.

Work autonomously. Plan, implement, verify, and commit in logical stages. Do not ask for clarification on anything covered below — make sensible judgment calls and document them. Only stop to ask if something is genuinely ambiguous (e.g. a destructive action or a missing API key).

### 0. Fetch the design — DO THIS FIRST, BEFORE ANYTHING ELSE

The design direction has already been locked in and lives at:

**`https://api.anthropic.com/v1/design/h/8Q3SsiSdCnrcRCpL4EIEHw?open_file=Dr+Siddiq+Style+Guide.html`**

Do the following, in order, before any other work:

1. Fetch the base URL `https://api.anthropic.com/v1/design/h/8Q3SsiSdCnrcRCpL4EIEHw` and read the README / manifest / index. Identify every file in the bundle.
2. Fetch `Dr Siddiq Style Guide.html` (the URL above, with `?open_file=Dr+Siddiq+Style+Guide.html`). Save the full raw HTML to `docs/design/style-guide.html` in the repo, creating the directory if needed.
3. Fetch every other file listed in the manifest (additional HTML pages, CSS, images, tokens JSON if present) and save them under `docs/design/` preserving the original filenames.
4. Parse `Dr Siddiq Style Guide.html` to extract the full design spec. Generate `DESIGN_SPEC.md` at the repo root as a clean, structured markdown document containing: color tokens (name + hex + intended use + WCAG AA pairings), typography system (font families, sources, full type scale with `clamp()` values, line-heights, letter-spacing, weights), spacing / radius / shadow tokens, motion tokens (durations + easing + reduced-motion behavior), every component primitive with all states (resting / hover / focus / disabled / loading where relevant) and their exact padding/radius/shadow values, and section-by-section art direction notes. Every value in `DESIGN_SPEC.md` must be traceable back to the style guide HTML — do not invent values.
5. Commit: `git add docs/design DESIGN_SPEC.md && git commit -m "docs: import design system from Claude Design"`.

From this point on, **`DESIGN_SPEC.md` and `docs/design/style-guide.html` are the authoritative design sources**. Open the style guide HTML in a browser (or render it locally) whenever you need to sanity-check visuals. If anything in this prompt contradicts the design artifacts, the artifacts win.

If the fetch fails or the manifest is unclear, stop and ask me before proceeding — do not guess the design.

### 1. Design direction (summary — details in `DESIGN_SPEC.md`)

The design phase locked in a **polished, warm, boutique-practice** direction: soft cream / peach / lilac palette, a serif display + sans body typography pairing, generous whitespace, and restrained motion. Read as calm, reassuring, and premium — not clinical-sterile, not tech-flashy. Signature 3D/WebGL background visualizations stay as a visual hook. Reuse all existing assets in `frontend/src/assets/` (fonts, images, videos, logo). Do not fetch new stock imagery.

### 2. Stack migration

Migrate the frontend off Create React App to a modern stack:

- **Vite** (replace `react-scripts`)
- **TypeScript** (strict mode; migrate `.jsx` → `.tsx` incrementally, starting with shared components and pages)
- **Tailwind CSS v3** configured with the design tokens from `DESIGN_SPEC.md`. Keep component-scoped CSS only where Tailwind is genuinely awkward (complex keyframe animations, three-fiber shaders, third-party overrides); otherwise replace the `.css` files.
- **React Router v7** (already installed) — keep
- **react-helmet-async** for per-page `<title>`, meta, Open Graph, and JSON-LD
- **ESLint** (flat config) + **Prettier** + **TypeScript ESLint** + **eslint-plugin-jsx-a11y**
- **Vitest** + **@testing-library/react** for unit tests (replace CRA's Jest setup)
- **Playwright** for one smoke E2E test (`/`, `/about`, nav, contact CTA visible)
- **Husky** + **lint-staged** for pre-commit type-check + lint + format

After migration the dev command must be `npm run dev` and build must be `npm run build` producing a static `dist/`.

### 3. Design system implementation

Create `frontend/src/design-system/` with the tokens exactly as defined in `DESIGN_SPEC.md`. Expose all colors as CSS custom properties on `:root` **and** in `tailwind.config.ts` under `theme.extend.colors`. Do the same for spacing, radii, shadows, and font families. The values in `DESIGN_SPEC.md` are authoritative — copy them verbatim, do not round or rename.

Self-host the fonts named in the spec under `frontend/src/assets/fonts/` as `.woff2`, subset to Latin, preload the two critical weights, and set `font-display: swap`.

Render a `/styleguide` route in the React app that shows every token and primitive. Diff your rendered `/styleguide` against the imported `docs/design/style-guide.html` side-by-side and iterate until they match visually. This route is dev-only — exclude from production sitemap.

### 4. Component library

Build these reusable primitives in `frontend/src/components/ui/` as TypeScript components with proper prop types, implementing the visual specs from `DESIGN_SPEC.md` exactly (resting / hover / focus / disabled states, radii, shadows, padding):

- `Button` (variants and sizes as specified)
- `Container` (enforces max-width + gutter)
- `Section` (vertical rhythm wrapper; `tone` prop switches background)
- `Eyebrow` (uppercase caption above headlines)
- `Card` (with `tone` and `elevation` props)
- `Tag`
- `IconButton`
- `Input` / `Textarea` / `FieldLabel` / `FieldError` (for the consultation form)

Then refactor the existing feature components — **Hero, HoverNavBar, AboutCard, Consultation, Distinctions, ServiceOfferings, BariatricCard, Transformations, Location, Gallery, Footer, MobileLogo, MobileSidebar** — to use the primitives and design tokens. Before/After slider (`react-before-after-slider-component`) and Swiper stay; restyle them to match the spec.

### 5. Specific UX fixes (found during audit — address all)

- **Routing duplication:** `App.js` renders `/consultation`, `/about`, `/services`, `/location` as standalone pages, but those same components are also rendered inside `Home.jsx` as sections. Decide per route: either anchor-link to a section on `/` (preferred for a one-page-ish marketing site) *or* make them real pages with page-level layout. Be consistent.
- **Responsive split:** `App.js` and `About.jsx` each re-implement their own `isMobile` resize hook. Extract `useIsMobile()` to `hooks/useMediaQuery.ts` and use it everywhere. Also consider replacing desktop-vs-mobile component forks (`components/web/*` vs `components/mobile/*`) with a single responsive component where feasible — the current fork doubles maintenance.
- **Copy errors:** `About.jsx` has `"Gis approach"` (should be "His"), mixes "she/her" and "he/him" for Dr. Siddiq (should be **he/him** throughout), and references "Dr. Johnson" in a testimonial (should be "Dr. Siddiq"). Fix all pronouns and names.
- **Hero:** follow the hero art direction in `DESIGN_SPEC.md`. Replace auto-playing hero video with a poster image + play-on-click overlay; autoplay + muted is fine for background footage but not for a testimonial/intro video.
- **HoverNavBar:** ensure it's keyboard-accessible (visible focus ring, Escape closes, tab order correct) and has an `aria-label`. Add a sticky scrolled state with a subtle backdrop blur per spec.
- **MobileSidebar:** trap focus when open, close on route change, `aria-expanded` on trigger, `aria-modal` on panel.
- **NetworkVisualization / AnimationGrid / BackgroundAnimation:** **keep these — the 3D graphics are a signature part of the site's look and feel and should stay.** Do not delete them or replace them with static CSS/SVG. Instead, make them production-safe: lazy-load via `React.lazy` + `Suspense` so they never block initial paint, gate rendering behind `prefers-reduced-motion: no-preference` (static gradient fallback when motion is reduced), throttle/pause when the canvas is off-screen (IntersectionObserver) and when the tab is hidden (`document.visibilitychange`), cap `devicePixelRatio` at 1.5, downgrade to a lighter particle count or disable entirely on low-end devices (check `navigator.hardwareConcurrency < 4` or a small viewport), and ensure the canvas has `aria-hidden="true"` and `pointer-events: none`. Audit their placement — pick the single strongest one for the hero area; if two are visually redundant, retire the weaker one rather than stacking both. Tree-shake `@react-three/drei` imports to only what's actually used so the bundle cost is justified.
- **Images:** add `loading="lazy"`, `decoding="async"`, explicit `width`/`height` to prevent CLS, and generate responsive `srcSet` at build time (use `vite-imagetools` or equivalent). Convert `.jpg/.jpeg` hero assets to `.webp` with `.jpg` fallback via `<picture>`.
- **Fonts:** self-host, preload the two critical weights named in `DESIGN_SPEC.md`, `font-display: swap`, subset to Latin.
- **Forms:** the Consultation component posts to the backend — wire it to `POST /api/consultation`. Add client-side validation (name, email, phone, preferred date, message), inline error states, success confirmation, and a honeypot field for spam.

### 6. Accessibility (WCAG 2.2 AA target)

- Every interactive element has a visible focus state as specified in `DESIGN_SPEC.md`.
- Color contrast: verify every foreground/background pairing against the ratios listed in the spec. Fix any that fall below AA.
- Semantic HTML: one `<h1>` per page, proper `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- All images have meaningful `alt` or `alt=""` if decorative.
- Videos have captions or a text transcript link.
- Skip-to-content link at top of `<body>`.
- `lang="en"` on `<html>`.
- Run `axe-core` via a Playwright test and fix every violation.

### 7. SEO & metadata

- Per-page `<title>` and `<meta name="description">` via `react-helmet-async`.
- Open Graph + Twitter card tags (reuse hero image as OG image, 1200×630).
- JSON-LD `Physician` + `MedicalBusiness` schema on the home and about pages (name, image, address, telephone, priceRange, medicalSpecialty: "Bariatrics" / "Surgery", sameAs links).
- `sitemap.xml` and `robots.txt` generated at build time.
- Canonical URL meta tag.
- Preconnect to any CDN used for fonts.
- Favicon set regenerated from the logo at multiple sizes (16, 32, 180 apple-touch, 512, maskable).

### 8. Performance budget

Target Lighthouse (mobile, throttled) scores ≥ 95 across Performance, Accessibility, Best Practices, SEO. Specifically:

- Initial JS bundle (gzipped) ≤ 150 KB
- LCP < 2.0s on fast 3G
- CLS < 0.05
- No layout shift from hero video — reserve aspect ratio
- Route-level code splitting (`React.lazy` for each page)
- The 3D background components stay (see §5) — split them into their own async chunk loaded after first paint so they don't count against the initial JS budget. Tree-shake `@react-three/drei` aggressively (only import the specific helpers used) and confirm the deferred chunk is under ~200 KB gzipped.

Run `vite build` + `vite-bundle-visualizer` and report final bundle sizes.

### 9. Backend hardening (minimal)

Keep Go + Gorilla Mux. Add:

- `POST /api/consultation` — validates payload, logs to stdout, returns 200 with `{status, message}`. (No DB required for v1; log is sufficient, document this in README.)
- Read `PORT`, `ALLOWED_ORIGIN`, and `LOG_LEVEL` from env vars (use `os.Getenv` with sensible defaults).
- Replace hardcoded `http://localhost:3000` CORS origin with env-driven allowlist.
- Structured JSON logging (`log/slog`).
- Graceful shutdown on SIGINT/SIGTERM with 10s timeout.
- `GET /api/health` already exists — add `GET /api/ready` that returns 503 during shutdown.
- Add a `Dockerfile` (multi-stage, distroless final image) and a root-level `docker-compose.yml` running frontend (served via nginx from `dist/`) + backend.

### 10. Deploy readiness

- Root-level `README.md` rewritten: project description, architecture diagram (ASCII ok), local dev quick-start, environment variables table, build and deploy instructions for Vercel/Netlify (frontend) and Fly.io/Render (backend), and a "Content editing guide" section for non-technical edits (where to change the doctor's bio, testimonials, services list).
- Extract all copy (doctor bio, services list, distinctions, testimonials, location, contact info) into `frontend/src/content/*.ts` typed objects so non-dev edits are easy and type-safe.
- `.env.example` files in both `frontend/` and `backend/`.
- GitHub Actions workflow `.github/workflows/ci.yml`: on PR, run `npm ci && npm run typecheck && npm run lint && npm run test && npm run build` for frontend and `go vet ./... && go test ./... && go build ./...` for backend.

### 11. Execution plan

Work in this order, committing after each phase with a conventional-commits message (`feat:`, `refactor:`, `chore:`, `fix:`, `docs:`):

1. **Import design** — fetch and save per §0. Do not skip this step.
2. **Audit & plan** — create `PLAN.md` at repo root summarizing findings and the approach. Include a checklist you'll tick off and a "Design decisions to respect" section quoting key tokens from `DESIGN_SPEC.md`.
3. **Tooling migration** — Vite + TypeScript + Tailwind + ESLint + Prettier + Vitest + Playwright + Husky. Confirm dev server runs and a trivial `<App/>` renders.
4. **Design system** — tokens, fonts, UI primitives, `/styleguide` route. Diff your `/styleguide` output against `docs/design/style-guide.html` and iterate until they match.
5. **Content extraction** — pull all hardcoded strings into `src/content/`.
6. **Component refactor** — one feature component at a time, in this order: Footer → HoverNavBar → MobileSidebar → Hero → AboutCard → Distinctions → ServiceOfferings → Consultation → BariatricCard → Transformations → Location → Gallery. After each, compare to the relevant section in `DESIGN_SPEC.md` and the style guide HTML.
7. **Pages** — Home (section-based), About, and a proper 404.
8. **SEO + a11y + performance pass** — helmet, JSON-LD, axe sweep, Lighthouse run, bundle analysis, image optimization.
9. **Backend hardening** — env, CORS, consultation endpoint, graceful shutdown, Dockerfile.
10. **CI + docs** — GitHub Actions, rewritten README, `.env.example`, `docker-compose.yml`.
11. **Final verification** — run `npm run build`, `npm run test`, Playwright smoke, and a Lighthouse run. Paste the scores into `PLAN.md` as a "before/after" receipt. Screenshot the home page at 1440×900 and 390×844 and save to `docs/screenshots/` so they can be diffed against `docs/design/`.

### 12. Ground rules

- Make small, reviewable commits per phase — not one mega-commit.
- When you remove a file, remove its imports too. After each phase run `npm run typecheck` and `npm run lint` and fix everything before moving on.
- If a dependency is unused after refactor (e.g. `react-scripts`), remove it from `package.json`. **Keep `three` and `@react-three/fiber` / `@react-three/drei`** — the 3D backgrounds depend on them.
- Preserve git history; never force-push.
- Do not invent medical credentials, testimonials, or statistics. If a field is a placeholder, mark it clearly as `TODO(content): …` and list all such TODOs in `PLAN.md`.
- Do not deviate from `DESIGN_SPEC.md` / `docs/design/style-guide.html`. If you think a token or spec is wrong, log it under "Design questions" in `PLAN.md` and implement the spec as written.
- Do not add analytics, tracking pixels, or third-party scripts without noting them in the README privacy section.
- Do not hit external APIs at build time without a fallback.
- If any step is blocked (e.g. missing asset, ambiguous content decision), log it in `PLAN.md` under "Open Questions" and continue with the rest.

When you finish, output a concise summary: what changed, before/after Lighthouse scores, bundle sizes, remaining `TODO(content)` items, and any decisions worth flagging for human review.

---

## How to use

1. `cd` into the repo.
2. Start Claude Code: `claude`
3. Paste everything between the `---` markers above as a single message.
4. Claude Code will fetch the hosted design first and commit it to the repo, then work through the implementation phases. Review commits as they land; run `npm run dev` locally to sanity-check each phase.
