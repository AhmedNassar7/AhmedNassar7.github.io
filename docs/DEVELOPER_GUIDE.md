# Developer Guide

Everything you need to work on this codebase locally: setup, scripts, environment variables, conventions, and how to extend it. For the "why" behind the structure, see [ARCHITECTURE.md](./ARCHITECTURE.md). For what the site does from a visitor's point of view, see [USER_GUIDE.md](./USER_GUIDE.md).

## Prerequisites

- **Node.js ≥ 20.17**
- **npm ≥ 11** — this is important, not just a suggestion. `package-lock.json` uses platform-specific `optionalDependencies` that npm 10 mishandles (it tries to install binaries for every OS/CPU combination instead of skipping the ones that don't match yours, and fails with `EBADPLATFORM`). CI pins `npm@11.12.1` for the same reason. Upgrade with:

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

The dev server runs at [http://localhost:5173](http://localhost:5173) with hot module replacement.

## npm Scripts

| Script                              | What it does                                                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                       | Starts the Vite dev server.                                                                                                                         |
| `npm start`                         | Same as `dev`, but explicitly sets `NODE_ENV=development` via `cross-env` first.                                                                    |
| `npm run build`                     | Production build to `dist/` (runs the full plugin pipeline — see [ARCHITECTURE.md § 6](./ARCHITECTURE.md#6-build-time-optimizations-viteconfigjs)). |
| `npm run serve` / `npm run preview` | Serves the built `dist/` locally, for sanity-checking a production build before deploying.                                                          |
| `npm run lint`                      | Runs ESLint over the whole repo.                                                                                                                    |
| `npm run format`                    | Formats the whole repo with Prettier (writes changes).                                                                                              |
| `npm run format-check`              | Checks formatting without writing (what CI runs).                                                                                                   |
| `npm test`                          | Runs the full Vitest suite once.                                                                                                                    |
| `npm run test:watch`                | Runs Vitest in watch mode.                                                                                                                          |
| `npm run deploy`                    | Builds, then pushes `dist/` to the `gh-pages` branch (manual deploy path).                                                                          |
| `npm run lint-staged`               | Runs `lint-staged` directly (normally invoked automatically by the Husky pre-commit hook).                                                          |

## Environment Variables

All variables are prefixed `VITE_` (required by Vite to expose them to client code) and read via `import.meta.env`. **Every one of them is optional for local development** — the app renders fully without any of them; a missing group just disables its own feature instead of the whole site:

| Variable                            | Feature                           | Behavior if missing                                                                                                                                                    |
| ----------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Contact form storage              | `src/firebase.js` skips Firebase init and logs an error; `addMessage()` rejects instead of writing. The rest of the app, including the contact form UI, still renders. |
| `VITE_FIREBASE_AUTH_DOMAIN`         | ″                                 | ″                                                                                                                                                                      |
| `VITE_FIREBASE_DATABASE_URL`        | ″                                 | ″                                                                                                                                                                      |
| `VITE_FIREBASE_PROJECT_ID`          | ″                                 | ″                                                                                                                                                                      |
| `VITE_FIREBASE_STORAGE_BUCKET`      | ″                                 | ″                                                                                                                                                                      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ″                                 | ″                                                                                                                                                                      |
| `VITE_FIREBASE_APP_ID`              | ″                                 | ″                                                                                                                                                                      |
| `VITE_EMAILJS_SERVICE_ID`           | Contact form email delivery       | `emailjs.send` rejects; the Firebase write (if configured) still runs independently — see the [contact form data flow](./ARCHITECTURE.md#3-data-flow-contact-form).    |
| `VITE_EMAILJS_TEMPLATE_ID`          | ″                                 | ″                                                                                                                                                                      |
| `VITE_EMAILJS_USER_ID`              | ″                                 | ″                                                                                                                                                                      |
| `VITE_EMAILJS_TO_EMAIL`             | ″                                 | ″                                                                                                                                                                      |
| `VITE_GOOGLE_ANALYTICS_ID`          | Google Analytics                  | `ReactGA.initialize` throws inside a `try/catch` in `App.jsx` and is logged, not fatal; no tracking calls fire.                                                        |
| `VITE_GOOGLE_SITE_VERIFICATION`     | Search Console ownership meta tag | Meta tag is omitted from the built HTML.                                                                                                                               |

> **This used to be a hard crash, not a soft failure — fixed.** `src/firebase.js` originally validated the seven `VITE_FIREBASE_*` variables at **module import time** and `throw`n if any were missing. Since `Contact.jsx` imports `addMessage` from `firebase.js` unconditionally and nothing in the tree caught that throw (`main.jsx` renders `<App />` directly, no error boundary), the whole app failed to mount — a blank white page, with only a `pageerror` in devtools, for the very common case of a first-time clone with no `.env` at all. It now checks `isFirebaseConfigured` before calling `initializeApp`/`getDatabase`, logs instead of throwing when it's not, and `addMessage()` rejects with a clear error — which `Contact.jsx`'s existing `Promise.allSettled` handling already accounted for, so no caller changes were needed. Verified by removing `.env.development` entirely and confirming the full page renders; `npm test` (37/37), `npm run lint`, and `npm run build` (with a populated `.env.production`) all still pass.

Create a `.env.development` file at the project root for local values (already git-ignored — see `.gitignore`). For a production build, the same variables need to be present in the environment `vite build` runs in — in CI this means configuring them as **GitHub Actions repository secrets** (`Settings → Secrets and variables → Actions`) with the names referenced in [`ci.yml`](../.github/workflows/ci.yml) and [`deploy.yml`](../.github/workflows/deploy.yml).

> **Note:** `vite.config.js` has its own separate, stricter build-time check, independent of the runtime graceful-degradation in `firebase.js` above — `npm run build` fails outright if the full `VITE_*` set isn't present in whatever `.env.production`/shell environment the build runs in. Only the dev-server / runtime path degrades gracefully; a production build still requires everything.

> **Never commit real credentials.** `.env`, `.env.*`, and files matching `*-env` are already git-ignored; keep it that way.

## Project Conventions

- **Path alias** — `@` resolves to `src/` in both the app (`vite.config.js`) and tests (`vitest.config.js`). Prefer `@/utils/logger` over long relative `../../..` chains in new code.
- **Colocation** — each component folder under `src/components/<Name>/` holds its `.jsx`, its `.scss`, and (where present) its `.test.jsx` side by side. Keep new components consistent with this.
- **Data-driven content** — resume content (education, experience, projects, achievements, skills) lives in `src/data/resumeData.js`, not hardcoded in components. Both `Resume.jsx` and the terminal's commands read from it. If you're updating Ahmed's experience/projects/skills, this is the one file to edit.
- **Formatting/linting are enforced, not optional** — Prettier (`singleQuote`, `semi`, 80-char print width, LF line endings — see `.prettierrc`) and ESLint (React, React Hooks, `jsx-a11y`, Prettier-as-lint-rule — see `eslint.config.js`) both run in CI and as a Husky pre-commit hook via `lint-staged` (`*.{js,jsx}` → `eslint --fix` then `prettier --write`). Don't fight the formatter; if a rule seems wrong, change the config, not individual files.
- **Accessibility rules are linted, not just conventionally followed** — `eslint-plugin-jsx-a11y` is part of the default lint config, so a11y regressions (missing labels, invalid ARIA, etc.) fail `npm run lint` the same as any other lint error.

## Testing

- **Runner**: [Vitest](https://vitest.dev/) with the `jsdom` environment.
- **Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + `@testing-library/jest-dom` matchers (registered globally in `src/test/setup.js`).
- **Config**: `vitest.config.js` is a separate, minimal Vite config — it intentionally does **not** load the production plugin pipeline (PWA, image optimization, compression, sitemap), so tests stay fast and don't depend on plugins that only make sense for a real build.
- **Conventions**: test files sit next to the code they test (`Component.test.jsx` beside `Component.jsx`, or `util.test.js` beside `util.js`). Favor testing observable behavior (what a user sees/can do) over implementation details — e.g. querying by accessible label/role, asserting on `aria-*` attributes, simulating clicks — see `Quotes.test.jsx` or `Terminal.test.jsx` for the house style.
- **jsdom gaps**: `src/test/setup.js` polyfills the two browser APIs jsdom doesn't implement that this codebase touches — `Element.scrollTo` and `IntersectionObserver` — as inert no-ops. If a new component starts using another unsupported browser API, add the polyfill there rather than mocking it per-test.

Run the suite:

```bash
npm test          # once
npm run test:watch  # watch mode while developing
```

## Adding a New Section

The sections under `<main>` in `App.jsx` follow a consistent shape. To add a new one:

1. Create `src/components/NewSection/NewSection.jsx` and `NewSection.scss`.
2. Give the root element `<section id="new-section" className="new-section-section">` — the `id` is what `react-scroll` and the command palette/terminal `open <section>` command target.
3. Import and render it inside `<main>` in `App.jsx`, in the order it should appear on the page.
4. If it should be reachable from the navbar, add a link in `Navbar.jsx`; if from the command palette, add an entry to the `commands` array in `CommandPalette.jsx`; if from the terminal, add an alias to `SECTION_ALIASES` and a handler in `buildCommands` in `Terminal.jsx`.
5. Add a `NewSection.test.jsx` covering its key interactive behavior.

## Building & Previewing a Production Build

```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally at http://localhost:4173
```

Use this to sanity-check anything that only manifests in a production build — PWA install prompts, service worker caching, minified output, bundle size (the `rollup-plugin-visualizer` treemap opens automatically after `npm run build`).

## Deployment

The site is deployed to **GitHub Pages** at [ahmednassar7.github.io](https://ahmednassar7.github.io/). There are two paths, and they're independent of each other:

- **Automatic (the one that actually runs in practice)** — [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) builds and publishes `dist/` to the `gh-pages` branch on every push to `main`, regardless of whether [`ci.yml`](../.github/workflows/ci.yml) passed. In practice you want CI green before merging to `main` — a broken build published by `deploy.yml` takes the live site down. See the pipeline diagram in [ARCHITECTURE.md § 5](./ARCHITECTURE.md#5-build--deployment-pipeline).
- **Manual** — `npm run deploy` builds locally and pushes `dist/` to `gh-pages` directly from your machine via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package. Useful for a one-off deploy without waiting on Actions, but your local `.env`/shell needs every variable below set first, since `vite build` bakes them into the output.

Both paths need the same variables — `VITE_FIREBASE_*`, `VITE_EMAILJS_*`, `VITE_GOOGLE_*` — available wherever the build runs:

- For the automatic path, that means configuring them as **GitHub Actions repository secrets** under `Settings → Secrets and variables → Actions`. The secret names are **not** all identical to the `VITE_*` variable names — check `ci.yml`/`deploy.yml` before assuming. Specifically: the seven Firebase secrets drop the `VITE_` prefix (`secrets.FIREBASE_API_KEY` → `VITE_FIREBASE_API_KEY`), while the EmailJS and Google secrets keep it as-is (`secrets.VITE_EMAILJS_SERVICE_ID` → `VITE_EMAILJS_SERVICE_ID`).
- For the manual path, that means your local `.env.production` (or shell environment) at the moment you run `npm run deploy`.

## Troubleshooting

- **`EBADPLATFORM` during `npm install`** — you're on npm < 11. Run `npm install -g npm@11` first.
- **Contact form fails silently, or the "Sending…" state doesn't clearly explain why it failed** — check the browser console; `Contact.jsx` logs EmailJS/Firebase errors independently since the two calls run in parallel, so one can fail without the other showing anything. If Firebase logs "Firebase is not configured", see [Environment Variables](#environment-variables) above.
- **`npm run build` fails with `Missing required environment variables in production`** — this is `vite.config.js`'s own build-time check, stricter than the dev-server runtime behavior; every `VITE_*` variable needs to be present in `.env.production` (or your shell/CI environment) before building, even though the dev server itself doesn't require them.
