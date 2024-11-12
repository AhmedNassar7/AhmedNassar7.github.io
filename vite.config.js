import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // This is the subdirectory where the site will be hosted
  build: {
    outDir: 'dist',
  },
});
