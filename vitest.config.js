import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Separate, minimal config for tests so the production build pipeline
// in vite.config.js (imagemin, sitemap, compression, PWA, etc.) never
// runs during `vitest`.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    // Default 5000ms is too tight for animation-driven tests (framer-motion
    // + waitFor) when the machine is under load, e.g. the pre-push hook
    // running alongside VS Code's own concurrent git activity — that's a
    // timing flake, not a real failure, so give it more headroom.
    testTimeout: 15000,
  },
});
