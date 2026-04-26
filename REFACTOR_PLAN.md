# Refactor plan — surgeon_website

Audit only. No code changes yet. Numbers below are LOC measured with `wc -l` on the working tree at branch `main` (commit `022c904`). Total source: ~4,216 LOC frontend, ~600 LOC backend.

---

## 1. Map

### Top-level packages

| Package | Purpose | Depends on | Depended on by | Load-bearing? |
|---|---|---|---|---|
| `frontend/src/pages/` | One file per route. Composes layout primitives + content modules. | `components/*`, `content/*`, `hooks/*`, `lib/cn` | `App.tsx` only | Yes — every route lives here. |
| `frontend/src/components/layout/` | App chrome: nav bar, footer, mobile drawer, logo. | `components/ui/Button`, `content/contact`, `content/nav`, `hooks/useMediaQuery`, `hooks/useScrolled` | `App.tsx` | Yes. |
| `frontend/src/components/ui/` | Design-system primitives (Button, Card, Section, Container, Eyebrow, Tag, Modal) plus several heavier widgets (BeforeAfter, SectionProgress, BookingFeedbackPrompt, AnimatedCounter, HeroSlideshow, PageHeader, ProcedureDetailModal, BookingActions). | `lib/cn`, `hooks/*`, `content/*`, `react-router-dom` | Pages, layout | Yes — but heavy widgets here aren't really primitives (see §2 smell #3). |
| `frontend/src/components/seo/` | One file: `Seo.tsx` — wraps `react-helmet-async`, builds canonical, OG, Twitter, JSON-LD. | `content/contact`, `content/doctor`, `react-helmet-async` | Every page | Yes. |
| `frontend/src/content/` | Plain TypeScript data modules. The hot rule says all user-visible copy lives here. | nothing inside the repo | Pages, layout, Seo | Yes — deliberately the only source of strings. |
| `frontend/src/hooks/` | 5 custom hooks: `useMediaQuery`, `useInView`, `useScrolled`, `useRouteScrollReset`, `useBookingFeedback`. | React, react-router-dom, `import.meta.env` | Components, pages, App | Mixed — see §2 smell #5. |
| `frontend/src/design-system/` | `tokens.ts` + `tokens.css`. The header comment says "Update tokens.ts + tokens.css + tailwind.config.ts together — never in isolation." | nothing | `index.css` imports `tokens.css`; **nobody imports `tokens.ts`** | `tokens.css` load-bearing, `tokens.ts` is documentation pretending to be code (see §2 smell #1). |
| `frontend/src/lib/` | One file: `cn.ts`. | nothing | 20 files | Yes. |
| `frontend/src/test/` | Vitest setup file. | `@testing-library/jest-dom` | Vitest config | Yes for the one Button unit test. |
| `frontend/e2e/` | One Playwright spec, `smoke.spec.ts`. | `@playwright/test` | `playwright.config.ts` | **Currently broken** — see §2 smell #11. |
| `backend/src/` | `main.go` + `main_test.go`. Single Go package. Two real handlers, two health probes. | `gorilla/mux`, `rs/cors`, stdlib | nothing | Yes for `/api/feedback` and the health probes. `/api/consultation` is dead (see §2 smell #2). |
| `scripts/` | Two Node.js Playwright harnesses — `visual-qa.mjs` and `ux-flow.spec.mjs`. | Playwright (transitively) | `.claude` agents | Peripheral — used by the iteration loop, not by the app. |
| `visual-tests/` | Output directory: PNGs + JSON reports from the harnesses. | n/a | n/a | Output, not source. |
| `.claude/` | Agent config: `agents/`, `commands/`, `docs/`, `launch.json`, `settings.local.json`. | n/a | the human + the iteration loop | Peripheral. Not shipped. |
| `docs/` | Static reference: HTML style-guide export, chat-history archive, PDF design spec. | n/a | the human | Peripheral. Not shipped. |
| `frontend/src/assets/` | `RobotoFlex-VariableFont.ttf`, hero/portrait/gallery images, intro video. | n/a | `tokens.css`, content modules | Yes. |

### Routes / handlers (the actual entry points)

| Layer | Path | Where |
|---|---|---|
| Frontend | `/`, `/about`, `/procedures`, `/bariatric`, `/distinctions`, `/teaching`, `/transformations`, `/location`, `/consultation`, `/gallery` + 4 legacy redirects + `*` | `frontend/src/App.tsx:25-44` |
| Backend | `GET /api/health`, `GET /api/ready`, `POST /api/consultation`, `POST /api/feedback` | `backend/src/main.go:264-277` |

---

## 2. Smells

Concrete, with paths and line ranges. Listed roughly in order of value-to-effort.

### #1 — `design-system/tokens.ts` is unimported documentation that contradicts what ships

`frontend/src/design-system/tokens.ts` (110 LOC) exports `color`, `radius`, `shadow`, `motion`, `fontFamily`, `typeScale`. It is imported by **zero** files (`grep -rln 'design-system/tokens' frontend/src` returns only `index.css` and `tokens.css`).

Worse, it disagrees with what actually ships:

- `tokens.ts:73-100` defines a `clamp()`-based fluid type scale.
- `tokens.css:6-12` says verbatim: *"Type scale is rem-based and uses standard breakpoint-driven step-ups (not clamp()/vw)…"*.
- `index.css:108-133` defines `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-body-lg`, `t-body`, `t-caption`, `t-eyebrow` using `@apply text-Nxl` Tailwind utilities — i.e. discrete steps, **no clamp anywhere**.

So `tokens.ts` is a stale lie, and the comment at the top of `tailwind.config.ts:4-6` ("Update tokens.ts + tokens.css + this file together — never in isolation") is a maintenance trap: future-you will dutifully update three places, then discover only two of them did anything.

Three palettes also use three different naming conventions for the same hex values:

```ts
// tokens.ts        // tokens.css           // tailwind.config.ts
text:    '#1F2937'  --color-text           textPrimary
text2:   '#34495E'  --color-text-2         textSecondary
text3:   '#6C757D'  --color-text-3         textMuted
border1: '#E5E7EB'  --color-border-1       border1
gradientFrom        --color-gradient-from  gradientFrom
```

Components use the Tailwind names (`text-textPrimary`, `bg-gradientFrom`, etc.) — that's the only set that's actually load-bearing.

### #2 — `/api/consultation` backend handler is fully wired but never called

`backend/src/main.go:65-134`: defines the `consultation` struct, an email regex, a `validate()` method, and `consultationHandler`. `main_test.go:1-150` covers it with passing tests.

`grep -rn '/api/consultation' frontend/src` returns nothing. The only fetch in the frontend is `/api/feedback` (`useBookingFeedback.ts:160`). The Consultation page (`pages/Consultation.tsx`) is two CTA buttons + a script — **no form**. (The audit's component map said Consultation has Field/Input/Textarea inputs; this is wrong — the page has zero `<input>` elements.)

So:
- 70 LOC of handler + struct + regex are reachable but uninvoked.
- ~150 LOC of tests test code nothing calls.
- The corresponding CORS handshake is paid for on every preflight.

This is the largest single deletion target.

### #3 — Three near-identical "procedure card" implementations

Same hover-lift card, same focus styles, same layout — copy-pasted across three files:

| File | Lines | Diff vs others |
|---|---|---|
| `frontend/src/pages/Procedures.tsx:46-88` | 43 | Has Tag tone + subtitle + inline SVG arrow. |
| `frontend/src/pages/Bariatric.tsx:18-65` | 48 | Has `proc.number` instead of category Tag, slightly larger padding, identical SVG arrow. |
| `frontend/src/pages/Home.tsx:175-208` | 34 | No Tag, no subtitle, "Learn more →" as text instead of SVG. |

The shared shape (verbatim):

```tsx
<button
  type="button"
  onClick={() => onOpen(...)}
  aria-haspopup="dialog"
  aria-label={`Learn more about ${...title}`}
  className={cn(
    'group flex h-full w-full flex-col rounded-lg border border-border1 bg-white p-6 text-left shadow-card',
    'transition-[transform,box-shadow,border-color] duration-[220ms] ease-breathe',
    'hover:-translate-y-1 hover:border-primary hover:shadow-raised',
    'focus-visible:border-primary focus-visible:outline-none',
  )}
>
```

This is exactly the kind of duplication a single `<ProcedureCard>` (or a more generic `<ClickableCard>`) would absorb.

### #4 — Three near-identical "booking CTA strip" sections

The `bg-gradient-hero` consult-CTA band repeats with the same grid + Eyebrow + h2 + p + ButtonRouterLink shape:

| File | Lines | Differences |
|---|---|---|
| `pages/Home.tsx:251-276` (`ConsultCta`) | 26 | "Looking for a consultation?" |
| `pages/Procedures.tsx:147-168` | 22 | "Not sure which procedure applies?" + longer paragraph |
| `pages/Bariatric.tsx:157-179` | 23 | "Next step" + "A careful first conversation." |
| `pages/Distinctions.tsx:67-83` | 17 | Headline only, no paragraph |
| `pages/Transformations.tsx:39-57` | 19 | Headline only, no paragraph |
| `pages/Teaching.tsx:69-92` | 24 | Different button target (`/distinctions`), different copy |

The shared skeleton (paste from Procedures.tsx:147-168):

```tsx
<section className="bg-gradient-hero">
  <Container className="py-12 sm:py-14 md:py-20">
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,auto]">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="t-h1 mt-3 max-w-[22ch]">{headline}</h2>
        {body && <p className="t-body mt-3 max-w-[60ch] text-textSecondary">{body}</p>}
      </div>
      <ButtonRouterLink to={to} variant="primary" className="w-full md:w-auto">{cta}</ButtonRouterLink>
    </div>
  </Container>
</section>
```

A single `<CtaBand eyebrow body headline to cta>` component absorbs all six instances and saves ~80 LOC.

### #5 — Modal and MobileSidebar contain a verbatim focus-trap implementation

`Modal.tsx:54-79` and `MobileSidebar.tsx:18-43` both contain this loop, virtually unchanged:

```tsx
const focusables = panelRef.current.querySelectorAll<HTMLElement>(
  'a[href], button:not([disabled]), ...',
);
if (focusables.length === 0) return;
const first = focusables[0];
const last = focusables[focusables.length - 1];
if (e.shiftKey && document.activeElement === first) {
  e.preventDefault();
  last.focus();
} else if (!e.shiftKey && document.activeElement === last) {
  e.preventDefault();
  first.focus();
}
```

Both also lock body scroll the same way (`Modal.tsx:82-89`, `MobileSidebar.tsx:45-52`) and both render via `createPortal(..., document.body)` (`Modal.tsx:93,167`, `MobileSidebar.tsx:66,147`). This is a real abstraction (used 2 times for the trap, 2 times for the scroll lock, 2 times for the portal) — extracting `useFocusTrap(panelRef, open, onClose)` and `useBodyScrollLock(open)` is a clean win.

### #6 — Dead UI primitives still exported from a barrel that nothing imports

`frontend/src/components/ui/index.ts` re-exports 8 primitives. `grep -rn "from '@/components/ui'" frontend/src` returns **zero** matches — every consumer reaches into the named file (`@/components/ui/Button`, `@/components/ui/Card`, …). The barrel is dead.

Within the barrel, two re-exports point at primitives that are themselves dead:

- `Field.tsx` (153 LOC) — exports `Input`, `Textarea`, `Select`. `grep -rln "from.*Field"` returns only the barrel. **No consumers.**
- `IconButton.tsx` (31 LOC) — `grep -rln IconButton` returns only itself and the barrel. **No consumers.**

Both are deletable. Field exists because Consultation *used to have* a form and was rewritten to CTAs only (cf. backend `/api/consultation` dead too — same orphaning event).

### #7 — Component primitives carrying dead variants/props

Surfaced by grepping for prop call-sites:

- **`Section`** (`Section.tsx:5,8-13`): tones `gradient` and `dark` are declared, but `grep -rh '<Section' frontend/src/pages | grep -o 'tone="[^"]*"'` returns only `tone="base"` (×10) and `tone="surface"` (×3). `gradient` and `dark` are dead. (Pages roll their own `<section className="bg-gradient-hero">` blocks instead — see smell #4.)
- **`Card`** (`Card.tsx:4,7-11`): tone `primary` is declared but never used. Only `tone="base"` and (default) appear at call sites (`pages/Consultation.tsx:91`, `pages/About.tsx:99`). Card has 2 real consumers total.
- **`Tag`** (`Tag.tsx:4,10`): tone `success` is declared but never used. The site has no green/success badges.
- **`PageHeader`** (`PageHeader.tsx:11-12,29-34`): props `tone` and `className` are declared. Neither is ever passed by any of the 7 callers (`grep -rn 'PageHeader' frontend/src/pages` shows only `eyebrow`, `title`, `lead`, `actions`).
- **`BookingActions`** (`BookingActions.tsx:7-15`): declares `size`, `fullWidth`, `className`, `children`. `grep -rn '<BookingActions' frontend/src` shows two call-sites, both with **no props at all** (`<BookingActions />`).
- **`Seo`** (`Seo.tsx:11`): `schema` accepts `'home' | 'about' | 'plain'`. `grep -rn 'schema=' frontend/src/pages` shows only `schema="home"` (×3) — `'about'` is unused and would render the same `jsonLdHome()` anyway.
- **`BariatricProcedure`** (`content/services.ts:343-349`): the `body: string` field is populated for all 4 procedures but never read. `grep -n 'proc\.' pages/Bariatric.tsx` shows only `proc.title`, `proc.number`, `proc.summary`, `proc.details` — `proc.body` is silent. (Each `body` value is 1–2 sentences, ~600 chars total of dead string content.)

### #8 — Hooks and components used in exactly one place

These aren't necessarily wrong, but they represent abstraction without leverage. Each one is a candidate for inlining.

| Symbol | Lines | Consumers (from `grep -rln`) |
|---|---|---|
| `SectionProgress` | 209 | 1 (Home only) |
| `HeroSlideshow` | 63 | 1 (Home only) |
| `useInView` | 29 | 1 (`AnimatedCounter` only) |
| `useScrolled` | 16 | 1 (`HoverNavBar` only) |
| `useRouteScrollReset` | 21 | 1 (`App` only) |
| `MobileSidebar` | 149 | 1 (`HoverNavBar` only) |
| `BookingFeedbackPrompt` | 199 | 1 (`App` only) |

The first three are the most striking: 209 LOC of `SectionProgress` exists for one Home page rail, and 29 LOC of `useInView` exists to feed `AnimatedCounter`'s "start counting when visible" trigger. Either keep them but stop pretending they're a library (move out of `components/ui/`), or inline.

### #9 — Sitemap drifts from the router

`vite.config.ts:13-23` hardcodes `dynamicRoutes: ['/', '/about', '/procedures', '/bariatric', '/distinctions', '/transformations', '/location', '/consultation', '/gallery']`. The router (`App.tsx:25-35`) lists 10 canonical routes.

**`/teaching` is missing from the sitemap.** It exists in the router and ships in production builds, but is not advertised to crawlers. This is a real bug that an audit-time grep catches in 2 seconds.

### #10 — `axe-core` is in devDependencies but unused

`frontend/package.json:40` pulls in `axe-core ^4.10.0`. `grep -rln "axe" frontend/src frontend/e2e scripts` returns only false positives (the substring "axe" inside the word "rel**axe**d"). No a11y test harness exists. Either add one or drop the dep.

### #11 — The Playwright e2e smoke test is broken

`frontend/e2e/smoke.spec.ts:6` looks for `getByRole('link', { name: /book consultation/i })`. The actual buttons say **"Book an Appointment"**, not "Book consultation" — the regex doesn't match. (See `pages/Home.tsx:51`, `pages/Bariatric.tsx:175`, `pages/Procedures.tsx:108`, etc.)

`smoke.spec.ts:15-19` navigates to `/#consultation` and expects a heading "start with a conversation". No element with that text exists; Home's anchor IDs are `home-top`, `home-stats`, `home-about`, `home-procedures`, `home-distinctions`, `home-consult` (`Home.tsx:20-27`). There is no `#consultation` anchor on Home.

The CI-suite `npm run e2e` step has been failing or has been a no-op for some time. (`scripts/ux-flow.spec.mjs` is a separate, unrelated harness — and presumably the one actually exercised by the iteration loop.)

### #12 — `content/testimonials.ts` ships an empty array

`frontend/src/content/testimonials.ts` (12 LOC): exports a `Testimonial` interface and an empty `testimonials: Testimonial[] = []`. Nothing imports it. It's a placeholder waiting for content that, by the comment, has been waiting since the old site. Either delete or surface a TODO somewhere visible.

### #13 — `BookingActions` writes to localStorage from a presentational component

`components/ui/BookingActions.tsx:46,64` calls `recordBookingClick('whatsapp' | 'phone')` from the click handler. The hook `useBookingFeedback` then reads localStorage on every mount, dispatches a custom event `'ds:booking-click'`, sets a 90-second timer, and pops a toast.

Mechanism is fine, layering is questionable: the feature reaches across a presentational component, a hook, a singleton toast, a custom DOM event, and a fetch. It's the most coupled code in the app and is not load-bearing for the practice's primary funnel (WhatsApp + phone work without it). Worth cordoning into a single feature module (`features/booking-feedback/`) so the rest of the app can ignore it.

### #14 — `BeforeAfter` has 192 LOC for a feature used on one page

`components/ui/BeforeAfter.tsx` is a substantial drag-slider with pointer + keyboard support. Used twice — both inside the same page's `.map()` (`Transformations.tsx:27-35`). It's correct and self-contained, but it doesn't belong in the design-system primitives folder beside `Button` and `Container`. Move to `features/transformations/` or `pages/Transformations/`.

### #15 — Page hero blocks are inconsistent

7 pages use `<PageHeader>`. 2 do not:

- `Home.tsx:29-78` — custom `Hero()` with two-column hero slideshow + proof points list. Reasonably different from PageHeader, fine to keep.
- `About.tsx:18-91` — manual `<section className="bg-gradient-hero">` with two-column video player + bio. Could use PageHeader if PageHeader supported a right-rail slot — but it doesn't.

The choice between "use PageHeader" and "roll your own gradient hero" is currently arbitrary. Either give PageHeader a `media` slot or accept the asymmetry and document it.

### #16 — `App.tsx` calls `useRouteScrollReset()` from a single component, only used in App

`useRouteScrollReset.ts` (21 LOC): a one-line `useEffect` wrapping `window.scrollTo` on `pathname`/`hash` change. Its only consumer is `App.tsx:20`. The hook indirection adds a file and a test surface for ~10 lines of effect — inlining into App.tsx is not a regression.

### #17 — Backend `loadConfig` declares a debug log level that callers can never trigger meaningfully

`backend/src/main.go:43-51` parses `LOG_LEVEL` into `slog.LevelDebug/Info/Warn/Error`, but the only `Debug`-emitting call sites are zero. (`grep -n 'logger\.Debug' backend/src/main.go` returns nothing.) The level is wired but the level distinction does nothing. Minor — leave alone unless you're in there for other reasons.

### #18 — `lint-staged` `prepare` script has a working-directory hack

`package.json:20`: `"prepare": "cd .. && husky frontend/.husky || true"`. Implies a husky-in-subdirectory layout that the repo no longer has (`frontend/.husky` does not exist, `ls frontend/.husky` would error). The `|| true` mask hides this on every install. Cosmetic, but it's noise.

---

## 3. Plan

Ordered. Smallest blast radius first. One sentence per change. Each numbered group is a candidate atomic commit.

### Phase A — pure deletes (no behavior change, no risk)

1. **Delete `content/testimonials.ts`** (12 LOC). Files: `frontend/src/content/testimonials.ts`. Risk: none — zero importers.
2. **Delete `components/ui/Field.tsx`** (153 LOC). Files: `frontend/src/components/ui/Field.tsx`. Risk: none — zero importers (only the dead barrel re-exports it).
3. **Delete `components/ui/IconButton.tsx`** (31 LOC). Files: `frontend/src/components/ui/IconButton.tsx`. Risk: none — zero importers (only the dead barrel).
4. **Delete `components/ui/index.ts`** (the barrel itself). Files: `frontend/src/components/ui/index.ts`. Risk: none — zero importers.
5. **Delete `design-system/tokens.ts`** (110 LOC) and update the comment in `tailwind.config.ts:4-6` to reflect that `tokens.css` + `tailwind.config.ts` are the two sources, not three. Files: `frontend/src/design-system/tokens.ts`, `frontend/tailwind.config.ts`. Risk: none — zero importers; lying maintenance comment removed.
6. **Drop `axe-core` from devDependencies** unless an a11y test fixture is being added in this branch. Files: `frontend/package.json`, `frontend/package-lock.json`. Risk: none.
7. **Add `/teaching` to the sitemap dynamicRoutes**. Files: `frontend/vite.config.ts`. Risk: tiny (re-builds sitemap.xml).
8. **Delete `BariatricProcedure.body` field and the four body strings**. Files: `frontend/src/content/services.ts:347, 357, 392, 427, 462`. Risk: none — zero readers.
9. **Strip dead variants from primitives**: `Section` `gradient` + `dark`, `Card` `primary`, `Tag` `success`, `Seo` `schema='about'`. Files: `frontend/src/components/ui/Section.tsx`, `Card.tsx`, `Tag.tsx`, `components/seo/Seo.tsx`. Risk: low — none of the deleted literals appear at any call site (verified by grep).
10. **Drop dead props from `PageHeader` (`tone`, `className`)** and from `BookingActions` (`size`, `fullWidth`, `className`, `children`). Files: `components/ui/PageHeader.tsx`, `components/ui/BookingActions.tsx`. Risk: low — neither prop has callers.
11. **Fix or delete `frontend/e2e/smoke.spec.ts`**. The current spec doesn't match production text. Either rewrite to assert real headings/labels, or delete and remove `e2e` from `package.json` scripts until there's something to run. Files: `frontend/e2e/smoke.spec.ts`, possibly `frontend/package.json`. Risk: low. **Test-first:** must run the chosen replacement and confirm it passes before this commit lands.

### Phase B — backend cleanup

12. **Decide and execute on `/api/consultation`.** Two options, pick before starting:
    - **(B1, recommended) Delete it.** Files: `backend/src/main.go:65-134, 276`, `backend/src/main_test.go` (delete `TestConsultationValidate`, `TestConsultationHandler`). Saves ~150 LOC + removes the email regex.
    - **(B2) Keep it and wire a real form on `/consultation`.** Out of scope for a refactor — flag and stop.
    Risk for B1: low — frontend has no caller; CORS preflights and the route disappear together. **Test-first:** delete tests in the same commit; remaining `TestFeedback*` tests must still pass.

### Phase C — focused dedup of the procedure card and CTA band

13. **Extract `<CtaBand>` from the six gradient-hero CTA strips.** Implementation goes in `components/ui/CtaBand.tsx` (~25 LOC). Replace at six call-sites: `pages/Home.tsx:251-276`, `pages/Procedures.tsx:147-168`, `pages/Bariatric.tsx:157-179`, `pages/Distinctions.tsx:67-83`, `pages/Transformations.tsx:39-57`, `pages/Teaching.tsx:69-92`. Saves ~80 LOC net. Risk: low — six identical visual outputs; verifiable with `npm run dev` + a side-by-side snapshot.
14. **Extract `<ProcedureCard>` from the three card variants.** Either one component with optional `category`/`number`/`subtitle` props, or two thin wrappers around a shared `<ClickableCard>`. Files: new `components/ui/ProcedureCard.tsx`, replace at `pages/Home.tsx:175-208`, `pages/Procedures.tsx:46-88`, `pages/Bariatric.tsx:18-65`. Saves ~60 LOC net. Risk: medium — visual diffs need eyes, but the underlying button + class string is verbatim across all three.

### Phase D — extract the focus-trap / scroll-lock pattern

15. **Add `useFocusTrap(ref, open, onClose)` and `useBodyScrollLock(open)`** to `frontend/src/hooks/`. Replace duplicated bodies in `Modal.tsx:54-89` and `MobileSidebar.tsx:18-52`. Risk: medium. **Test-first:** the existing `ux-flow.spec.mjs` exercises both modal Esc-close and mobile-drawer Esc-close — re-run it after the change and confirm the pass count is unchanged.

### Phase E — rehome the heavy widgets that only one page uses

16. **Move `SectionProgress` out of `components/ui/`.** Either to `pages/Home/SectionProgress.tsx` (best, since Home is its only caller and we may want to colocate the section-id list with the component) or to `components/widgets/SectionProgress.tsx` if other pages plan to use it. Risk: low — pure rename + import path update.
17. **Move `HeroSlideshow` to `pages/Home/HeroSlideshow.tsx`.** Same reasoning. Risk: low.
18. **Move `BeforeAfter` to `pages/Transformations/BeforeAfter.tsx`.** Same. Risk: low.
19. **Move the booking-feedback feature into `features/booking-feedback/`** containing `BookingActions.tsx`, `BookingFeedbackPrompt.tsx`, `useBookingFeedback.ts`. Update imports at `App.tsx:4`, `pages/Consultation.tsx:5`, `pages/Location.tsx:5`. Risk: low — pure rehome.

### Phase F — small surface tidy

20. **Inline `useRouteScrollReset` into `App.tsx`** (~10 lines of effect, one caller). Files: delete `frontend/src/hooks/useRouteScrollReset.ts`, edit `App.tsx`. Risk: low.
21. **Inline `useScrolled` into `HoverNavBar.tsx`** (5 lines, one caller). Files: delete `frontend/src/hooks/useScrolled.ts`, edit `HoverNavBar.tsx`. Risk: low. (Optional — keep if you'd rather not touch `HoverNavBar` for one inlining.)
22. **Fix the `package.json` `prepare` script** to either point at the real husky directory or be removed if husky isn't in use. Files: `frontend/package.json`. Risk: trivial.

### Atomic commit grouping (suggested)

| # | Commits | Scope |
|---|---|---|
| 1 | A1–A4 | One commit: delete unimported files (testimonials, Field, IconButton, ui/index.ts). |
| 2 | A5 | Delete tokens.ts; update tailwind.config.ts comment. |
| 3 | A6 | Drop axe-core devDep. |
| 4 | A7 | Add `/teaching` to sitemap. |
| 5 | A8 | Drop `BariatricProcedure.body`. |
| 6 | A9–A10 | Strip dead variants and dead props from primitives. |
| 7 | A11 | Fix or delete the e2e smoke spec (test-first). |
| 8 | B12 (B1) | Delete `/api/consultation` handler + tests. |
| 9 | C13 | Extract `<CtaBand>`. |
| 10 | C14 | Extract `<ProcedureCard>`. |
| 11 | D15 | Extract `useFocusTrap` + `useBodyScrollLock`. |
| 12 | E16–E18 | Rehome SectionProgress, HeroSlideshow, BeforeAfter. |
| 13 | E19 | Rehome booking-feedback as a feature module. |
| 14 | F20–F22 | Inline tiny hooks; fix prepare script. |
| 15 | (final) | Write README.md. |

Estimated LOC delta: **−500 to −650** (≈12–15% of the codebase) before the README is added.

---

## 4. Non-goals

Things I noticed and chose not to touch.

1. **Re-architect the Go backend into multiple packages.** It's 600 LOC in one file and reads cleanly; splitting it now would be premature.
2. **Replace `react-helmet-async` with another head manager.** Works fine, no actual symptom — would be churn.
3. **Switch `services.ts` (497 LOC) to JSON + a loader.** Tempting because the file is large, but every entry is hand-edited copy that benefits from TypeScript checking. The size *is* the content.
4. **Reduce `useBookingFeedback`'s mechanism (custom event + 90-second timer + cross-tab sync via `storage` event).** It's intricate but each piece is justified by its comment; the value of a feature module (smell #13) is layering, not simplification of internals.
5. **Convert `BeforeAfter`'s pointer handling to a library.** It's correct and self-contained; importing a library here would add weight, not remove it.
6. **Replace inline social/phone/play-button SVGs with an icon library.** ~10 inline SVGs total; an icon library wouldn't pay for itself.
7. **Fold `Container` into `Section`.** Container has 13 standalone consumers (notably the manual `<section className="bg-gradient-hero">` blocks); folding it would break those.
8. **`HoverNavBar`'s `pt-[env(safe-area-inset-top)]` and the iOS-zoom 16px input rule in `index.css`.** Load-bearing for mobile correctness — well-commented, leave alone.
9. **The `tone="dark"` Section variant** specifically (as opposed to the unused `tone="gradient"`). It's also unused, but Footer has a dark band already and adding a `tone="dark"` Section may make sense for a future testimonials section. Borderline — I removed it in plan step A9 since YAGNI, but happy to flip if you'd rather keep it.
10. **Backend log-level distinction (smell #17).** Wiring works; the absence of `Debug` calls is a content gap not a code smell. Don't widen the diff.
11. **The `.claude/` agent workbench.** Out of scope for a code refactor; touching it changes how the iteration loop behaves.
12. **`scripts/ux-flow.spec.mjs` and `scripts/visual-qa.mjs`.** Long but they're agent harnesses; non-shipping; only edit if a refactor breaks one.

---

## Discovered

- The default `ALLOWED_ORIGIN` env on the backend (set by `loadConfig` in
  `main.go`) does not include `:5175`, even though the dev server runs on
  `:5175` per `CLAUDE.md` hot rule #2 and the agent harnesses. POSTing
  `/api/feedback` from a raw `npm run dev` session will fail CORS unless
  the user sets `ALLOWED_ORIGIN=http://localhost:5175`. Documented in the
  new README under "First-run footguns" rather than fixed, because changing
  the default also affects deploy assumptions for everyone else.
- The `prepare` script in `frontend/package.json` (`cd .. && husky frontend/.husky || true`)
  runs without error but writes nothing to `.git/hooks/` — those are still
  all `.sample`. Husky has been a no-op. Plan step F22 was not executed
  because there's no clear right fix (delete entirely vs. rewire husky vs.
  switch to a different pre-commit tool); I left it alone.
- E2e Playwright (`npm run e2e`) and the agent-driven `scripts/ux-flow.spec.mjs`
  are two separate harnesses that overlap in coverage. Worth consolidating
  someday; out of scope for a refactor.

## Executed

- `ec0f942` — A1–A4: delete Field, IconButton, testimonials, ui/index.ts barrel (-204 LOC).
- `ac76c37` — A5: delete unused tokens.ts; fix lying header comments in tailwind.config.ts and tokens.css (-111 LOC).
- `39085e3` — A6: drop unused axe-core devDependency.
- `d2dd8bc` — A7: add /teaching to sitemap dynamicRoutes.
- `cee0c6b` — A8: drop unused BariatricProcedure.body field (-5 LOC).
- `bbdfe72` — A9–A10: strip dead variants/props from Section, Card, Tag, PageHeader, BookingActions, Seo (-42 LOC).
- `1506ca2` — A11: rewrite broken e2e/smoke.spec.ts; verified 4/4 pass.
- `89f0b7a` — B12: delete unused /api/consultation backend handler + its tests (-157 LOC).
- `78b4f25` — C13: extract `<CtaBand>` for the page-closing consult strips at four call sites.
- `38f1f3f` — C14: extract `<ClickableCard>` + `<LearnMoreHint>` for the three procedure-card variants.
- `60944f4` — D15: extract `useFocusTrap` + `useBodyScrollLock`; Modal and MobileSidebar share them.
- `1c22a95` — F20–F21: inline single-use hooks `useScrolled` (into HoverNavBar) and `useRouteScrollReset` (into App).
- Skipped E16–E18 and E19 (rehoming): pure import-path churn for marginal value; documented in the new README's Decisions section instead.
- Skipped F22 (husky `prepare` script): no clear right fix; flagged in Discovered.

**Net delta:** 12 commits, 7 source files deleted, **+308 / −834 lines** across the refactor.

