# Architecture

How the portfolio is built: the component tree, the two real data flows (contact form, GitHub stats), and the deploy pipeline.

Setup: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md). Visitor-facing features: [USER_GUIDE.md](./USER_GUIDE.md).

## 1. Overview

A **static single-page app**: React, built by Vite, deployed to GitHub Pages. No app server. Two third-party backends, called directly from the browser:

- **Firebase Realtime Database** — contact-form submissions (`contactMessages`), the global like counter (`likes/total`), and the guestbook (`guestbook/*`).
- **EmailJS** — emails Ahmed a copy of each contact submission.

Everything else (GitHub stats, heatmap, particles, terminal, command palette, Konami code) is a public API call or client-side state.

```mermaid
flowchart LR
    subgraph Browser
        App[React App]
    end

    App -->|GET /users/:user/repos<br/>GET /search/commits| GitHubAPI[GitHub REST API]
    App -->|contribution calendar| GHCalendar[github-contributions-api]
    App -->|contactMessages · likes/total · guestbook| Firebase[(Firebase Realtime DB)]
    App -->|emailjs.send| EmailJS[EmailJS]
    App -->|pageview / events| GA[Google Analytics]

    GHPages[GitHub Pages<br/>static hosting] -.serves dist/.-> App
```

## 2. Component Tree

`main.jsx` mounts `App`, which renders every section as a sibling under `<main>`. Sections are scroll targets (`<section id="...">`), not routes — navigation is scrolling via `react-scroll`.

```mermaid
flowchart TD
    Main[main.jsx] --> App[App.jsx]

    App --> Particles[ParticlesBackground<br/><i>lazy-loaded</i>]
    App --> CursorGlow
    App --> Navbar
    App --> CommandPalette
    App --> Terminal
    App --> LikeButton[LikeButton<br/><i>corner, Firebase RTDB</i>]
    App --> Konami[KonamiEasterEgg]
    App --> Home
    App --> Stats
    App --> About
    App --> Projects
    App --> Resume
    App --> Testimonials
    App --> Contact
    App --> Guestbook[Guestbook<br/><i>Firebase RTDB</i>]
    App --> Quotes
    App --> Footer
    App --> ScrollToTop[Scroll-to-top button]

    Navbar --> ResumeMenu[ResumeMenu<br/><i>View / Download</i>]
    Home --> RotatableShape[RotatableShape<br/><i>lazy-loaded, r3f cube</i>]
    Stats --> GitHubHeatmap
    Projects --> TiltCard
    Contact --> ConfettiBurst
    Contact --> GradientText
    Footer --> Signature[Signature<br/><i>inlined SVG, scroll-in sweep</i>]

    App -. theme state .-> Navbar
    App -. theme state .-> CommandPalette
    App -. theme state .-> Terminal
    App -. theme state .-> Particles
    App -. theme state .-> CursorGlow
```

Key decisions:

- **No router for navigation.** `react-router-dom` is a dependency, but the site is one scrollable page — `react-scroll` handles jumps; the URL hash updates manually (`window.history.replaceState`).
- **`theme` lives in `App.jsx`** as local state, persisted to `localStorage`, passed as a prop to the few components that need it. No context/store — one level of drilling isn't worth the indirection.
- **Two components are lazy-loaded**: `ParticlesBackground` (`tsparticles` is large and not needed for first paint) and `RotatableShape` (`three`/`@react-three/fiber` — the Home section's 3D cube). Both are also gated behind a `prefers-reduced-motion` check in their parent, so visitors who've opted out of motion never fetch either chunk.
- **`useMagneticHover`** (`src/hooks/useMagneticHover.js`) is a small shared hook — not a component — behind the magnetic pull on the Home/Footer social icons and the Contact submit button. Same gating pattern as `TiltCard`: inert on touch devices and under `prefers-reduced-motion`.
- **Resume/Projects content is data-driven.** `src/data/resumeData.js` is the single source; `Resume.jsx`, `Projects.jsx`, and the terminal's commands all read from it. Projects moved out of the résumé into their own top-level section but keep sharing that file (and `Resume/TiltCard`).
- **Firebase powers three features.** The Contact form (`contactMessages`), the [global like counter](#5-data-flow-likes--guestbook) (`likes/total`, `runTransaction`), and the [guestbook](#5-data-flow-likes--guestbook) (`guestbook/*`, `push` + `limitToLast`). All three degrade to no-ops when `VITE_FIREBASE_*` vars are absent.
- **Two corner overlays** are siblings of the sections: `LikeButton` (bottom-right, slides aside for the scroll-to-top button) and `KonamiEasterEgg` (a `keydown` listener + one-shot confetti). Neither is a section or a nav target.

## 3. Data Flow: Contact Form

`Contact.jsx` sends EmailJS and writes to Firebase **in parallel**, so one slow/failed call can't block the other:

```mermaid
sequenceDiagram
    participant U as Visitor
    participant C as Contact.jsx
    participant E as EmailJS
    participant F as Firebase Realtime DB

    U->>C: Submit form (name, email, country, message)
    par
        C->>E: emailjs.send(serviceId, templateId, formData)
        E-->>C: success / error (or timeout)
    and
        C->>F: addMessage() → set(contactMessages/{timestamp}, data)
        F-->>C: success / error (or timeout)
    end
    C->>C: Promise.allSettled — evaluate both outcomes
    C-->>U: success toast if either succeeded, else error state
```

- Both calls have a timeout and run through `Promise.allSettled`, so one hung request can't stick the form on "Sending…".
- `src/firebase.js` checks all `VITE_FIREBASE_*` vars before calling `initializeApp`/`getDatabase`. If any are missing, it logs and skips init; `addMessage()` rejects instead of crashing. See [DEVELOPER_GUIDE.md § Environment Variables](./DEVELOPER_GUIDE.md#environment-variables).
- `src/firebase.js` opens the Realtime Database socket at page load (via `.info/connected`), not on first submit, so the connection handshake isn't on the critical path.

## 4. Data Flow: Live GitHub Stats

`Stats.jsx` fetches three things independently on mount, falling back to last-known values if a call fails:

```mermaid
flowchart LR
    Stats[Stats.jsx mounts] --> R[GET api.github.com/users/:user/repos]
    Stats --> K[GET api.github.com/search/commits<br/>?q=author::user]
    Stats --> C[GET github-contributions-api<br/>contribution calendar]

    R --> Agg[Aggregate: stars, repo count]
    K --> Cm[total_count → commit count]
    C --> Heat[GitHubHeatmap.jsx<br/>calendar + streak calculation]

    Agg --> Counters[Animated counters<br/>Framer Motion]
    Cm --> Counters
    Heat --> Counters

    Agg -. fetch fails .-> Fallback[Last-known static values]
    Cm -. fetch fails / rate limited .-> Fallback
    C -. fetch fails .-> Nulled[Streak left as “—”]
```

- Live counts are rounded **down** to the nearest 5 so they never overstate.
- The commit-search API is unauthenticated, so its rate limit is low (~10 req/min); `FALLBACK_TOTAL_COMMITS` covers a 403.
- Merged-Django-PRs is a curated constant, not a fetch.
- `src/utils/streaks.js` holds the streak logic, kept separate for unit testing (`streaks.test.js`).

## 5. Data Flow: Likes & Guestbook

Both live in `src/firebase.js` and share the same Realtime Database, degrading to no-ops without `VITE_FIREBASE_*`.

**Like counter** (`LikeButton.jsx` ↔ `likes/total`):

- `subscribeToLikes(cb)` — `onValue` stream of the single integer; drives the live number.
- A tap increments a local buffer and moves the displayed number immediately (optimistic).
- After a short debounce, `addLikes(n)` sends **one** `runTransaction` for the whole buffer, in chunks of ≤ 45. Its resolved snapshot value reconciles the display, and server echoes are ignored mid-write so the number never double-counts or bounces.
- No per-visitor cap (contribution is tracked in `localStorage` for the "you liked N times" label); the RTDB rule rejects any single write that moves the total down or up by > 50.

**Guestbook** (`Guestbook.jsx` ↔ `guestbook/*`):

- `subscribeToGuestbook(cb)` — `onValue` on `query(ref, limitToLast(60))`, sorted newest-first.
- `addGuestbookEntry({name, message})` — trims/caps the fields and `push`es `{name, message, ts}`.
- Client-side spam guards: length caps, a `localStorage` per-browser cooldown, an off-screen honeypot input. Security rules make entries write-once; moderation is manual from the Firebase console.

## 6. Build & Deployment Pipeline

Two GitHub Actions workflows, independent of each other, on every push to `main`:

```mermaid
flowchart TD
    subgraph "ci.yml — every push & PR to main"
        direction TB
        A1[Checkout] --> A2[Setup Node 20 + npm 11]
        A2 --> A3[npm ci]
        A3 --> A4[format-check]
        A4 --> A5[lint]
        A5 --> A6[test — Vitest]
        A6 --> A7[build — with secrets injected as VITE_* env vars]
    end

    subgraph "deploy.yml — push to main only"
        direction TB
        B1[Checkout] --> B2[Setup Node 20]
        B2 --> B3[npm install]
        B3 --> B4[Set Firebase/EmailJS/GA env vars from secrets]
        B4 --> B5[npm run build]
        B5 --> B6[Upload dist/ as artifact]
        B6 --> B7[Download artifact]
        B7 --> B8[peaceiris/actions-gh-pages → publish to gh-pages branch]
    end

    B8 --> Live[ahmednassar7.github.io]
```

- **`ci.yml`** is the quality gate — never publishes, just has to pass. What PRs are checked against.
- **`deploy.yml`** runs regardless of CI — keep CI green before merging, or a broken build takes the live site down.
- Both need the same repository secrets (`FIREBASE_*`, `VITE_EMAILJS_*`, `VITE_GOOGLE_*`) — see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md#environment-variables).
- Manual alternative: `npm run deploy` ([`gh-pages`](https://www.npmjs.com/package/gh-pages) package), builds locally and pushes to `gh-pages` directly.

## 7. Build-Time Optimizations (`vite.config.js`)

The production build runs a longer plugin pipeline than a typical Vite app:

| Plugin                         | Purpose                                            |
| ------------------------------ | -------------------------------------------------- |
| `vite-plugin-sitemap`          | Generates `sitemap.xml`.                           |
| `vite-plugin-compression` (×2) | Pre-compressed `.gz` and `.br` build output.       |
| `vite-plugin-image-optimizer`  | Optimizes images/SVGs at build time.               |
| `vite-plugin-html`             | Build-time HTML transforms (env-driven meta tags). |
| `vite-plugin-pwa`              | Service worker + manifest.                         |
| `rollup-plugin-visualizer`     | Bundle-size treemap after each build.              |
| Manual chunking                | Splits vendor code into cacheable chunks.          |
| Modular Bootstrap imports      | Only the components actually used.                 |

`vitest.config.js` is a **separate, minimal config** — React plugin and `@` alias only, so tests skip the production-only plugins above.
