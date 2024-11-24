import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import compression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://ahmednassar7.github.io'; // Change to your production site URL

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      react(),
      // Sitemap generation for SEO (only in production)
      !isDev &&
        sitemap({
          hostname: siteUrl,
          routes: ['/'], // Add other routes here
        }),
      // Gzip compression for production
      !isDev &&
        compression({
          algorithm: 'gzip',
          threshold: 10240, // Only compress files larger than 10KB
          ext: '.gz',
        }),
      // Brotli compression for production
      !isDev &&
        compression({
          algorithm: 'brotliCompress',
          threshold: 10240,
          ext: '.br',
        }),
      // Image optimization (only in production)
      !isDev &&
        viteImagemin({
          gifsicle: { optimizationLevel: 3 },
          optipng: { optimizationLevel: 3 },
          mozjpeg: { quality: 75 },
          pngquant: { quality: [0.7, 0.9] },
          svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
          exclude: [/favicon\.svg$/], // Exclude favicon from image optimization
        }),
      // Bundle visualization for production (optional)
      !isDev &&
        visualizer({
          open: true, // Automatically open the visualizer after build
          gzipSize: true, // Show Gzip size in the visualizer
          brotliSize: true, // Show Brotli size in the visualizer
        }),
      // PWA Plugin
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          name: 'Ahmed Nassar',
          short_name: 'Nassar',
          icons: [
            {
              src: '/web-app-manifest-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/web-app-manifest-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
        },
        workboxOptions: {
          skipWaiting: true, // Skip waiting for the service worker to activate
          clientsClaim: true, // Ensure service worker takes control of all pages
        },
      }),
    ],
    base: '/', // Set base URL for GitHub Pages or other hosting
    build: {
      outDir: 'dist', // Output directory for production build
      minify: isDev ? false : 'esbuild', // Disable minification in development for faster builds
      sourcemap: isDev, // Enable sourcemaps only in development
      assetsDir: 'assets',
      target: 'esnext', // Use modern JavaScript features (ESNext) for production
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split dependencies into chunks based on the node_modules directory
            if (id.includes('node_modules')) {
              return id.split('node_modules/')[1].split('/')[0];
            }
          },
          // Add hash to filenames for cache busting
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
    server: {
      host: 'localhost',
      port: 5173,
      hmr: {
        clientPort: 5173,
      },
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**'], // Exclude directories from watch
      },
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache static assets for long periods
      },
      historyApiFallback: {
        rewrites: [{ from: /^\/.*$/, to: '/index.html' }], // Handle single-page app routing
      },
    },
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'], // Optimize static assets
    css: {
      postcss: {
        plugins: [
          autoprefixer(), // Use imported autoprefixer
          cssnano({ preset: 'default' }), // Use imported cssnano
        ],
      },
      preprocessorOptions: {
        scss: {
          // No need to import main.scss here since it may already be imported elsewhere
          additionalData: '', // Empty or remove this line if no global import needed
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
