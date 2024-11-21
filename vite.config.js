import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import sitemap from 'vite-plugin-sitemap';

const siteUrl = 'https://ahmednassar7.github.io';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
    terser(),
    sitemap({
      hostname: siteUrl,
      routes: ['/'],
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    minify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
    host: true, 
    port: 5173,
  },
});
