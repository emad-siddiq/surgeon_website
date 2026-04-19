import type { Config } from 'tailwindcss';

/**
 * Tokens here mirror DESIGN_SPEC.md exactly. Do not invent new colors or
 * spacings without updating the spec first.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '28px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(31,27,23,0.04), 0 8px 24px -12px rgba(31,27,23,0.10)',
        raised: '0 2px 4px rgba(31,27,23,0.05), 0 18px 40px -18px rgba(31,27,23,0.18)',
        focus: '0 0 0 3px rgba(178,85,58,0.28)',
      },
      maxWidth: {
        container: '1280px',
        prose: '64ch',
      },
      transitionTimingFunction: {
        breathe: 'cubic-bezier(.2,.7,.2,1)',
      },
      keyframes: {
        drift1: {
          to: { transform: 'translate3d(6%, 4%, 0) scale(1.05)' },
        },
        drift2: {
          to: { transform: 'translate3d(-4%, -3%, 0) scale(1.08)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        drift1: 'drift1 26s ease-in-out infinite alternate',
        drift2: 'drift2 34s ease-in-out infinite alternate',
        rise: 'rise 500ms cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
