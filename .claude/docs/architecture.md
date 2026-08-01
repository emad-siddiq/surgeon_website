# Architecture

## Layout
```
src/          Vite + React 18 + TS + Tailwind 3. 10 routes, SPA. (repo root)
  pages/          One file per route. Home is the marketing page.
  components/
    layout/       HoverNavBar, Footer, LayoutChrome.
    ui/           Design-system primitives + a few one-page widgets.
    seo/          Seo component wraps react-helmet-async.
  content/        Data-driven copy. All user-visible strings live here.
    doctor.ts, contact.ts, services.ts, distinctions.ts, media.ts,
    nav.ts, teaching.ts, reviews.ts
  design-system/  tokens.css (CSS custom props + @font-face). Pairs with
                  tailwind.config.ts at the root — no TS token export.
  hooks/          useMediaQuery, useInView, useBookingFeedback,
                  useFocusTrap, useBodyScrollLock.
  lib/            cn() className joiner.
e2e/            Playwright smoke spec (`npm run e2e`).
visual-tests/   Screenshot output. Git-ignored except report.json.
scripts/        visual-qa / ux-flow harnesses (agent loop).
infra/          deploy.sh — build + Cloudflare Pages deploy.
.claude/        Agents, commands, docs.
```

## Routes (frontend)
| Path | Page file | Purpose |
|---|---|---|
| `/` | Home.tsx | Marketing landing |
| `/about` | About.tsx | Bio, credentials, intro video |
| `/procedures` | Procedures.tsx | Categorized procedure cards |
| `/bariatric` | Bariatric.tsx | Bariatric deep-dive |
| `/distinctions` | Distinctions.tsx | Awards |
| `/teaching` | Teaching.tsx | YouTube channel + podcast series |
| `/transformations` | Transformations.tsx | Before/after slider gallery |
| `/location` | Location.tsx | Hospital info + map |
| `/consultation` | Consultation.tsx | WhatsApp + phone booking |
| `/gallery` | Gallery.tsx | Clinic photos |
| `*` | NotFound.tsx | 404 |

## Backend
There is none. The site is a static SPA on Cloudflare Pages. The one
network call in the app — the booking-feedback POST to `/api/feedback` in
`src/hooks/useBookingFeedback.ts` — currently has no server behind it and
fails silently by design. If feedback capture is ever wanted, back it with
a Pages Function; the old Go handler contract (200 / 422 / 400, whitelisted
channel + outcome literals) lives in git history at `backend/src/main.go`
(removed after the Cloudflare Pages migration).

## Content model
Every user-visible string lives in `src/content/*.ts`. Don't hardcode
copy in components. `TODO(content):` comments flag unverified values. The
agent loop will not rewrite copy without user sign-off.

## Build / deploy (out of scope for the loop, reference only)
- `./infra/deploy.sh` → `SITE_URL=https://ghulamsiddiq.com npm run build` →
  `wrangler pages deploy dist` → Cloudflare Pages project `ghulamsiddiq`
  (account emadsiddiq98@gmail.com), served at https://ghulamsiddiq.com.
- Cloudflare Pages hard limit: no single file over 25 MiB — mind the MP4s
  under `src/assets/videos/`.
