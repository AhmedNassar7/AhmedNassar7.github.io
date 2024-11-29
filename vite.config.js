import { defineConfig } from 'vite';
import process from 'process';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import compression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import eslint from 'vite-plugin-eslint';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVariables = [
  'VITE_GOOGLE_SITE_VERIFICATION',
  'VITE_GOOGLE_ANALYTICS_ID',
];

const missingVariables = requiredEnvVariables.filter(
  (variable) => !process.env[variable],
);
if (missingVariables.length > 0) {
  console.warn(
    `Warning: Missing required environment variables: ${missingVariables.join(', ')}`,
  );
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://ahmednassar7.github.io';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      react(),
      // Linter
      eslint({
        cache: false, // Disable caching for updated linting rules
        fix: true, // Automatically fix issues
      }),
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
          exclude: [/favicon\.svg$/, /images\/profile\.png$/], // Exclude favicon from image optimization
        }),
      // Bundle visualization for production (optional)
      !isDev &&
        visualizer({
          open: true, // Automatically open the visualizer after build
          gzipSize: true, // Show Gzip size in the visualizer
          brotliSize: true, // Show Brotli size in the visualizer
        }),
      createHtmlPlugin({
        inject: {
          data: {
            siteUrl,
            VITE_GOOGLE_SITE_VERIFICATION:
              process.env.VITE_GOOGLE_SITE_VERIFICATION,
            VITE_GOOGLE_ANALYTICS_ID: process.env.VITE_GOOGLE_ANALYTICS_ID,
          },
        },
      }),
      // PWA Plugin
      VitePWA({
        registerType: 'autoUpdate', // Automatically updates the service worker
        injectRegister: 'auto', // Injects the service worker registration script automatically
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
          start_url: '/', // Ensures app starts at the root
        },
        workboxOptions: {
          skipWaiting: true, // Skip waiting for the new service worker to activate
          clientsClaim: true, // Ensure service worker takes control of all pages immediately
          runtimeCaching: [
            {
              urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)$/, // Caching for image files
              handler: 'CacheFirst', // Use cached version if available
              options: {
                cacheName: 'image-cache',
                expiration: {
                  maxEntries: 50, // Store a maximum of 50 entries
                  maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
                },
              },
            },
            {
              urlPattern: /.*\.(?:js|css)$/, // Caching for static assets
              handler: 'StaleWhileRevalidate', // Serve stale while updating in the background
              options: {
                cacheName: 'static-resources',
              },
            },
          ],
        },
      }),
    ],
    base: '/', // Set base URL for GitHub Pages or other hosting
    build: {
      outDir: 'dist', // Output directory for production build
      sourcemap: isDev, // Enable sourcemaps only in development
      assetsDir: 'assets',
      target: 'esnext', // Use modern JavaScript features (ESNext) for production
      minify: isDev ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
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
      host: process.env.HOST || 'localhost',
      port: parseInt(process.env.PORT) || 5173,
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
          cssnano({ preset: 'advanced' }), // Use imported cssnano
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
