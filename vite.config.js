import { defineConfig } from 'vite';
import process from 'process';
import dotenv from 'dotenv';
import { Logger, LogLevel } from './src/utils/logger';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import eslint from 'vite-plugin-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://ahmednassar7.github.io';
const logger = new Logger(LogLevel.INFO);

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  // Load environment variables (Vite handles .env files automatically)
  dotenv.config({ path: `.env.${mode}` });

  // Required environment variables for the app to function correctly
  const requiredEnvVariables = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_DATABASE_URL',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_USER_ID',
    'VITE_GOOGLE_SITE_VERIFICATION',
    'VITE_GOOGLE_ANALYTICS_ID',
  ];

  // Validate environment variables
  const missingVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable],
  );

  if (missingVariables.length > 0) {
    // In development, just log a warning
    if (isDev) {
      logger.warn(
        `Warning: Missing required environment variables in development: ${missingVariables.join(', ')}`,
      );
    } else {
      // Log an error and throw an exception in production
      logger.error(
        `Missing required environment variables in production: ${missingVariables.join(', ')}`,
      );
      throw new Error(
        `Missing required environment variables in production: ${missingVariables.join(', ')}`,
      );
    }
  }

  // Set NODE_ENV for production if needed
  process.env.NODE_ENV = isDev ? 'development' : 'production';

  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    plugins: [
      react(),
      // Linter
      eslint({
        cache: false, // Disable caching for updated linting rules
        fix: false, // Automatically fix issues
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: ['node_modules', 'dist'],
      }),
      // Sitemap generation for SEO (only in production). This plugin scans
      // dist/*.html and lists every file it finds, so the GitHub Pages SPA
      // fallback (404.html) must be excluded explicitly — otherwise a
      // noindex error page ends up in the sitemap as a priority-1.0 URL.
      !isDev &&
        sitemap({
          hostname: siteUrl,
          exclude: ['/404'],
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
        ViteImageOptimizer({
          png: { quality: 80 },
          jpeg: { quality: 75 },
          jpg: { quality: 75 },
          svg: {
            plugins: [
              {
                name: 'preset-default',
                params: { overrides: { removeViewBox: false } },
              },
            ],
          },
          exclude: /favicon\.svg$|images\/profile\.png$/, // Exclude favicon from image optimization
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
        injectRegister: false, // We register manually in main.jsx so we can force periodic update checks
        devOptions: {
          enabled: false, // Disable service worker in development to prevent reload loops
        },
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
        workbox: {
          skipWaiting: true, // Skip waiting for the new service worker to activate
          clientsClaim: true, // Ensure service worker takes control of all pages immediately
          cleanupOutdatedCaches: true, // Drop caches left behind by previous SW versions
          // Don't precache index.html: precached entries are served cache-first,
          // which is exactly why old deploys kept showing up until a hard refresh.
          // JS/CSS/images below are content-hashed, so caching *those* aggressively
          // is safe — a changed file gets a brand-new URL, never a stale hit.
          globIgnores: ['index.html'],
          // vite-plugin-pwa defaults this to 'index.html', which registers a
          // cache-first NavigationRoute ahead of our runtimeCaching rules below
          // and would serve the stale precached shell. We handle navigations
          // ourselves via the NetworkFirst rule instead.
          navigateFallback: undefined,
          // The SW scope covers the whole origin, which also hosts the
          // separate /toolkit/ project. Without this, Workbox's default
          // navigateFallback ('index.html') hijacks navigation to /toolkit/
          // and serves this portfolio's shell instead of letting it load.
          navigateFallbackDenylist: [/^\/toolkit/],
          runtimeCaching: [
            {
              // Navigation requests (i.e. index.html) always go to the network
              // first so a new deploy is picked up immediately; falls back to
              // the cache only when offline.
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'html-cache',
                networkTimeoutSeconds: 3,
                expiration: {
                  maxEntries: 5,
                  maxAgeSeconds: 24 * 60 * 60,
                },
              },
            },
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
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**'], // Exclude directories from watch
      },
    },
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'], // Optimize static assets
    css: {
      postcss: {
        plugins: [
          autoprefixer(), // Use imported autoprefixer
          !isDev &&
            cssnano({
              preset: 'default', // Use 'default'
            }),
        ].filter(Boolean),
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: [
            'legacy-js-api',
            'import',
            'global-builtin',
            'color-functions',
            'if-function',
          ],
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
