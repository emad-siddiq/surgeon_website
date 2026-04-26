# Dr. Ghulam Siddiq — Practice Site

Marketing site for a laparoscopic / bariatric surgeon at Shifa International
Hospital, Islamabad. Static React frontend + a small Go service. The only
backend job today is recording one-line booking-feedback events; everything
else (consultations, transformations, gallery) is content-driven from
TypeScript modules. You run it. There are no users besides patients reading
the pages.

## Mental model

Six things to hold in your head before any file makes sense.

**1. Two halves, one direction.**
The frontend is a Vite-built static SPA served by nginx. The backend is a
single-file Go HTTP server with two real endpoints (`/api/feedback` plus
health/readiness probes). Frontend → backend is one fetch, in one place
([useBookingFeedback.ts:160](frontend/src/hooks/useBookingFeedback.ts#L160)).
There is no DB, no auth, no queue. Booking feedback POSTs land in stdout
via `slog`.

**2. Content is data.**
Every user-visible string lives in [frontend/src/content/*.ts](frontend/src/content/).
Components import typed objects (`doctor.fullName`, `services[i].title`,
`contact.whatsapp.url`). Don't hardcode copy in components — the agents have
been trained to rip that out.

**3. Tailwind is the design system.**
The colors, radii, shadows, type scale, gradients — all of it lives in two
mirrored files: [tailwind.config.ts](frontend/tailwind.config.ts) (utility
classes) and [tokens.css](frontend/src/design-system/tokens.css) (CSS
custom properties + the Roboto Flex `@font-face`). Components reach for
Tailwind utilities (`text-textPrimary`, `bg-gradientFrom`, `shadow-card`).
There is no JS token export.

**4. The booking funnel is two buttons, not a form.**
WhatsApp link + tel: link, both rendered by
[BookingActions](frontend/src/components/ui/BookingActions.tsx). On click,
the channel + timestamp goes into `localStorage` under
`ds.booking-feedback.v1`. About 90 seconds later (or on the next visit,
within a 24 h window), [BookingFeedbackPrompt](frontend/src/components/ui/BookingFeedbackPrompt.tsx)
asks "did you get an appointment?" and POSTs the answer to `/api/feedback`.
That funnel is the entirety of the backend's job.

**5. Layout is two primitives wide.**
[Section](frontend/src/components/ui/Section.tsx) (full-bleed band, `tone`
+ `size`) wraps [Container](frontend/src/components/ui/Container.tsx)
(max-w-1280px + horizontal padding). Most pages are a vertical stack of
Sections. The "gradient-hero" closing-CTA strip on most pages is
[CtaBand](frontend/src/components/ui/CtaBand.tsx); the procedure cards on
three pages share [ClickableCard](frontend/src/components/ui/ClickableCard.tsx).

**6. Modal and the mobile drawer share the same skeleton.**
Both portal into `document.body`, trap focus on Tab, close on Esc, lock
body scroll. The trap and scroll-lock live in
[useFocusTrap](frontend/src/hooks/useFocusTrap.ts) and
[useBodyScrollLock](frontend/src/hooks/useBodyScrollLock.ts). If you're
adding a new overlay, reach for those.

```
                    ┌─────────────────────────────────────┐
                    │ patient browses pages               │
                    │ ─ static, all content from .ts data │
                    └────────────────┬────────────────────┘
                                     │
                          clicks WhatsApp / Call
                                     │
                                     ▼
                    ┌─────────────────────────────────────┐
                    │ recordBookingClick(channel)         │
                    │   → localStorage:                   │
                    │     ds.booking-feedback.v1          │
                    │   → window.dispatchEvent(           │
                    │       'ds:booking-click')           │
                    └────────────────┬────────────────────┘
                                     │
                          ~90s later, or next page load
                                     │
                                     ▼
                    ┌─────────────────────────────────────┐
                    │ BookingFeedbackPrompt renders toast │
                    │ user picks: booked / not_booked /   │
                    │             trying  (+ optional note)│
                    └────────────────┬────────────────────┘
                                     │
                          POST /api/feedback {channel,
                                              outcome,
                                              note,
                                              elapsed_ms}
                                     │
                                     ▼
                    ┌─────────────────────────────────────┐
                    │ backend logger.Info(                │
                    │   "booking.feedback", …)            │
                    │ → JSON to stdout, that's it.        │
                    └─────────────────────────────────────┘
```

## Repo layout

```
surgeon_website/
├── frontend/                     Vite + React SPA. The site.
│   ├── src/
│   │   ├── App.tsx               Router + global chrome.
│   │   ├── pages/                One file per route, including legacy aliases.
│   │   ├── components/
│   │   │   ├── ui/               Reusable primitives + a few one-page widgets
│   │   │   │                     (BeforeAfter, SectionProgress, HeroSlideshow).
│   │   │   ├── layout/           Nav, Footer, mobile drawer, logo.
│   │   │   └── seo/              react-helmet-async wrapper + JSON-LD.
│   │   ├── content/              All user-visible strings, typed.
│   │   ├── hooks/                Cross-cutting React hooks.
│   │   ├── design-system/        tokens.css (CSS vars + @font-face). No .ts file —
│   │   │                         tailwind.config.ts is the other half of the system.
│   │   ├── lib/                  cn() className joiner. Nothing else.
│   │   └── assets/               Roboto Flex font, hero/portrait/gallery images, MP4s.
│   ├── e2e/                      Playwright smoke spec (run via `npm run e2e`).
│   ├── tailwind.config.ts        Color palette, shadows, gradients, motion.
│   └── vite.config.ts            React plugin, sitemap routes, Vitest config.
│
├── backend/                      Go 1.22 HTTP server. ~250 LOC, one file.
│   └── src/
│       ├── main.go               Routes, handlers, CORS, request logger, shutdown.
│       └── main_test.go          Unit + httptest contract tests.
│
├── scripts/                      Node Playwright harnesses driven by the agents.
│   ├── visual-qa.mjs             Captures route screenshots at 3 viewports.
│   └── ux-flow.spec.mjs          Scripted user journeys (nav, modal, 404).
│
├── visual-tests/                 Output dir. PNGs gitignored; JSON reports kept.
├── docker-compose.yml            Local dev stack (frontend :8000, backend :8080).
├── .claude/                      Agent workbench (slash commands, agent prompts, docs).
├── docs/                         External references (style-guide HTML, design PDF).
├── CLAUDE.md                     Agent entry point. Keep it accurate when refactoring.
├── REFACTOR_PLAN.md              Plan + executed log from the most recent cleanup.
└── DESIGN_SPEC.md                Visual brief from the doctor's team.
```

## The 10 files that matter most

Ranked by leverage — if you're tired and have ten minutes, these are the ten.

1. **[frontend/src/App.tsx](frontend/src/App.tsx)** — every route + every legacy redirect, in one place. Start here when you're chasing "what does the URL do."
2. **[backend/src/main.go](backend/src/main.go)** — every backend handler, the CORS middleware, the request logger, graceful shutdown. The whole backend in one file. Start here if anything network-related is off.
3. **[frontend/src/content/services.ts](frontend/src/content/services.ts)** — 10 procedures + 4 bariatric procedures, with full patient-facing detail copy. ~480 LOC. Start here when you're changing the procedures list, the modal copy, or the volumes shown on the cards.
4. **[frontend/src/content/contact.ts](frontend/src/content/contact.ts)** — phone, WhatsApp URL, clinic address, hours, social links, the "What to say" booking line. Start here when the practice's contact details change (they will).
5. **[frontend/src/content/doctor.ts](frontend/src/content/doctor.ts)** — name, credentials, hero headline, bio paragraphs, education list. Start here for any biographical change.
6. **[frontend/tailwind.config.ts](frontend/tailwind.config.ts)** — design tokens as Tailwind utilities. Pair with [tokens.css](frontend/src/design-system/tokens.css). Start here when you're changing a color, gradient, shadow, or radius.
7. **[frontend/src/components/ui/Section.tsx](frontend/src/components/ui/Section.tsx)** + **[Container.tsx](frontend/src/components/ui/Container.tsx)** — the layout primitives every page uses. Start here when a page's vertical rhythm or max-width is off.
8. **[frontend/src/components/ui/Modal.tsx](frontend/src/components/ui/Modal.tsx)** — the only modal in the app, used by ProcedureDetailModal. Pairs with [useFocusTrap](frontend/src/hooks/useFocusTrap.ts) and [useBodyScrollLock](frontend/src/hooks/useBodyScrollLock.ts). Start here for a11y issues with the procedure-detail panel.
9. **[frontend/src/hooks/useBookingFeedback.ts](frontend/src/hooks/useBookingFeedback.ts)** — the one piece of stateful client logic in the app: localStorage + a 90-second timer + cross-tab sync via the `storage` event + a fetch. Start here if booking-feedback prompts misbehave or never appear.
10. **[frontend/src/components/seo/Seo.tsx](frontend/src/components/seo/Seo.tsx)** — title/meta/canonical/OG/JSON-LD per page, via react-helmet-async. Start here for SEO regressions or canonical-URL drift.

## Run it locally

Prereqs: Node 20+, Go 1.22+, Docker (optional).

```bash
# frontend (terminal 1)
cd frontend
npm install
npm run dev -- --port 5175 --strictPort       # http://localhost:5175

# backend (terminal 2)
cd backend
go run ./src                                  # http://localhost:8080
```

Or with Docker:

```bash
docker compose up --build
# frontend  -> http://localhost:8000   (nginx serving dist/)
# backend   -> http://localhost:8080
```

### First-run footguns

- **Use `--port 5175`, not 5173.** Vite defaults to 5173, but on this machine
  port 5173 is squatted by an unrelated project. The agent harnesses
  ([scripts/visual-qa.mjs:19](scripts/visual-qa.mjs#L19),
  [scripts/ux-flow.spec.mjs:16](scripts/ux-flow.spec.mjs#L16)) hard-code
  `:5175`. If you skip the flag the harnesses will still start their own
  `:5175` server, but `npm run e2e` runs against `:4173` (preview) and won't
  collide. See [CLAUDE.md](CLAUDE.md) hot rule #2.
- **Tailwind color is `canvas`, not `base`.** Tailwind's `text-base` is a
  font-size utility — naming a custom color `base` paints text white at
  runtime. See [tailwind.config.ts:13-16](frontend/tailwind.config.ts#L13-L16)
  for the live comment. Don't rename without reading it.
- **`npm run e2e` does its own build + preview.** The Playwright config
  ([playwright.config.ts](frontend/playwright.config.ts)) starts
  `npm run build && npm run preview` itself. Don't pre-start anything.
- **`SITE_URL` and `VITE_API_BASE_URL` are read from `process.env` at build
  time.** If you rebuild without them set, you'll get
  `https://drsiddiq.example` in `<link rel="canonical">` and an empty
  `API_BASE` in the feedback fetch (which then resolves relatively, which
  works fine in Docker but breaks if the frontend and backend are on
  different origins). See [.env.example](frontend/.env.example).
- **Booking feedback toasts only appear ~90 s after a click.** If you're
  testing the prompt, either click WhatsApp and wait, or set
  `localStorage.setItem('ds.booking-feedback.v1', JSON.stringify({channel:'whatsapp', clickedAt: Date.now() - 100000, promptShownAt: null}))`
  in the console, then reload.

## Environment variables

### Frontend

| Variable            | Default                    | Purpose                                                |
|---------------------|----------------------------|--------------------------------------------------------|
| `SITE_URL`          | `https://drsiddiq.example` | Canonical / OG URLs and sitemap base.                  |
| `VITE_API_BASE_URL` | _empty_ (relative `/api`)  | Where booking-feedback fetches POST. Set to the backend's public URL when frontend and backend are on different origins. |

### Backend

| Variable         | Default                                                              | Purpose                              |
|------------------|----------------------------------------------------------------------|--------------------------------------|
| `PORT`           | `8080`                                                               | HTTP listen port.                    |
| `ALLOWED_ORIGIN` | `http://localhost:5173,http://localhost:4173,http://localhost:3000`  | Comma-separated CORS allowlist.      |
| `LOG_LEVEL`      | `info`                                                               | `debug` / `info` / `warn` / `error`. |

The default `ALLOWED_ORIGIN` does not include `:5175`. If you POST `/api/feedback`
from the dev server you started in §"Run it locally", set
`ALLOWED_ORIGIN=http://localhost:5175` before running the backend.

## Common changes

### Add a new procedure

1. Append a new entry to the `services` array in
   [content/services.ts](frontend/src/content/services.ts). Pick a category
   from the existing literal union; if you're adding a new category, also
   update `categoryTone`, `categoryOrder`, and `categoryHeading` in
   [pages/Procedures.tsx](frontend/src/pages/Procedures.tsx).
2. The card on /procedures and the modal that opens are both data-driven —
   no component changes.
3. The featured-procedures grid on Home shows `services.slice(0, 3)` —
   reorder the array if you want a different procedure at the top.

### Add a new top-level route

1. Add the page component under `frontend/src/pages/`. Use
   [PageHeader](frontend/src/components/ui/PageHeader.tsx) +
   [Section](frontend/src/components/ui/Section.tsx) +
   [CtaBand](frontend/src/components/ui/CtaBand.tsx) for chrome.
2. Wire `<Route>` in [App.tsx](frontend/src/App.tsx).
3. Add the path to `dynamicRoutes` in
   [vite.config.ts](frontend/vite.config.ts) — sitemap is hardcoded, not
   auto-discovered. There's a real bug if you skip this; we shipped without
   `/teaching` in the sitemap for a while.
4. If you want it in the nav, add to `primaryNav` in
   [content/nav.ts](frontend/src/content/nav.ts).
5. Update [.claude/docs/architecture.md](.claude/docs/architecture.md) so
   the agents know the route exists.

### Add a backend endpoint

1. Add the handler function in [backend/src/main.go](backend/src/main.go),
   following the `feedbackHandler` pattern: take `*slog.Logger`, return
   `http.HandlerFunc`, validate, log, return JSON.
2. Register the route in `main()` (look for `router.HandleFunc`).
3. Add a test to [main_test.go](backend/src/main_test.go) — both the
   focused handler test and a subtest in `TestMockFlows` for the contract
   shape.
4. Add a frontend caller, almost certainly under
   [frontend/src/hooks/](frontend/src/hooks/) if it's stateful, or inline
   in the page if it's a one-off. Hit `${API_BASE}/api/<thing>` so it
   honours `VITE_API_BASE_URL`.
5. Update CORS — `main.go`'s `corsMiddleware` allows GET, POST, OPTIONS.
   If you need PATCH/PUT/DELETE, update `AllowedMethods`.

### Change the design tokens

Update **two** files in lockstep:

1. [frontend/tailwind.config.ts](frontend/tailwind.config.ts) — for the
   utility classes the components use (`bg-primary`, `text-textPrimary`,
   etc.).
2. [frontend/src/design-system/tokens.css](frontend/src/design-system/tokens.css)
   — for the CSS custom properties that
   [index.css](frontend/src/index.css) reads (`var(--color-primary)`,
   `var(--shadow-focus)`).

There is no `tokens.ts`. There used to be; it was unimported and contradicted
both the other files. See `REFACTOR_PLAN.md` smell #1 for the full story.

### Change the booking flow

The booking flow is the one stateful pathway; treat it as a single feature.

- Click handler:
  [BookingActions.tsx](frontend/src/components/ui/BookingActions.tsx) calls
  `recordBookingClick`.
- Storage + timer + fetch:
  [hooks/useBookingFeedback.ts](frontend/src/hooks/useBookingFeedback.ts) —
  read this top to bottom before changing anything.
- UI:
  [BookingFeedbackPrompt.tsx](frontend/src/components/ui/BookingFeedbackPrompt.tsx).
- Backend:
  [main.go](backend/src/main.go) `feedbackHandler` + the `validate()` method
  on `feedback`. Whitelisted channel + outcome literals; `note` ≤ 1000 chars;
  `elapsed_ms` ≥ 0.

If you change the channel or outcome literals, update them in **all four**
places (frontend type, frontend payload, backend whitelist, backend test
fixtures).

## How it fails

| Symptom                                            | Probably                                                           | Where to look                                                |
|----------------------------------------------------|--------------------------------------------------------------------|--------------------------------------------------------------|
| Page renders white text on white                   | Someone renamed a Tailwind color to `base`                         | [tailwind.config.ts:13-16](frontend/tailwind.config.ts#L13-L16) |
| `npm run dev` reports port already in use          | 5173 is squatted; you forgot `--port 5175`                         | [scripts/visual-qa.mjs](scripts/visual-qa.mjs)               |
| Booking-feedback prompt never appears              | `ds.booking-feedback.v1` localStorage key is in a stale shape, OR you cleared cookies | [useBookingFeedback.ts:41-62](frontend/src/hooks/useBookingFeedback.ts#L41-L62) |
| `/api/feedback` returns 422                        | Channel/outcome literal mismatch between FE and BE                 | Cross-check `BookingChannel`/`BookingOutcome` in `useBookingFeedback.ts` against `validChannels`/`validOutcomes` in `main.go` |
| `/api/feedback` returns 400 with "invalid request body" | Frontend added a new field; backend uses `DisallowUnknownFields()` | [main.go:121](backend/src/main.go#L121)                      |
| CORS preflight fails in browser dev console        | `ALLOWED_ORIGIN` doesn't list the frontend's origin                | [main.go:35](backend/src/main.go#L35), env var               |
| Sitemap doesn't list a route                       | `dynamicRoutes` in vite.config.ts is hardcoded                     | [vite.config.ts:13-24](frontend/vite.config.ts#L13-L24)      |
| Modal Tab cycles outside the panel                 | A new portal-rendered overlay isn't using `useFocusTrap`           | [hooks/useFocusTrap.ts](frontend/src/hooks/useFocusTrap.ts)  |
| Mobile drawer slides in but stays transparent      | The drawer's container has `backdrop-filter` ancestor; it must portal to body | [MobileSidebar.tsx:60-66](frontend/src/components/layout/MobileSidebar.tsx#L60-L66) |
| Hero portrait paints as a blank rectangle          | Aspect-ratio wrapper is missing or `decoding="sync"` was dropped   | [Home.tsx:118-135](frontend/src/pages/Home.tsx#L118-L135) and the comment block above it |
| `npm run e2e` fails on text matchers               | Production copy changed; spec needs updating                       | [e2e/smoke.spec.ts](frontend/e2e/smoke.spec.ts)              |
| `go test` fails on `corsPreflight`                 | `rs/cors` regression — known quirk, see comment in test            | [main_test.go](backend/src/main_test.go) `corsPreflight` subtest |

### Where logs live

- **Backend**: stdout via `slog`, JSON-formatted. Look for `"http.request"`
  for the access log and `"booking.feedback"` for booking outcomes. In
  Docker: `docker compose logs -f backend`.
- **Frontend dev**: browser devtools console. The booking-feedback hook
  silently swallows fetch errors by design — if the toast disappears
  without a thank-you, check the Network tab for a failed POST.
- **Visual QA**: `visual-tests/report.json` after `node scripts/visual-qa.mjs`.
- **UX flow**: `visual-tests/ux-flow.json` after `node scripts/ux-flow.spec.mjs`.

### How to tell whether it's frontend, backend, or infra

- **HTML loads but nothing fetches** → frontend. Open devtools, check the
  console for a JS error.
- **HTML loads, network shows 4xx/5xx from `/api/feedback`** → backend.
  Run `curl localhost:8080/api/health` to confirm it's up; tail the backend
  logs.
- **HTML doesn't load** → infra. In dev, the Vite server probably isn't
  running. In Docker, `docker compose ps` and check both services are healthy.
- **HTML loads but with stale styles** → likely a build issue.
  `rm -rf frontend/dist frontend/node_modules/.vite && npm run build`.

## Glossary

| Term                            | Meaning                                                                                                                            |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Bariatric**                   | Weight-loss surgery (gastric bypass, sleeve, OAGB, revision). The practice's headline specialty.                                   |
| **OAGB**                        | One-anastomosis gastric bypass (a.k.a. mini gastric bypass). One of the four bariatric procedures shown on `/bariatric`.            |
| **Roux-en-Y**                   | The "classic" gastric bypass. First of the four bariatric procedures.                                                              |
| **Shifa**                       | Shifa International Hospital, H-8/4, Islamabad. The hospital where Dr. Siddiq operates. Patients book consultations through Shifa's switchboard, not the practice directly. |
| **POMSS**                       | Pakistan Obesity & Metabolic Surgery Society. Dr. Siddiq is its president — relevant to /teaching and /distinctions.                |
| **Distinction**                 | A career award/recognition. The /distinctions page lists six.                                                                       |
| **Transformation**              | A patient before/after pair. The /transformations page shows six, all with written consent.                                         |
| **Procedure card**              | The clickable card that opens the procedure-detail modal. Used on /procedures, /bariatric, and Home (top three featured).           |
| **CTA band**                    | The gradient-hero "book a consultation" strip at the bottom of most pages. Component: `CtaBand`.                                    |
| **Booking feedback**            | The 90-second-delayed toast asking "did you get an appointment?" after a WhatsApp/Call click. The whole reason `/api/feedback` exists. |
| **`ds.booking-feedback.v1`**    | The localStorage key that carries the booking-feedback record between sessions. The `v1` is intentional; if the shape changes, bump to `v2` and ignore the old key. |
| **Eyebrow**                     | The small uppercase label that sits above most h1/h2 on this site (e.g. "Surgical expertise"). Component: `Eyebrow`.                |
| **Section / Container**         | The two layout primitives. Section = full-bleed band; Container = max-w-1280 inner padding. Section wraps Container.                |
| **PageHeader**                  | The standardized top-of-page intro band: eyebrow + display headline + lead + optional CTAs, on the gradient-hero background.        |
| **Hero**                        | The Home page's custom top section (h1 + slideshow). Distinct from PageHeader because it has the slideshow.                         |
| **SectionProgress**             | The vertical scroll rail with dots, visible only on Home, only on `lg+`. One-off component used solely there.                       |
| **canvas (Tailwind color)**     | The site's white background. Named `canvas` (not `base`) deliberately — Tailwind's `text-base` is the body-size utility, and a `base` color name collides catastrophically. |
| **gradient-hero / gradient-footer** | The two custom Tailwind background-images (peach → lavender, footer variant). Defined in [tailwind.config.ts](frontend/tailwind.config.ts). |
| **iterate / snapshot**          | Slash commands defined in [.claude/commands/](.claude/commands/) that run the agent loop. Not part of the deployable site.          |

## Decisions

The reasoning that isn't in the code.

- **No database. Booking feedback POSTs land in stdout via `slog`.** The
  practice doesn't yet need a queryable history; one-line JSON in the
  request log is enough to grep weekly. Add a sink (sqlite, a sheet, an
  email digest) when the volume justifies it. Doing it now is YAGNI.

- **The Consultation page has no form.** Patients book through Shifa's
  switchboard — the hospital owns the appointment system, not us. A form
  would imply a backend flow that doesn't exist on the hospital's side.
  Two CTAs (WhatsApp + tel:) plus a "What to say" card was the brief.

- **Procedures are typed in TypeScript, not JSON.** 480 LOC of patient-facing
  copy is hand-edited often enough that TypeScript validation (the
  `Category` literal union, the `DetailSection` shape) catches typos. JSON
  saves nothing here.

- **No analytics, no third-party scripts.** Two external resources at
  runtime, both gated on user intent: the Google Maps iframe on /location
  (lazy) and the WhatsApp deep-link (on click only). Don't add anything else
  without checking with the practice — privacy posture is part of the
  product.

- **Tailwind utilities + a CSS-vars sheet, not a JS token export.** Tried
  the third leg (`tokens.ts`). It was unimported and silently contradicted
  the other two. Removed in the most recent refactor — see
  `REFACTOR_PLAN.md` smell #1.

- **The `canvas` color name.** Tailwind's `text-base` is a font-size
  utility. Naming a color `base` registers `text-base` / `bg-base` color
  utilities that collide and paint text white at runtime. We hit this in
  commit `1658d97`. Use `canvas`. Comment lives at
  [tailwind.config.ts:13-16](frontend/tailwind.config.ts#L13-L16).

- **The dev server runs on `:5175`, not the Vite default `:5173`.** Port
  5173 is squatted by an unrelated project on the dev machine. Documented
  in [CLAUDE.md](CLAUDE.md). The agent harnesses force `:5175` via a flag.

- **`SectionProgress`, `HeroSlideshow`, and `BeforeAfter` live in
  `components/ui/` despite being one-page widgets.** Moving them into
  per-page directories was considered (see `REFACTOR_PLAN.md` Phase E) and
  rejected as pure churn — the README documents where they actually are.
  If a second page picks one up, leave it; if you need to delete the page,
  delete the widget with it.

- **`BookingFeedbackPrompt` mounts once in `App.tsx` regardless of route.**
  The hook reads localStorage on mount, so the prompt can surface on a
  page that isn't /consultation if the user clicked WhatsApp on their last
  visit. Don't move it into a single page.

- **Modal renders into `document.body` via a portal.** Otherwise the
  ancestor `backdrop-filter` on the sticky header creates a containing
  block that clips `position: fixed`. Same reason MobileSidebar portals.
  Don't refactor either to render in-tree.

- **Frontend e2e is `npm run e2e` (Playwright, smoke). Visual QA is
  `node scripts/visual-qa.mjs` (separate Playwright harness driven by the
  agents).** They are different harnesses — different ports, different
  fixtures, different reports. Don't conflate them. Visual-qa lives outside
  `frontend/` deliberately, so npm scripts in `frontend/package.json` don't
  drag the agent loop into normal frontend builds.

## Related docs

- [CLAUDE.md](CLAUDE.md) — agent entry point. Hot rules, loop budget.
- [.claude/docs/](.claude/docs/) — agent-canonical references (architecture, tokens, testing, quality bar, history).
- [REFACTOR_PLAN.md](REFACTOR_PLAN.md) — most recent cleanup plan + executed log.
- [DESIGN_SPEC.md](DESIGN_SPEC.md) — visual brief from the design team.
