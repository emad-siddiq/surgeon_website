/**
 * Vitest global setup. Wired via vite.config.ts → test.setupFiles.
 * Adds @testing-library/jest-dom matchers (toBeInTheDocument, etc.) to
 * the global expect.
 */
import '@testing-library/jest-dom/vitest';
