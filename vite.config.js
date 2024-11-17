import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import sitemap from 'vite-plugin-sitemap';

const siteUrl = 'https://ahmednassar7.github.io/portfolio';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
    terser(),
    sitemap({
      siteUrl,
    }),
  ],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
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
});
