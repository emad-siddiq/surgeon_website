/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  // SITE_URL must reach client code (Seo.tsx canonical/OG tags), but Vite
  // only exposes VITE_-prefixed vars by default — allow this one through.
  envPrefix: ['VITE_', 'SITE_URL'],
  plugins: [
    react(),
    sitemap({
      hostname: process.env.SITE_URL ?? 'https://drsiddiq.example',
      dynamicRoutes: [
        '/',
        '/about',
        '/procedures',
        '/bariatric',
        '/distinctions',
        '/teaching',
        '/transformations',
        '/location',
        '/consultation',
        '/gallery',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['node_modules', 'dist', 'e2e/**'],
  },
});
