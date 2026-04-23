# Design tokens (condensed)

Source of truth: `frontend/tailwind.config.ts` and
`frontend/src/design-system/tokens.css`. This doc is a quick reference.

## Colors

### Surfaces
| Token | Hex | Tailwind key | Use |
|---|---|---|---|
| canvas | `#FFFFFF` | `canvas` | Page + card base. **NOT `base`** — `text-base` is a Tailwind font-size util. |
| surface | `#F9FAFB` | `surface` | Section lift |
| gradient-from | `#FDF8F6` | `gradientFrom` | Hero gradient stop 1 |
| gradient-via | `#F9E4DA` | `gradientVia` | Hero gradient stop 2 (peach) |
| gradient-to | `#E3E3FA` | `gradientTo` | Hero gradient stop 3 (lavender) |

### Text
| Token | Hex | Tailwind | Use |
|---|---|---|---|
| text | `#1F2937` | `textPrimary` | Headlines + body |
| text-2 | `#34495E` | `textSecondary` | Lead / secondary prose |
| text-3 | `#6C757D` | `textMuted` | Captions, metadata |

### Accents
| Token | Hex | Tailwind | Use |
|---|---|---|---|
| primary | `#0D6EFD` | `primary` | Primary CTA, focus ring |
| primary-hover | `#0B5ED7` | `primaryHover` | Primary hover |
| accent | `#39A7F1` | `accent` | Secondary accent |

### Structural
| Token | Hex | Tailwind |
|---|---|---|
| border-1 | `#E5E7EB` | `border1` |
| border-2 | `#D1D5DB` | `border2` |
| success | `#198754` | `success` |
| warn | `#F59F00` | `warn` |

## Gradients
- `--gradient-hero`: `linear-gradient(to bottom, gradient-from → via → to)`
- `--gradient-footer`: 4 stops, `#FCFCFC → #F4F8FA → #F5E7E7 → #B8B8DB` (br)

## Type
Font: **Roboto Flex** variable (self-hosted under `src/assets/fonts/`).
Rem-based scale; standard Tailwind breakpoints — no `clamp()`.

Key utility classes defined in `index.css`:
- `t-display` — h1 hero
- `t-h1`, `t-h2`, `t-h3` — section headings
- `t-body-lg`, `t-body` — body copy
- `t-eyebrow` — uppercase tracking-wide label

## Radii, shadow, motion
- Radii: `xs 4 · sm 8 · md 12 · lg 16 · xl 24 · pill 9999`.
- Shadows: `shadow-card`, `shadow-raised`, focus ring `0 0 0 3px rgba(13,110,253,.25)`.
- Motion: `motion-micro 180ms`, `motion-reveal 400ms`, easing
  `cubic-bezier(.2,.7,.2,1)`. Respects `prefers-reduced-motion`.

## Never do
- Name a color `base`, `sm`, `md`, `lg`, `xl`, `xs`, or any other Tailwind
  size token. Collisions paint text/padding/etc. unexpectedly. Use
  `canvas`, `surface`, etc. with non-overlapping names.
- Add third-party webfonts. Fonts are self-hosted.
- Add cream / peach / lilac palette from the archived Claude-Design artifact
  without explicit sign-off — that was superseded.
