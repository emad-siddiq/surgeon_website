# Design Spec — Dr. Ghulam Siddiq Surgical Practice

> **Source of truth.** Every value in this document is traceable to
> [`docs/design/style-guide.html`](docs/design/style-guide.html) (a verbatim copy
> of the artifact Claude Design produced in its handoff bundle at
> `docs/design/drsiddiq/project/Dr Siddiq Style Guide.html`). If this spec and
> the style-guide HTML disagree, the HTML wins and this document is updated to
> match.
>
> **Design north star**
>
> > *"Cream paper, peach plaster, one clay accent. Fraunces for voice, Inter for
> > work. Motion like breathing. The premium signal is restraint."*

---

## 1. Palette

All colors are sRGB hex. Token names match the CSS custom properties in the
style guide (`:root`) and the Tailwind config.

### 1.1 Surfaces

| Token       | Hex       | CSS var        | Tailwind key | Use                                              |
|-------------|-----------|----------------|--------------|--------------------------------------------------|
| `cream`     | `#FBF6F1` | `--cream`      | `cream`      | Page base. Warm, low-saturation white.           |
| `paper`    | `#FFFDFA` | `--paper`      | `paper`      | Cards, inputs, lifted surfaces.                  |
| `peach-50`  | `#F9E7DA` | `--peach-50`   | `peach50`    | Warm secondary surface; section bands.           |
| `peach-100` | `#F3D4C1` | `--peach-100`  | `peach100`   | Tag fills, image mats, highlight strokes.        |
| `lilac-50`  | `#ECEAF5` | `--lilac-50`   | `lilac50`    | Cool counter-surface; quotes, info blocks.       |
| `lilac-100` | `#DAD5EA` | `--lilac-100`  | `lilac100`   | Distinction chip, contrast bands.                |
| `border-1`  | `#E8DFD5` | `--border-1`   | `border1`    | Hairlines, card edges, input rest border.        |
| `border-2`  | `#D9CEC2` | `--border-2`   | `border2`    | Hover edges, secondary-button rest.              |

### 1.2 Ink

| Token   | Hex       | CSS var   | Tailwind | Use                                  |
|---------|-----------|-----------|----------|--------------------------------------|
| `ink`   | `#1F1B17` | `--ink`   | `ink`    | Headlines & body. Warm near-black.   |
| `ink-2` | `#4A423B` | `--ink-2` | `ink2`   | Secondary prose, nav at rest.        |
| `ink-3` | `#857A70` | `--ink-3` | `ink3`   | Captions, metadata, placeholder.     |

### 1.3 Accents

| Token       | Hex       | CSS var       | Tailwind   | Use                                               |
|-------------|-----------|---------------|------------|---------------------------------------------------|
| `clay`      | `#B2553A` | `--clay`      | `clay`     | Primary accent — CTAs, link hover, focus ring.    |
| `clay-dark` | `#8E3F28` | `--clay-dark` | `clayDark` | Hover/active state for primary accent.            |
| `sage`      | `#6B7A5A` | `--sage`      | `sage`     | Support accent — success, tags, quiet notes.      |

### 1.4 Contrast (WCAG AA verified)

Body text ≥ 4.5:1, large text (18 px or 14 px bold) ≥ 3:1. Ratios quoted from
the style guide's contrast matrix.

| Foreground            | Background         | Ratio       | Grade     |
|-----------------------|--------------------|-------------|-----------|
| `ink` `#1F1B17`       | `cream` `#FBF6F1`  | **14.9:1**  | AAA       |
| `ink` `#1F1B17`       | `paper` `#FFFDFA`  | **15.6:1**  | AAA       |
| `ink` `#1F1B17`       | `peach-50`         | **12.8:1**  | AAA       |
| `ink` `#1F1B17`       | `lilac-50`         | **13.9:1**  | AAA       |
| `ink-2` `#4A423B`     | `cream`            | **8.6:1**   | AAA       |
| `ink-3` `#857A70`     | `cream`            | **3.5:1**   | AA Large (caption / ≥18 px only) |
| `paper` `#FFFDFA`     | `clay` `#B2553A`   | **4.7:1**   | AA (button text) |
| `clay-dark` `#8E3F28` | `cream` `#FBF6F1`  | **6.3:1**   | AAA (inline link text) |

Pairings outside this table must be re-verified before use; `ink-3` is never
used for standard body copy, only captions/metadata ≥13 px or ≥18 px.

---

## 2. Typography

### 2.1 Families

| Role    | Family                                  | Axes used            | Fallbacks                                |
|---------|-----------------------------------------|----------------------|------------------------------------------|
| Display | **Fraunces** (variable serif)           | `opsz`, `SOFT`, `wght` (italic avail.) | `Georgia, serif`              |
| Body/UI | **Inter** (variable sans)               | `wght`               | `Helvetica Neue, Arial, sans-serif`      |
| Mono    | system-ui stack                         | —                    | `ui-monospace, SFMono-Regular, Menlo, monospace` |

Body enables OpenType features `"ss01"` and `"cv11"` (from Inter). Self-host
both fonts as Latin-subset `.woff2` under `frontend/src/assets/fonts/`;
preload the two critical weights (Fraunces ≈430 and Inter 400) with
`font-display: swap`.

### 2.2 Display helper classes

| Class                | `font-variation-settings`      | Rationale                                  |
|----------------------|--------------------------------|--------------------------------------------|
| `.font-display`      | `"opsz" 96, "SOFT" 40`         | Default editorial serif treatment.         |
| `.font-display-tight`| `"opsz" 144, "SOFT" 20`        | For the hero/`.t-display` headline.        |
| `.font-display-soft` | `"opsz" 72, "SOFT" 90`         | For h3 — softer, less authoritative.       |

### 2.3 Type scale (fluid via `clamp()`)

| Class         | Family    | `font-size`                   | `line-height` | `letter-spacing` | `font-weight` | `text-transform` | Notes              |
|---------------|-----------|-------------------------------|---------------|------------------|---------------|------------------|--------------------|
| `.t-display`  | Fraunces  | `clamp(44px, 6.5vw, 92px)`    | `1.02`        | `-0.02em`        | `420`         | —                | Use `display-tight`|
| `.t-h1`       | Fraunces  | `clamp(34px, 4.2vw, 58px)`    | `1.06`        | `-0.018em`       | `430`         | —                | `display`          |
| `.t-h2`       | Fraunces  | `clamp(26px, 2.8vw, 38px)`    | `1.15`        | `-0.012em`       | `450`         | —                | `display`          |
| `.t-h3`       | Fraunces  | `clamp(20px, 1.6vw, 24px)`    | `1.25`        | `-0.005em`       | `500`         | —                | `display-soft`     |
| `.t-body-lg`  | Inter     | `clamp(17px, 1.2vw, 19px)`    | `1.55`        | `0`              | `380`         | —                | Lead paragraphs    |
| `.t-body`     | Inter     | `16px`                        | `1.6`         | `0`              | `400`         | —                | Default body       |
| `.t-caption`  | Inter     | `13px`                        | `1.45`        | `0.01em`         | `450`         | —                | Captions/metadata  |
| `.t-eyebrow`  | Inter     | `12px`                        | `1`           | `0.18em`         | `500`         | uppercase        | Eyebrow labels     |

Rationale (quoted from §02 of the style guide): *"Fraunces' warm opsz and SOFT
axes give headlines a hand-set editorial feeling while Inter's neutral rhythm
keeps dense body copy effortless — they share a similar x-height, so weight
transitions feel honest, not theatrical."*

---

## 3. Radii, shadows, spacing

### 3.1 Border radii

| Token | Value   | Use                                              |
|-------|---------|--------------------------------------------------|
| `xs`  | `4px`   | Internal pills inside chips.                     |
| `sm`  | `8px`   | Small inline controls.                           |
| `md`  | `12px`  | Inputs.                                          |
| `lg`  | `18px`  | Cards, placeholder images, before/after frames.  |
| `xl`  | `28px`  | Large hero/consultation cards, north-star band.  |
| `pill`| `999px` | Buttons, tags, icon buttons.                     |

### 3.2 Shadows

| Token   | Value                                                                                     |
|---------|-------------------------------------------------------------------------------------------|
| `card`  | `0 1px 2px rgba(31,27,23,0.04), 0 8px 24px -12px rgba(31,27,23,0.10)`                     |
| `raised`| `0 2px 4px rgba(31,27,23,0.05), 0 18px 40px -18px rgba(31,27,23,0.18)` (card hover)       |
| `focus` | `0 0 0 3px rgba(178,85,58,0.28)`  (focus ring — `clay` @ 28 % α)                          |

### 3.3 Spacing / rhythm

- Container max-width: **1280 px** with 24 px gutter on mobile, 40 px on ≥ md.
- Section vertical rhythm: `pt-16` cover → `pt-20` → `pt-24` → `pt-32` pb.
- Eyebrow → headline gap: `mt-3` to `mt-6` depending on rank.
- Headline → lead gap: `mt-6`.
- Lead → CTA gap: `mt-8`.

---

## 4. Motion

| Layer    | Duration | Easing                              | Rule                                                                 |
|----------|----------|-------------------------------------|----------------------------------------------------------------------|
| Micro    | `180ms`  | `cubic-bezier(.2,.7,.2,1)`          | Hover/focus/tap. Buttons lift 1 px, color eases to `clay-dark`, focus ring blooms to 3 px. |
| Reveal   | `500ms`  | `cubic-bezier(.2,.7,.2,1)` + 80 ms stagger | Section entry. Text rises 12 px and fades in, image mat fades 0→1. One pass per scroll — no looping. |
| Ambient  | `26–34s` | `ease-in-out infinite alternate`    | 3D aurora field. Drifts like weather. Never cursor-synced. Respects `prefers-reduced-motion`. |

### 4.1 Reduced motion

Under `@media (prefers-reduced-motion: reduce)` the aurora animations are
disabled (static gradient) and reveal entrances collapse to `opacity` only (no
translateY). Buttons still hover-color — color changes are not "motion".

### 4.2 3D aurora placement

**Hero + Consultation only.** Quoted from §07 of the style guide:
*"Hero + Consult only. Elsewhere the aurora becomes wallpaper; scarcity keeps
it precious."*

---

## 5. Components (primitives)

All primitives live in `frontend/src/components/ui/` as TypeScript components.
Radii, padding, shadow, and transitions are tokenized — never one-off.

### 5.1 `Button`

- Shape: pill (`radius: 999px`), inline-flex, 0.6 rem gap for leading icon.
- Base padding: `14px 22px`. Font: Inter 500 / 15 px / letter-spacing 0.005 em /
  `line-height: 1`.
- Transition: `180ms ease` on transform, background, box-shadow, color,
  border-color.
- Focus-visible: `box-shadow: 0 0 0 3px rgba(178,85,58,0.28)`, outline none.

| Variant     | Rest                                                    | Hover                                                | Active           | Disabled                                |
|-------------|---------------------------------------------------------|------------------------------------------------------|------------------|-----------------------------------------|
| `primary`   | bg `clay`, text `paper`                                 | bg `clay-dark`, `translateY(-1px)`                   | `translateY(0)`  | bg `border-2` `#D9CEC2`, text `paper`, `cursor: not-allowed`, no transform |
| `secondary` | transparent, text `ink`, border `border-2`              | bg `paper`, border `ink-2`                           | —                | opacity .6                              |
| `ghost`     | transparent, text `ink`, padding `10px 14px`            | text `clay-dark`                                     | —                | opacity .6                              |

Sizes: default as above. `sm` → padding `10px 16px` / 14 px text. `lg` →
`16px 28px` / 16 px text. Keep sizes minimal — there are only two legitimate
sizes on the site (default, sm for nav / card-footers).

### 5.2 `Container`

`max-width: 1280px`, horizontal padding `24px` (`md:40px`), centered with
`margin-inline: auto`.

### 5.3 `Section`

Vertical-rhythm wrapper with `scroll-margin-top: 80px`. Props:

- `tone` — one of `cream` (default), `paper`, `peach`, `lilac`, `ink`.
- `size` — `sm` (pt-12 pb-16), `md` (pt-20 pb-24 — default), `lg` (pt-24 pb-32).

### 5.4 `Eyebrow`

Applies `.t-eyebrow`. Two visual modes:

1. Plain (used above section headlines): text-only, `text-ink3`.
2. Rule (inline leading rule): `.eyebrow-rule` → `inline-flex; gap:12px;
   color: ink-2;` with a `::before` rule `width:28px; height:1px; background:
   ink-2; opacity:.5`.

### 5.5 `Card`

- `background: paper`, border `1px solid border-1`, `border-radius: 18px`.
- Hover: `translateY(-2px)`, shadow → `raised`, border → `border-2`.
- Transition: `250ms ease`.
- Default padding `p-7` (≈ 28 px) with variants: `sm` (`p-5`), `md` (`p-7`),
  `lg` (`p-8 md:p-10`).
- `tone` prop swaps the background: `paper` (default), `peach-50`, `lilac-50`,
  `ink` (inverse — reserved for the north-star band only).

### 5.6 `Tag`

Pill; `padding: 5px 10px`; `font-size: 12px`; weight 500; letter-spacing
`0.02em`. Three tones (all with matching borders at low alpha):

| Tone    | Background | Text color      | Border                      |
|---------|------------|-----------------|-----------------------------|
| `peach` (default) | `peach-50` | `clay-dark`     | `rgba(178,85,58,.12)`       |
| `sage`  | `#E7ECDF`  | `#485640`       | `rgba(107,122,90,.18)`      |
| `lilac` | `lilac-50` | `#4B4566`       | `rgba(75,69,102,.12)`       |

### 5.7 `IconButton`

`40px × 40px`, `radius 999px`, `background: paper`, border `border-1`, text
`ink`. Hover: `background: peach-50`, border `border-2`. Focus-visible: standard
focus ring. A solid `clay` variant exists for the hero Play affordance:
`background: clay`, `color: paper`, `border: transparent`.

### 5.8 Inputs (`Input`, `Textarea`, `Select`)

Wrapper: `FieldLabel` renders a `.t-caption` in `ink-2`; `FieldError` renders
`.t-caption` in `clay-dark`.

- `.field` base: `width: 100%`; `background: paper`; border `1px solid
  border-1`; `border-radius: 12px`; padding `14px 16px`; Inter 400 15 px /
  line-height 1.3.
- Placeholder: `ink-3`.
- Hover: border → `border-2`.
- Focus: outline none; border `clay`; `box-shadow: 0 0 0 3px rgba(178,85,58,0.20)`.
- Invalid (`aria-invalid="true"`): border `clay-dark`; error text `clay-dark`.
- Disabled: `opacity: .6`; `background: #F5EEE6`.
- `Select` inherits `.field` plus a small inline SVG chevron at right 14 px.
- `Textarea` inherits `.field`; min rows 4.

### 5.9 Nav link

`.navlink`: `color: ink-2; font-size:14px; font-weight:450; padding:6px 2px`.
Hover: `color: ink`, animated underline (1 px, `ink`, `transform-origin: left`,
`scaleX(0)` → `scaleX(1)`, 280 ms `cubic-bezier(.2,.7,.2,1)`).

### 5.10 Swatch (style-guide only)

`aspect-ratio: 1/1; border-radius: 14px; border: 1px solid border-1`.

### 5.11 Before/After slider

- Frame: `border-radius: 18px; overflow: hidden; aspect-ratio: 4/5`.
- Handle: 2 px `paper` with 1 px `rgba(31,27,23,.15)` shadow outline.
- Knob: 36 px circle, `background: paper`, shadow
  `0 2px 10px rgba(0,0,0,.18)`, glyph `↔` (or ‹›) 12 px 600 weight.
- Default at **50 %**, static. On first scroll-into-view, a subtle bounce
  nudge (translateX ±4 px over 600 ms, easing settled). Auto-animation is
  disallowed elsewhere (§07).
- Consent microcopy is **required** directly beneath: *"All photos used with
  written consent."*

---

## 6. Section-by-section art direction

Paraphrased from §06 of the style guide; full wording in the HTML.

| Section                  | Layout                                                                                     | Premium move                                     |
|--------------------------|--------------------------------------------------------------------------------------------|--------------------------------------------------|
| **Hero**                 | 7/5 split. Left: eyebrow rule + `t-display` headline + lead + primary+secondary CTA + proof row. Right: 4:5 portrait with floating "Today's openings" `Card` overlapping bottom-left. Aurora behind. | The aurora.                                      |
| **About**                | Two-column: editorial Fraunces pull-quote beside video thumbnail with custom `IconButton` play overlay. | First-person voice in the pull-quote.            |
| **Consultation**         | Peach-50 band with aurora @ 55 % opacity. 5/7 split. Left: eyebrow + headline + lead + When/Where/Fee/Insurance DL. Right: form on paper `Card`. | The definition list.                             |
| **Distinctions**         | Horizontal row of lilac `Tag`s with years. Auto-marquee pauses on hover.                   | Unhurried pacing.                                |
| **Services**             | 3-column `Card` grid, tones alternating warm / cool / warm. Image mat on top, tag + serif title + sans paragraph + ghost link. | Alternating tone.                                |
| **Bariatric procedures** | Editorial two-up: oversized serif number `01`, `02` beside plain-language explanation.     | Numbers as type, not chips.                      |
| **Transformations**      | Single before/after drag slider with serif-italic caption below and consent microcopy.      | Restraint — one story, not a grid of ten.        |
| **Location**             | Muted map tile with cream overlay + pin in `clay`. Address block as DL.                     | Custom cream map palette.                        |
| **Gallery**              | Asymmetric 3-row grid, peach and lilac mats alternating, click-to-lightbox.                 | Coloured mats instead of white frames.           |
| **Footer**               | On `cream` (not `ink`). 4 thin columns, generous leading, one `clay`-underlined email link, single serif sign-off. | The serif sign-off: *"A careful hand, a quiet room."* |

### 6.1 Nav (HoverNavBar)

- Sticky, `top:0`, `z-30`.
- `background: rgba(251,246,241,0.80)` + `backdrop-filter: blur(10px)` +
  `border-bottom: 1px solid border-1`.
- Height `64 px` (`h-16`), horizontal padding `24 px` (`md:40px`).
- Logo: 24 px warm radial-gradient dot + *"Ghulam Siddiq"* `font-display` 17 px
  500 weight, followed by `", MD"` in `ink-3`.
- Link row (hidden `<md`): `.navlink`s with 32 px gap.
- Right: `btn-ghost` phone number (hidden `<sm`) + `btn-primary` *"Book
  consultation"* (copy may shorten to *"Book"* at `<md`).
- Keyboard: Tab order logo → links → CTA. Escape closes any open sub-menu.
  Mobile trigger uses `aria-expanded`, panel uses `aria-modal="true"`.

### 6.2 Footer

On `cream`. Four columns: brand + tagline; *Practice* links; *Visit* details;
*Reach* contacts. Email is underlined with `text-decoration-color: clay`,
`underline-offset: 4px`. Divider: `hr-soft` (1 px `border-1`). Sign-off line:
`font-display italic` 15 px `ink-2`, left; copyright `.t-caption ink-3`, right.

### 6.3 North-star band (optional, not in production shipping by default)

Dark band on `ink`. Eyebrow in `peach-100`. Large Fraunces quote, `weight 380`,
`font-size: clamp(30px,3.8vw,54px)`, `line-height: 1.08`.

---

## 7. Placeholder images

Warm variant:
```
repeating-linear-gradient(135deg, rgba(31,27,23,.05) 0 1px, transparent 1px 10px),
linear-gradient(180deg, #F3D4C1, #F9E7DA)
```
Cool variant: same but `linear-gradient(180deg, #DAD5EA, #ECEAF5)` with
`rgba(31,27,23,.04)` stripe.

Caption rendered in `ui-monospace` 12 px `letter-spacing: 0.06em`
`color: ink-2`.

These are dev/design placeholders only — production replaces them with real
`<picture>` elements with `.webp` primary / `.jpg` fallback and proper
`width`/`height`.

---

## 8. Aurora (3D stand-in)

Retained as a visible "signature" of the practice (see §5 of the codebase
prompt). Production implementation uses three.js / `@react-three/fiber` with
the CSS fallback below. The CSS stand-in in the style guide is:

```css
.aurora { position:absolute; inset:0; overflow:hidden; z-index:0; pointer-events:none; }
.aurora::before, .aurora::after { content:""; position:absolute; border-radius:50%; filter: blur(60px); opacity:.85; }
.aurora::before { width:62%; height:90%; left:-10%; top:-20%;
  background: radial-gradient(closest-side, #F3D4C1 0%, #F9E7DA 40%, transparent 72%);
  animation: drift1 26s ease-in-out infinite alternate; }
.aurora::after  { width:58%; height:85%; right:-12%; top:10%;
  background: radial-gradient(closest-side, #DAD5EA 0%, #ECEAF5 45%, transparent 75%);
  animation: drift2 34s ease-in-out infinite alternate; }
@keyframes drift1 { to { transform: translate3d(6%, 4%, 0) scale(1.05); } }
@keyframes drift2 { to { transform: translate3d(-4%,-3%, 0) scale(1.08); } }
```

The three.js variant ports the same two-blob drift to a low-density particle
field / shader gradient and must preserve the *"breathing, not performing"*
character (no fast orbit, no cursor-reactive parallax).

---

## 9. Iconography

No icon set; use plain inline SVGs sized to 14–16 px with `stroke-width: 1.5`,
`stroke-linecap: round`, `stroke-linejoin: round`, `currentColor`. Examples in
the style guide: chevron-left/right, play-triangle (solid).

---

## 10. Grain overlay (optional)

Retained for hero/consult. Very subtle: `radial-gradient(rgba(31,27,23,.035) 1px,
transparent 1px) 3px 3px`, `mix-blend-mode: multiply`, `opacity: .6`,
`pointer-events: none`.

---

## 11. Open decisions resolved

From §07 of the style guide, I'm taking the author's recommendation in each case
unless noted:

| # | Decision                                                    | Choice               |
|---|-------------------------------------------------------------|----------------------|
| 1 | Serif in eyebrow labels?                                    | **No** — sans.       |
| 2 | Nav: cream/80 blur or paper + hairline?                     | **cream/80 + blur**. |
| 3 | CTA copy — *Book* or *Request*?                             | **Book consultation**.|
| 4 | Before/After default state.                                 | **50 %, static**, one-shot scroll-in nudge. |
| 5 | Aurora everywhere or only Hero + Consult?                   | **Hero + Consult only**. |

---

## 12. Non-goals (what the design explicitly is not)

From the moodboard: avoid clinical blue/teal, wellness pastel, luxury gold,
fast gradients, oversaturated CTAs, emoji, icon stickers, and glassmorphism.
Stock photos with blue gowns and gloves are out.
