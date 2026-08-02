# Developer Guide

Local setup, scripts, environment variables, conventions. Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md). Visitor-facing features: [USER_GUIDE.md](./USER_GUIDE.md).

## Prerequisites

- **Node.js ≥ 20.17**
- **npm ≥ 11** — `package-lock.json` uses platform-specific `optionalDependencies` that npm 10 mishandles (`EBADPLATFORM`). CI pins `npm@11.12.1`.

  ```bash
  npm install -g npm@11
  ```

## Setup

```bash
git clone https://github.com/AhmedNassar7/AhmedNassar7.github.io.git
cd AhmedNassar7.github.io
npm install
npm run dev
```

Dev server: [http://localhost:5173](http://localhost:5173).

## npm Scripts

| Script                              | What it does                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`                       | Starts the Vite dev server.                                                                                        |
| `npm start`                         | Same as `dev`, with `NODE_ENV=development` via `cross-env`.                                                        |
| `npm run build`                     | Production build to `dist/`. See [ARCHITECTURE.md § 6](./ARCHITECTURE.md#6-build-time-optimizations-viteconfigjs). |
| `npm run serve` / `npm run preview` | Serves `dist/` locally.                                                                                            |
| `npm run lint`                      | ESLint over the repo.                                                                                              |
| `npm run format`                    | Prettier, writes changes.                                                                                          |
| `npm run format-check`              | Prettier check only (what CI runs).                                                                                |
| `npm test`                          | Full Vitest suite, once.                                                                                           |
| `npm run test:watch`                | Vitest, watch mode.                                                                                                |
| `npm run deploy`                    | Builds, pushes `dist/` to `gh-pages` (manual deploy).                                                              |
| `npm run lint-staged`               | Runs `lint-staged` directly (normally via the Husky pre-commit hook).                                              |

## Environment Variables

All prefixed `VITE_`, read via `import.meta.env`. **All optional for local dev** — a missing group only disables its own feature:

| Variable                            | Feature              | If missing                                                                                      |
| ----------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Contact form storage | `firebase.js` skips init, logs an error; `addMessage()` rejects. Rest of the app still renders. |
| `VITE_FIREBASE_AUTH_DOMAIN`         | ″                    | ″                                                                                               |
| `VITE_FIREBASE_DATABASE_URL`        | ″                    | ″                                                                                               |
| `VITE_FIREBASE_PROJECT_ID`          | ″                    | ″                                                                                               |
| `VITE_FIREBASE_STORAGE_BUCKET`      | ″                    | ″                                                                                               |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ″                    | ″                                                                                               |
| `VITE_FIREBASE_APP_ID`              | ″                    | ″                                                                                               |
| `VITE_EMAILJS_SERVICE_ID`           | Contact form email   | `emailjs.send` rejects; Firebase write still runs independently.                                |
| `VITE_EMAILJS_TEMPLATE_ID`          | ″                    | ″                                                                                               |
| `VITE_EMAILJS_USER_ID`              | ″                    | ″                                                                                               |
| `VITE_EMAILJS_TO_EMAIL`             | ″                    | ″                                                                                               |
| `VITE_GOOGLE_ANALYTICS_ID`          | Google Analytics     | Init fails silently (caught); no tracking.                                                      |
| `VITE_GOOGLE_SITE_VERIFICATION`     | Search Console       | Meta tag omitted.                                                                               |

Create `.env.development` in the project root (git-ignored). Same variables needed wherever `vite build` runs — for CI, as **GitHub Actions repository secrets** (`Settings → Secrets and variables → Actions`), named per [`ci.yml`](../.github/workflows/ci.yml) / [`deploy.yml`](../.github/workflows/deploy.yml).

> `vite.config.js` has its own **stricter, build-time** check — `npm run build` fails outright if the full `VITE_*` set isn't in `.env.production`/shell env. Only the dev server degrades gracefully; a production build still needs everything.

> **Never commit real credentials.** `.env`, `.env.*`, `*-env` files are git-ignored — keep it that way.

## Project Conventions

- **Path alias** — `@` → `src/` (app and tests). Prefer `@/utils/logger` over long relative paths.
- **Colocation** — each `src/components/<Name>/` holds its `.jsx`, `.scss`, and `.test.jsx` together.
- **Data-driven content** — resume content lives in `src/data/resumeData.js`, read by both `Resume.jsx` and the terminal. Edit content there, not in components.
- **Formatting/linting are enforced** — Prettier + ESLint run in CI and via Husky pre-commit (`lint-staged`). Change the config, not individual files, if a rule feels wrong.
- **Accessibility is linted** — `eslint-plugin-jsx-a11y` fails `npm run lint` on a11y regressions.

## Testing

- **Runner**: [Vitest](https://vitest.dev/), `jsdom` environment.
- **Library**: [React Testing Library](https://testing-library.com/) + `jest-dom` matchers (`src/test/setup.js`).
- **Config**: `vitest.config.js` is separate and minimal — no production plugins (PWA, image optimization, compression).
- **Convention**: tests sit beside the code (`Component.test.jsx`). Test observable behavior — accessible labels/roles, `aria-*`, clicks — see `Quotes.test.jsx` or `Terminal.test.jsx`.
- **jsdom gaps**: `src/test/setup.js` polyfills `Element.scrollTo` and `IntersectionObserver` as no-ops. Add new polyfills there, not per-test mocks.

```bash
npm test            # once
npm run test:watch  # watch mode
```

## Adding a New Section

1. Create `src/components/NewSection/NewSection.jsx` and `.scss`.
2. Root element: `<section id="new-section" className="new-section-section">` — the `id` is what `react-scroll` and `open <section>` target.
3. Render it inside `<main>` in `App.jsx`, in page order.
4. Add links where relevant: `Navbar.jsx`, `CommandPalette.jsx`'s `commands` array, `Terminal.jsx`'s `SECTION_ALIASES`/`buildCommands`.
5. Add `NewSection.test.jsx`.

## Building & Previewing a Production Build

```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ at http://localhost:4173
```

Use this to check anything production-only: PWA install, service worker caching, bundle size (`rollup-plugin-visualizer` opens automatically).

## Deployment

Live at [ahmednassar7.github.io](https://ahmednassar7.github.io/). Two independent paths:

- **Automatic** — [`deploy.yml`](../.github/workflows/deploy.yml) builds and publishes on every push to `main`, regardless of CI status. Keep `ci.yml` green before merging — a broken build here takes the live site down. Diagram: [ARCHITECTURE.md § 5](./ARCHITECTURE.md#5-build--deployment-pipeline).
- **Manual** — `npm run deploy` builds locally, pushes `dist/` to `gh-pages` via [`gh-pages`](https://www.npmjs.com/package/gh-pages). Needs every variable set locally first (`vite build` bakes them in).

Both need `VITE_FIREBASE_*`, `VITE_EMAILJS_*`, `VITE_GOOGLE_*` wherever the build runs:

- **Automatic** — as GitHub Actions repository secrets. Names aren't all identical to the `VITE_*` variables: Firebase secrets drop the `VITE_` prefix (`secrets.FIREBASE_API_KEY` → `VITE_FIREBASE_API_KEY`); EmailJS/Google keep it (`secrets.VITE_EMAILJS_SERVICE_ID` → `VITE_EMAILJS_SERVICE_ID`).
- **Manual** — your local `.env.production` (or shell) at deploy time.

## Troubleshooting

- **`EBADPLATFORM` on `npm install`** — npm < 11. Run `npm install -g npm@11`.
- **Contact form fails silently** — check the console; EmailJS and Firebase log independently since they run in parallel. "Firebase is not configured" → see [Environment Variables](#environment-variables).
- **`npm run build` fails: `Missing required environment variables in production`** — `vite.config.js`'s stricter build-time check. Every `VITE_*` variable must be in `.env.production`/CI env before building.
