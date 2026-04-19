import type { Config } from 'tailwindcss';

/**
 * Tokens mirror src/design-system/tokens.ts and the live site's theme at
 * commit 0fb3280 (blue primary, Roboto, peach/lavender gradient bands).
 * Update tokens.ts + tokens.css + this file together — never in isolation.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FFFFFF',
        surface: '#F9FAFB',
        gradientFrom: '#FDF8F6',
        gradientVia: '#F9E4DA',
        gradientTo: '#E3E3FA',

        primary: '#0D6EFD',
        primaryHover: '#0B5ED7',
        accent: '#39A7F1',

        textPrimary: '#1F2937',
        textSecondary: '#34495E',
        textMuted: '#6C757D',

        border1: '#E5E7EB',
        border2: '#D1D5DB',

        success: '#198754',
        warn: '#F59F00',
      },
      fontFamily: {
        sans: ['"Roboto Flex"', '"Roboto"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
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
        card: '0 10px 20px rgba(0, 0, 0, 0.08)',
        raised: '0 15px 30px rgba(0, 0, 0, 0.10)',
        focus: '0 0 0 3px rgba(13, 110, 253, 0.25)',
      },
      maxWidth: {
        container: '1280px',
        prose: '64ch',
      },
      transitionTimingFunction: {
        breathe: 'cubic-bezier(.2,.7,.2,1)',
      },
      backgroundImage: {
        'gradient-hero':
          'linear-gradient(to bottom, #FDF8F6, #F9E4DA, #E3E3FA)',
        'gradient-footer':
          'linear-gradient(to bottom right, #FCFCFC, #F4F8FA, #F5E7E7, #B8B8DB)',
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
