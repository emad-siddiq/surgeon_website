# Architecture

## Layout
```
frontend/   Vite + React 18 + TS + Tailwind 3. 10 routes, SPA.
  src/
    pages/          One file per route. Home is the marketing page.
    components/
      layout/       HoverNavBar, Footer, LayoutChrome.
      ui/           18 design-system primitives.
      seo/          Seo component wraps react-helmet-async.
    content/        Data-driven copy. All user-visible strings live here.
      doctor.ts, contact.ts, services.ts, distinctions.ts, media.ts, nav.ts
    design-system/  tokens.ts (TS mirror) + tokens.css (CSS custom props).
    hooks/          useMediaQuery, useActiveSection.
    lib/            cn(), api() client.
backend/    Go 1.22 + gorilla/mux + rs/cors. Single package.
  src/main.go         All routes, handlers, middleware, bootstrap.
  src/main_test.go    Unit + httptest contract tests.
visual-tests/         Screenshot output. Git-ignored except report.json.
scripts/              visual-qa / ux-flow / api-mock harnesses.
.claude/              Agents, commands, docs.
```

## Routes (frontend)
| Path | Page file | Purpose |
|---|---|---|
| `/` | Home.tsx | Marketing landing |
| `/about` | About.tsx | Bio, credentials, intro video |
| `/procedures` | Procedures.tsx | Categorized procedure cards |
| `/bariatric` | Bariatric.tsx | Bariatric deep-dive |
| `/distinctions` | Distinctions.tsx | Awards |
| `/transformations` | Transformations.tsx | Before/after slider gallery |
| `/location` | Location.tsx | Hospital info + map |
| `/consultation` | Consultation.tsx | WhatsApp + phone booking |
| `/gallery` | Gallery.tsx | Clinic photos |
| `*` | NotFound.tsx | 404 |

## Routes (backend)
| Path | Method | Handler | Contract |
|---|---|---|---|
| `/api/health` | GET | inline | 200 `{"status":"healthy"}` |
| `/api/ready` | GET | inline | 200 `{"status":"ready"}` / 503 draining |
| `/api/consultation` | POST | `consultationHandler` | 200 / 422 / 400 |
| `/api/feedback` | POST | `feedbackHandler` | 200 / 422 / 400 |

CORS origins: `localhost:5173`, `localhost:4173`, `localhost:3000` by default.
`localhost:5175` is allowed in test mode via the `ALLOWED_ORIGIN` env var.

## Content model
Every user-visible string lives in `frontend/src/content/*.ts`. Don't hardcode
copy in components. `TODO(content):` comments flag unverified values. The
agent loop will not rewrite copy without user sign-off.

## Build / deploy (out of scope for the loop, reference only)
- `npm run build` in `frontend/` → `dist/` → static hosting (Vercel/Netlify).
- Go binary in `backend/` → Fly/Render/any container runtime via
  `backend/Dockerfile` (multi-stage, distroless).
