# Dr. Ghulam Siddiq — Surgical Practice Website

A production website for **Dr. Ghulam Siddiq**, board-certified laparoscopic &
bariatric surgeon in Karachi. The design is a warm, boutique "quiet
consulting-room" system — see [`DESIGN_SPEC.md`](./DESIGN_SPEC.md) for the
authoritative tokens and [`docs/design/style-guide.html`](./docs/design/style-guide.html)
for the original Claude Design artifact.

## Architecture

```
┌──────────────────────────┐          ┌──────────────────────────┐
│  frontend/   Vite + React │  fetch   │   backend/  Go + mux    │
│  TypeScript + Tailwind    │ ───────▶ │   POST /api/consultation│
│  @react-three/fiber aurora│          │   GET  /api/health      │
│  nginx in prod            │          │   GET  /api/ready       │
└──────────────────────────┘          └──────────────────────────┘
```

The frontend is a single-page Vite build served as static assets (via nginx in
the Docker image). The backend is a small stateless Go service exposing a
consultation intake endpoint plus health/readiness probes. There is no
database; consultation requests are logged to stdout for v1.

## Quick start (local)

Prereqs: Node 20+, Go 1.22+, optionally Docker.

```bash
# frontend
cd frontend
cp .env.example .env.local    # optional, only if pointing at a remote API
npm install
npm run dev                   # http://localhost:5173

# backend (in another terminal)
cd backend
cp .env.example .env          # optional
go run ./src                  # http://localhost:8080
```

Or with Docker:

```bash
docker compose up --build
# frontend -> http://localhost:8000
# backend  -> http://localhost:8080
```

## Scripts

| Location    | Script                 | Purpose                                 |
|-------------|------------------------|-----------------------------------------|
| `frontend/` | `npm run dev`          | Vite dev server                         |
| `frontend/` | `npm run build`        | Production build (`dist/`)              |
| `frontend/` | `npm run preview`      | Preview built bundle on :4173           |
| `frontend/` | `npm run typecheck`    | `tsc -b --noEmit`                       |
| `frontend/` | `npm run lint`         | ESLint (flat config)                    |
| `frontend/` | `npm run test`         | Vitest unit tests                       |
| `frontend/` | `npm run e2e`          | Playwright smoke (starts build+preview) |
| `backend/`  | `go run ./src`         | Run the HTTP server                     |
| `backend/`  | `go test ./...`        | Unit tests                              |
| `backend/`  | `go vet ./...`         | Static analysis                         |

The `/styleguide` route is available in dev mode only (`npm run dev`) and
renders every design token + primitive for visual diffs against
`docs/design/style-guide.html`.

## Environment variables

### Frontend (`frontend/.env.*`)

| Variable             | Default                     | Purpose                                            |
|----------------------|-----------------------------|----------------------------------------------------|
| `SITE_URL`           | `https://drsiddiq.example`  | Used for SEO canonical tags and sitemap generation.|
| `VITE_API_BASE_URL`  | `http://localhost:8080`     | Base URL for consultation POST.                    |

### Backend (`backend/.env`)

| Variable         | Default                                                      | Purpose                              |
|------------------|--------------------------------------------------------------|--------------------------------------|
| `PORT`           | `8080`                                                       | HTTP listen port.                    |
| `ALLOWED_ORIGIN` | `http://localhost:5173,http://localhost:4173,http://localhost:3000` | Comma-separated CORS allowlist.     |
| `LOG_LEVEL`      | `info`                                                       | `debug` / `info` / `warn` / `error`. |

## Deploying

### Frontend (Vercel / Netlify / Cloudflare Pages)

- Build command: `npm run build` inside `frontend/`.
- Publish directory: `frontend/dist`.
- Set `SITE_URL` to the production hostname so `sitemap.xml` and canonical
  tags resolve correctly.
- Set `VITE_API_BASE_URL` to your backend's public URL.

### Backend (Fly.io / Render / any container runtime)

- Build the Docker image from `backend/Dockerfile` (multi-stage, distroless
  final image, nonroot user).
- Expose port `8080` (or override via `PORT`).
- Remember to set `ALLOWED_ORIGIN` to your frontend's public URL.

## Privacy

The site does not include analytics, tracking pixels, or third-party scripts
by default. The only third-party resource loaded in production is Google
Fonts (Fraunces + Inter) from `fonts.gstatic.com`. If you need to remove
Google as a third party, self-host the fonts under
`frontend/src/assets/fonts/` and update `index.html` / `tokens.css`
accordingly.

Consultation submissions go directly to your backend — there is no third
party in the submission path. Review and adjust the retention policy for your
server logs before going live.

## Editing content without touching code

All user-visible text, doctor credentials, testimonials, services, etc. live
in `frontend/src/content/*.ts` as typed TypeScript objects:

- `doctor.ts`        — name, pronouns, tagline, bio, credentials
- `contact.ts`       — phone, email, clinic address, hours, fee
- `services.ts`      — procedure cards + the two bariatric editorial items
- `distinctions.ts`  — credentials chips
- `testimonials.ts`  — patient quotes
- `gallery.ts`       — gallery images (references under `src/assets/images/`)
- `nav.ts`           — primary navigation

Every `TODO(content):` comment in these files flags a value that was copied
from the design-system placeholder and needs verification before launch. A
running list of these is maintained in [`PLAN.md`](./PLAN.md) § 6.

## Related docs

- [`DESIGN_SPEC.md`](./DESIGN_SPEC.md) — authoritative design tokens and art direction.
- [`PLAN.md`](./PLAN.md) — implementation plan, before/after receipts, open questions.
- [`docs/design/style-guide.html`](./docs/design/style-guide.html) — imported Claude Design artifact.
