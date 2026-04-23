# Design Spec — Dr. Ghulam Siddiq Surgical Practice

> **This is the authoritative design spec.** It documents the live site's
> original theme (as it stood at git commit `0fb3280`, last commit before the
> Vite migration) — the look the practice wants to keep.
>
> The Claude Design artifact in [`docs/design/style-guide.html`](docs/design/style-guide.html)
> is retained purely as a reference; **the spec below supersedes it**. Do not
> re-introduce the cream / peach / lilac palette, Fraunces / Inter fonts, or
> the WebGL aurora from that artifact without an explicit sign-off from the
> practice.

---

## 1. Palette

All colors are sRGB hex. Token names match the CSS custom properties in
[`frontend/src/design-system/tokens.css`](frontend/src/design-system/tokens.css)
and the Tailwind keys in [`frontend/tailwind.config.ts`](frontend/tailwind.config.ts).

### 1.1 Surfaces

| Token           | Hex       | CSS var                 | Tailwind key    | Use                                    |
|-----------------|-----------|-------------------------|-----------------|----------------------------------------|
| `base`          | `#FFFFFF` | `--color-base`          | `canvas`        | Page base; cards on white. (Tailwind key renamed from `base` → `canvas` on 2026-04-23; the CSS custom property name is retained.) |
| `surface`       | `#F9FAFB` | `--color-surface`       | `surface`       | Section bands when we want a lift.     |
| `gradient-from` | `#FDF8F6` | `--color-gradient-from` | `gradientFrom`  | First stop of hero / consultation gradient. |
| `gradient-via`  | `#F9E4DA` | `--color-gradient-via`  | `gradientVia`   | Middle stop — soft peach.              |
| `gradient-to`   | `#E3E3FA` | `--color-gradient-to`   | `gradientTo`    | Final stop — pale lavender.            |

The signature hero/consultation treatment is **not** a flat color; it's the
top-to-bottom gradient `#FDF8F6 → #F9E4DA → #E3E3FA`. The footer uses a
richer four-stop gradient (`--gradient-footer`), same spirit but more
saturated at the bottom-right corner.

### 1.2 Text

| Token            | Hex       | CSS var           | Tailwind          | Use                                  |
|------------------|-----------|-------------------|-------------------|--------------------------------------|
| `text`           | `#1F2937` | `--color-text`    | `textPrimary`     | Headlines and body default.          |
| `text-2`         | `#34495E` | `--color-text-2`  | `textSecondary`   | Secondary prose, nav at rest.        |
| `text-3`         | `#6C757D` | `--color-text-3`  | `textMuted`       | Captions, metadata, placeholder.     |

### 1.3 Accents

| Token           | Hex       | CSS var                 | Tailwind       | Use                                        |
|-----------------|-----------|-------------------------|----------------|--------------------------------------------|
| `primary`       | `#0D6EFD` | `--color-primary`       | `primary`      | Primary CTA button, link hover, focus ring.|
| `primary-hover` | `#0B5ED7` | `--color-primary-hover` | `primaryHover` | Hover/active state for primary accent.     |
| `accent`        | `#39A7F1` | `--color-accent`        | `accent`       | Second-tier chips, ghost-link color.       |

### 1.4 Structural

| Token      | Hex       | CSS var          | Tailwind  | Use                                  |
|------------|-----------|------------------|-----------|--------------------------------------|
| `border-1` | `#E5E7EB` | `--color-border-1` | `border1` | Card edges, hairlines, input rest.   |
| `border-2` | `#D1D5DB` | `--color-border-2` | `border2` | Hover edges, secondary button rest.  |
| `success`  | `#198754` | `--color-success`  | `success` | Success microcopy, success tag.      |
| `warn`     | `#F59F00` | `--color-warn`     | `warn`    | Warning microcopy.                   |

### 1.5 Contrast (WCAG AA target)

Body text ≥ 4.5:1. Large text (≥ 18 px or ≥ 14 px bold) ≥ 3:1.

| Foreground           | Background | Ratio  | Grade |
|----------------------|------------|--------|-------|
| `text` `#1F2937`     | `#FFFFFF`  | 14.1:1 | AAA   |
| `text` `#1F2937`     | `#F9FAFB`  | 13.8:1 | AAA   |
| `text-2` `#34495E`   | `#FFFFFF`  | 8.9:1  | AAA   |
| `text-3` `#6C757D`   | `#FFFFFF`  | 4.7:1  | AA    |
| `#FFFFFF`            | `primary`  | 4.6:1  | AA (button text) |
| `primary` `#0D6EFD`  | `#FFFFFF`  | 4.6:1  | AA (inline link) |

---

## 2. Typography

| Role  | Family              | Fallbacks                                |
|-------|---------------------|------------------------------------------|
| All text | **Roboto Flex** (variable) | `"Roboto", "Helvetica Neue", Arial, sans-serif` |
| Mono  | system stack        | `ui-monospace, SFMono-Regular, Menlo, monospace` |

The variable `.ttf` is self-hosted at
`frontend/src/assets/fonts/RobotoFlex-VariableFont.ttf` and declared in
`tokens.css` with `font-display: swap`. **No third-party font hosts are
loaded at runtime.**

Weights used on the site: 300 (display), 400 (body default), 500
(headings + buttons), 600 (occasional emphasis). The variable font supports
the full 100–1000 range if we need to tweak.

### 2.1 Type scale (fluid via `clamp()`)

| Class        | Size                                 | Line  | Tracking | Weight |
|--------------|--------------------------------------|-------|----------|--------|
| `.t-display` | `clamp(2.25rem, 4.5vw, 3.5rem)`      | 1.10  | -0.01em  | 400    |
| `.t-h1`      | `clamp(2rem, 3.2vw, 3rem)`           | 1.15  | -0.01em  | 500    |
| `.t-h2`      | `clamp(1.5rem, 2.2vw, 2rem)`         | 1.20  | -0.005em | 500    |
| `.t-h3`      | `clamp(1.125rem, 1.4vw, 1.375rem)`   | 1.30  | 0        | 500    |
| `.t-body-lg` | `1.125rem`                           | 1.60  | 0        | 400    |
| `.t-body`    | `1rem`                               | 1.60  | 0        | 400    |
| `.t-caption` | `0.875rem`                           | 1.50  | 0        | 400    |
| `.t-eyebrow` | `0.75rem`                            | 1.00  | 0.12em   | 500 uppercase |

---

## 3. Radii, shadows, spacing

### 3.1 Border radii

| Token | Value      | Use                                          |
|-------|------------|----------------------------------------------|
| `xs`  | `0.25rem`  | Small chips.                                 |
| `sm`  | `0.5rem`   | Buttons and inline controls.                 |
| `md`  | `0.75rem`  | Inputs.                                      |
| `lg`  | `1rem`     | Cards, portraits, map container.             |
| `xl`  | `1.5rem`   | Large media blocks (rarely).                 |
| `pill`| `9999px`   | Tags only.                                   |

(Larger and softer than the old Claude spec: `lg = 1rem` not `18px`,
matching the old site's `1rem` / `0.75rem` / `0.5rem` convention.)

### 3.2 Shadows

| Token   | Value                                       |
|---------|---------------------------------------------|
| `card`  | `0 10px 20px rgba(0, 0, 0, 0.08)`           |
| `raised`| `0 15px 30px rgba(0, 0, 0, 0.10)` (on hover)|
| `focus` | `0 0 0 3px rgba(13, 110, 253, 0.25)`        |

Cards lift on hover: `translateY(-4px)` + `border-color → primary` + shadow
bumps from `card` to `raised`. Transition 250 ms `ease-breathe`
(`cubic-bezier(.2, .7, .2, 1)`).

### 3.3 Layout

- Container max-width: **1280 px**, horizontal padding 24 px (`px-6`) on
  mobile / 40 px (`md:px-10`).
- Section vertical rhythm via `<Section size>` prop: `sm` = `py-12`,
  `md` = `py-16 md:py-20`, `lg` = `py-20 md:py-28`.

---

## 4. Motion

Two speeds:

| Layer   | Duration | Easing            | Use                                       |
|---------|----------|-------------------|-------------------------------------------|
| Micro   | 180 ms   | `cubic-bezier(.2,.7,.2,1)` | Hover, focus, tap, link underlines.|
| Reveal  | 400 ms   | same              | Section entries (`@keyframes rise`).      |

**Motion rule:** no ambient/autoplay loops. Nothing pulses, drifts, or
orbits. Under `prefers-reduced-motion: reduce` all animations and
transitions collapse to `0s`.

---

## 5. Components (primitives)

Primitives live in [`frontend/src/components/ui/`](frontend/src/components/ui/):

- `Button` / `ButtonLink` / `ButtonRouterLink` — `primary | secondary | ghost` × `sm | md`.
- `Container` — `max-w-container` + gutters.
- `Section` — tones `base | surface | gradient | dark`; sizes `sm | md | lg`.
- `Eyebrow` — `t-eyebrow` label; `tone: primary | muted`.
- `Card` — tones `base | surface | primary`; paddings `sm | md | lg`; `interactive` prop toggles hover lift.
- `Tag` — tones `primary | accent | neutral | success`.
- `IconButton` — `default` (white + border) / `solid` (primary blue).
- `Input` / `Textarea` / `Select` / `FieldLabel` / `FieldError` — with ARIA wiring.

---

## 6. Section art direction

### 6.1 Hero (`/`)

- Full-bleed **peach→lavender gradient** band (no WebGL canvas).
- 7/5 split: left column with `Eyebrow` + display headline (*"Pioneer of
  Laparoscopic Bariatric Surgery in Pakistan"*) + lead paragraph + primary
  + secondary CTA + three-point proof row. Right column: full-height
  portrait (`aspect-[4/5]`), rounded `lg`, card shadow.
- Proof row: *"25 years in practice"* · *"1,400+ laparoscopic cases"* · *"Shifa International Hospital, Islamabad"*.

### 6.2 About teaser

- `base` tone section. 5/7 split: name + role block on the left, bio on
  the right, "Read the full bio" secondary CTA.

### 6.3 Distinctions

- `base` tone section. Heading: *"A shining legacy in endoscopic surgery"*.
- **Exactly two** editorial cards:
  1. *Presidential Award for Surgical Excellence* (narrative only).
  2. *Internationally renowned in Endoscopic Surgery* — with the big stat
     `970` + *"Bariatric procedures"* caption above the title.

### 6.4 Services

- `surface` tone section. Heading: *"Surgical Expertise & Experience"*.
- Grid of `Card`s — **ten** procedures from `src/content/services.ts`
  (Laparoscopic Cholecystectomy, Appendix, Laparoscopic Surgery, Colon,
  Anterior Resection, Low Anterior Resection, Right Hemicolectomy,
  Hemicolectomy, Partial Gastrectomy, Esophagectomy).
- Card layout: category `Tag` top-left, case-volume chip top-right
  (`9k+`, `8k+`, `1.5k+`, etc.), procedure title + one-line subtitle.

### 6.5 Bariatric Procedures

- `surface` tone section. 5/7 split.
- Left column: *"A novel solution for obesity"* headline + two bio
  paragraphs from `src/content/services.ts` (`bariatricIntro`).
- Right column: 2×2 grid of numbered cards — **01** Roux-en-Y, **02**
  Sleeve gastrectomy, **03** Mini gastric bypass (OAGB), **04** Revision
  bariatric surgery.

### 6.6 Transformations

- `base` tone. Heading: *"Real patient outcomes."*.
- Two before/after drag sliders side by side, same pointer + keyboard
  behavior as the old site. Consent microcopy required.

### 6.7 Consultation (`#consultation`)

- **Gradient band** (same hero gradient).
- 5/7 split. Left column: info + definition list (Where, When, Phone,
  Email). Right column: paper `Card` form posting to
  `POST /api/consultation` with client-side validation, honeypot, and
  success/error states.
- Primary CTA label: *"Book an Appointment"*.

### 6.8 Location (`#location`)

- `base` tone. Heading: *"Visit Shifa International Hospital."*.
- 5/7 split. Left column: intro paragraph + definition list (Hospital,
  Address, Hours, Phone). Right column: Google Maps `<iframe>` embed,
  `aspect-[4/3]`, rounded `lg`, card shadow.
- Map embed URL lives in `src/content/contact.ts` (`contact.clinic.mapEmbed`)
  and uses the Maps Embed API key the practice already ships on the live
  site. Rotate on the Google console before launch and update there.

### 6.9 Nav

- Sticky, `h-16`. Unscrolled: `bg-white/70` + subtle blur. Scrolled
  (past 8 px): `bg-white/90` + `backdrop-blur-md` + hairline border + soft
  bottom shadow.
- Logo (self-hosted `src/assets/logo.png`) + primary nav (*About*,
  *Procedures*, *Bariatric*, *Distinctions*, *Location*, *Consultation*)
  + phone chip (`ghost` link) + primary *"Book Appointment"* CTA.

### 6.10 Footer

- **Footer gradient** band (corner-biased four-stop).
- Four columns: brand + role + social; Quick Links; Visit (phone/email);
  legal row with copyright + medical disclaimer.
- Social icons: Facebook, Instagram, YouTube — all `dr.ghulamsiddiq`.

---

## 7. What we removed from the Claude Design artifact

For anyone cross-referencing the imported style guide: these elements are
**intentionally not in the production build**.

- The cream `#FBF6F1` + peach `#F9E7DA/#F3D4C1` + lilac `#ECEAF5/#DAD5EA`
  palette — replaced with the blue/white/gradient system above.
- Fraunces display + Inter body — replaced with Roboto Flex.
- The WebGL aurora component (`components/aurora/Aurora*.tsx`) — deleted.
  Its role is taken by the static CSS gradient (`.bg-gradient-hero`). The
  `three` and `@react-three/fiber` dependencies have been removed from
  `package.json`.
- The imported testimonial and gallery placeholders — the old site had
  none, so we removed those sections. Reintroduce once the practice
  provides real consented testimonials and gallery photography.
- Cream/peach band tones on `Section` and `Card` (`tone="peach"`,
  `tone="lilac"`) — not valid tones; the current API is
  `base | surface | gradient | dark` for sections and
  `base | surface | primary` for cards.
