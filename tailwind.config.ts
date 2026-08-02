import type { Config } from 'tailwindcss';

/**
 * Design tokens. The two sources of truth are this file (Tailwind utilities)
 * and src/design-system/tokens.css (CSS custom properties + the @font-face
 * declarations). Keep their hex values in sync.
 *
 * Theme baseline: warm paper canvas, deep navy primary, muted teal accent,
 * Source Serif 4 headings over Inter body. Replaces the blue/peach/lavender
 * default theme that shipped through commit 18c0578.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // `canvas`, not `base` — `text-base` is a Tailwind font-size utility;
        // naming the color `base` creates `text-base` / `bg-base` color utilities
        // that collide with the type-scale utility and paint text white at runtime.
        canvas: '#FCFBF9',
        surface: '#F7F5F1',
        surfaceSunken: '#EFEBE4',

        // Dark surface (footer). `ink` is the same value as textPrimary; the
        // separate name marks it as a *background* role so a future tweak to
        // body text colour does not silently repaint the footer.
        ink: '#121A24',
        inkMuted: '#A29A8D',
        inkBorder: '#2C3742',

        primary: '#173453',
        primaryHover: '#1F4468',
        accent: '#2C6E75',
        // Accent darkened for text set on an accent/10 tint — the tint is far
        // too pale to carry the accent itself at AA. Replaces the old ad-hoc
        // #0B6FA8 in Tag.tsx.
        accentDeep: '#1F4E54',

        textPrimary: '#121A24',
        textSecondary: '#41505F',
        textMuted: '#6E675C',

        border1: '#E0DBD2',
        border2: '#CBC4B8',

        success: '#198754',
        warn: '#F59F00',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      boxShadow: {
        card: '0 10px 20px rgba(18, 26, 36, 0.08)',
        raised: '0 15px 30px rgba(18, 26, 36, 0.10)',
        focus: '0 0 0 3px rgba(23, 52, 83, 0.28)',
      },
      maxWidth: {
        container: '1280px',
        prose: '64ch',
        // Measure scale. Closed set of line-length caps: 20/22/24 clamp
        // headlines, 42 asides, 56/62/64 body prose. Replaces 14 ad-hoc
        // max-w-[Nch] values.
        'measure-20': '20ch',
        'measure-22': '22ch',
        'measure-24': '24ch',
        'measure-42': '42ch',
        'measure-56': '56ch',
        'measure-62': '62ch',
        'measure-64': '64ch',
      },
      letterSpacing: {
        // Single eyebrow tracking. Collapses tracking-[0.12em]/[0.14em]/[0.18em]
        // and tracking-widest into one value. 0.09em on Inter's caps sets
        // about as open as 0.12em did on Roboto Flex, which was narrower.
        eyebrow: '0.09em',
        // Inter metric compensation. Inter is drawn wider than Roboto Flex and
        // its own dynamic-metrics curve asks for negative tracking that grows
        // with size. Values below follow that curve at each tier we set.
        ui: '-0.006em', // 14px
        body: '-0.011em', // 16px
        lead: '-0.014em', // 18px
      },
      transitionDuration: {
        // Mirrors --motion-micro / --motion-reveal in tokens.css.
        micro: '180ms',
        reveal: '400ms',
      },
      transitionTimingFunction: {
        breathe: 'cubic-bezier(.2,.7,.2,1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 400ms cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
