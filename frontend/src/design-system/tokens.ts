/**
 * Design tokens — single source of truth for TypeScript code.
 *
 * This palette matches the live site as it stood at commit 0fb3280 (the
 * last state before the Vite migration). The brief from the doctor's team
 * was to stay with that look rather than adopt the Claude Design cream /
 * peach / lilac alternative. Values are mirrored in `tokens.css` and in
 * `tailwind.config.ts`; update all three when changing a token.
 */

export const color = {
  /** Page base. */
  base: '#FFFFFF',
  /** Soft surface; cards on white. */
  surface: '#F9FAFB',
  /** Peach/lavender three-stop gradient used on hero + footer bands. */
  gradientFrom: '#FDF8F6',
  gradientVia: '#F9E4DA',
  gradientTo: '#E3E3FA',

  /** Primary action / link color (blue). */
  primary: '#0D6EFD',
  primaryHover: '#0B5ED7',
  /** Second-tier accent used for chips, ghost buttons. */
  accent: '#39A7F1',

  /** Text ramp. */
  text: '#1F2937',
  text2: '#34495E',
  text3: '#6C757D',

  /** Lines. */
  border1: '#E5E7EB',
  border2: '#D1D5DB',

  /** Success + warn (used lightly in distinctions + tags). */
  success: '#198754',
  warn: '#F59F00',
} as const;

export type ColorToken = keyof typeof color;

export const radius = {
  xs: '0.25rem', //  4px
  sm: '0.5rem',  //  8px
  md: '0.75rem', // 12px
  lg: '1rem',    // 16px
  xl: '1.5rem',  // 24px
  pill: '9999px',
} as const;

export const shadow = {
  card: '0 10px 20px rgba(0, 0, 0, 0.08)',
  raised: '0 15px 30px rgba(0, 0, 0, 0.10)',
  focus: '0 0 0 3px rgba(13, 110, 253, 0.25)',
} as const;

export const motion = {
  micro: '180ms',
  reveal: '400ms',
  ease: 'cubic-bezier(.2,.7,.2,1)',
} as const;

export const fontFamily = {
  sans: '"Roboto Flex", "Roboto", "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

/**
 * Type scale — matches the old Home/About sizes, recast as fluid clamp()s
 * so breakpoints behave on mobile.
 */
export const typeScale = {
  display: {
    fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', // hero, distinctions headline
    lineHeight: 1.1,
    letterSpacing: '-0.01em',
    fontWeight: 400,
  },
  h1: {
    fontSize: 'clamp(2rem, 3.2vw, 3rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.01em',
    fontWeight: 500,
  },
  h2: {
    fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.005em',
    fontWeight: 500,
  },
  h3: {
    fontSize: 'clamp(1.125rem, 1.4vw, 1.375rem)',
    lineHeight: 1.3,
    letterSpacing: '0',
    fontWeight: 500,
  },
  bodyLg: { fontSize: '1.125rem', lineHeight: 1.6, letterSpacing: '0', fontWeight: 400 },
  body: { fontSize: '1rem', lineHeight: 1.6, letterSpacing: '0', fontWeight: 400 },
  caption: { fontSize: '0.875rem', lineHeight: 1.5, letterSpacing: '0', fontWeight: 400 },
  eyebrow: {
    fontSize: '0.75rem',
    lineHeight: 1,
    letterSpacing: '0.12em',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypeScaleToken = keyof typeof typeScale;
