/**
 * Design tokens — single source of truth for TypeScript code.
 *
 * Values are mirrored in:
 *   - `tailwind.config.ts` (for utility classes)
 *   - `src/design-system/tokens.css` (CSS custom properties on :root)
 *   - `DESIGN_SPEC.md` (human-readable spec, authoritative over all)
 *
 * If you add/change a token here, update those three places too.
 */

export const color = {
  cream: '#FBF6F1',
  paper: '#FFFDFA',
  peach50: '#F9E7DA',
  peach100: '#F3D4C1',
  lilac50: '#ECEAF5',
  lilac100: '#DAD5EA',
  ink: '#1F1B17',
  ink2: '#4A423B',
  ink3: '#857A70',
  border1: '#E8DFD5',
  border2: '#D9CEC2',
  clay: '#B2553A',
  clayDark: '#8E3F28',
  sage: '#6B7A5A',
} as const;

export type ColorToken = keyof typeof color;

export const radius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '18px',
  xl: '28px',
  pill: '9999px',
} as const;

export const shadow = {
  card: '0 1px 2px rgba(31,27,23,0.04), 0 8px 24px -12px rgba(31,27,23,0.10)',
  raised: '0 2px 4px rgba(31,27,23,0.05), 0 18px 40px -18px rgba(31,27,23,0.18)',
  focus: '0 0 0 3px rgba(178,85,58,0.28)',
} as const;

export const motion = {
  micro: '180ms',
  reveal: '500ms',
  ambientShort: '26s',
  ambientLong: '34s',
  ease: 'cubic-bezier(.2,.7,.2,1)',
} as const;

export const fontFamily = {
  serif: '"Fraunces", Georgia, serif',
  sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

/**
 * Fluid type scale. Each entry is suitable for inline style or CSS-in-JS use;
 * the same values are expressed as utility classes in `tokens.css`.
 */
export const typeScale = {
  display: {
    fontSize: 'clamp(44px, 6.5vw, 92px)',
    lineHeight: 1.02,
    letterSpacing: '-0.02em',
    fontWeight: 420,
  },
  h1: {
    fontSize: 'clamp(34px, 4.2vw, 58px)',
    lineHeight: 1.06,
    letterSpacing: '-0.018em',
    fontWeight: 430,
  },
  h2: {
    fontSize: 'clamp(26px, 2.8vw, 38px)',
    lineHeight: 1.15,
    letterSpacing: '-0.012em',
    fontWeight: 450,
  },
  h3: {
    fontSize: 'clamp(20px, 1.6vw, 24px)',
    lineHeight: 1.25,
    letterSpacing: '-0.005em',
    fontWeight: 500,
  },
  bodyLg: {
    fontSize: 'clamp(17px, 1.2vw, 19px)',
    lineHeight: 1.55,
    letterSpacing: '0',
    fontWeight: 380,
  },
  body: { fontSize: '16px', lineHeight: 1.6, letterSpacing: '0', fontWeight: 400 },
  caption: { fontSize: '13px', lineHeight: 1.45, letterSpacing: '0.01em', fontWeight: 450 },
  eyebrow: {
    fontSize: '12px',
    lineHeight: 1,
    letterSpacing: '0.18em',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypeScaleToken = keyof typeof typeScale;
