# User Guide

A walkthrough for visitors of [ahmednassar7.github.io](https://ahmednassar7.github.io/). For developers: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md).

## Getting Around

One scrollable page, one URL. Three ways to move:

1. **Navbar links** — `Home`, `About`, `Projects`, `Resume`, `Contact` smooth-scroll; the current section highlights as you pass it. (Stats, Testimonials, and the Guestbook are one scroll away and are in the footer, command palette, and terminal.)
2. **Command palette** — `Ctrl/Cmd + K`.
3. **Terminal** — `open <section>`.

The navbar also has a **Résumé** button (View / Download) and the theme toggle, grouped top-right.

A progress bar fills the navbar as you scroll. A **scroll-to-top button** appears once you're past the hero, in the bottom-right corner next to the like counter.

## Command Palette 🎛️

`Ctrl + K` (Windows/Linux) or `Cmd + K` (macOS) — or click the `Ctrl K` trigger, bottom-left.

| Action                                                                                     | Does                                |
| ------------------------------------------------------------------------------------------ | ----------------------------------- |
| Go to Home / About / Projects / Resume / GitHub Stats / Testimonials / Contact / Guestbook | Jumps to that section               |
| Switch to Dark/Light Theme                                                                 | Toggles the theme                   |
| Download Resume (PDF)                                                                      | Downloads `Ahmed_Nassar_Resume.pdf` |
| Open GitHub Profile / Open LinkedIn Profile                                                | Opens in a new tab                  |
| Email Ahmed                                                                                | Opens your mail client              |

**Keys**: type to filter · `↑`/`↓` to move · `Enter` to run · `Esc` to close.

## Interactive Terminal 🖥️

Click the terminal icon (bottom-left). Type `help` for the list:

| Command               | Does                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `help`                | Lists commands                                                                             |
| `whoami`              | Who Ahmed is                                                                               |
| `about`               | Short bio                                                                                  |
| `experience`          | Work history                                                                               |
| `projects`            | Featured projects                                                                          |
| `skills`              | Tech stack                                                                                 |
| `achievements`        | Notable wins                                                                               |
| `contact`             | Email, LinkedIn, GitHub                                                                    |
| `resume`              | Downloads the resume PDF                                                                   |
| `github` / `linkedin` | Opens the profile                                                                          |
| `open <section>`      | Jumps to `about`, `projects`, `resume`, `stats`, `testimonials`, `contact`, or `guestbook` |
| `theme <dark\|light>` | Switches theme                                                                             |
| `neofetch`            | System-info card, but Ahmed                                                                |
| `clear`               | Clears the screen                                                                          |
| `exit`                | Closes the terminal                                                                        |

`↑`/`↓` recall previous commands.

## Theme Toggle 🌙☀️

Moon/sun icon in the top-right controls group (next to the Résumé button). Choice is remembered via `localStorage`.

## Résumé Button 📄

In the navbar, top-right. Click it for a small menu: **View** (opens the PDF in a new tab) or **Download** (saves `Ahmed_Nassar_Resume.pdf`). The same actions are also in the Resume section, the command palette, and the terminal.

## GitHub Stats 📈

Live stars, public repos, commit count, and merged Django PRs, plus a contribution heatmap with a streak counter — fetched on load (commits come from GitHub's commit-search API), falling back to last-known values if the API is unavailable or rate-limited.

CTAs: star the repo, join the Discord, or jump to Contact.

## Projects 🗂️

A dedicated section with a card per project: an app-icon tile, name, description, tech tags, and links to the repo and (where there is one) a live demo. Cards tilt on hover. "More on GitHub" links to all repositories.

## Live Availability (About) 🕐

Ahmed's current Cairo time with an available/away indicator. Expand it to compare against your own time zone.

## Resume 📝

Experience, education, interview experience, achievements, and a categorized skills grid. View/download `Ahmed_Nassar_Resume.pdf` from the buttons here or the navbar Résumé menu. (Projects have their own section above.)

## Testimonials 💬

Rotating recommendations, each linked to the reviewer's LinkedIn. "See all" links to the full list.

## Contact Form 📬

Name, email, optional country, message. Sent via email and saved to a database — independently, so one failing doesn't block the other. This is **private** — it goes to Ahmed's inbox, not a public page (that's the guestbook).

## Guestbook ✍️

A **public** wall. Leave a name and a short message and it appears in the live list below for everyone. The list is a capped, scrollable box, so the section stays the same size no matter how many people sign. There's a light rate limit (one note per minute per browser) to keep out spam. Entries are moderated by Ahmed and can only be removed by him.

## Like the Site ❤️

A pill in the bottom-right corner shows a running total of likes from every visitor, and ticks up live as other people like. Tap the heart to add yours — there's no cap, tap as many times as you want. Your own contribution is remembered on your device.

## Installing as an App (PWA) 📱

- **Desktop (Chrome/Edge)** — install icon in the address bar, or browser menu → "Install".
- **Mobile (Android/Chrome)** — menu → "Add to Home screen".
- **iOS (Safari)** — Share → "Add to Home Screen".

Installed content stays available offline via a cached service worker.

## Accessibility

- Every interactive element is keyboard-reachable with an accessible label — enforced by lint (`jsx-a11y`).
- Respects OS-level **reduce motion** — disables scroll animations if set.
- Light/dark themes both meet readable contrast.

## Rotating Quotes 💬

Ten programming quotes, auto-advance every 5s, or click to change manually.

## Interactive Extras ✨

A few small things worth trying (desktop, with a mouse — all skipped automatically on touch devices and under your OS's **reduce motion** setting):

- **Drag the cube** — the small Rubik's Cube next to the profile photo spins freely in any direction; let go of it and it keeps auto-rotating on its own while it's on screen.
- **Click anywhere** — a soft glow trails your cursor, and every click sends out a small burst of colored sparks.
- **Hover a button** — social icons and the Contact form's Send button gently pull toward your cursor (a "magnetic" hover).
- **Send a message** — a real, successful submission through the Contact form triggers a confetti/firework celebration from the Send button.
- **The Konami code** — with the page focused (click an empty area first), press `↑ ↑ ↓ ↓ ← → ← → B A` on the keyboard for a confetti drop and a toast. Desktop only.
- **The console** — open your browser's developer console (`F12`) for a short hello and a couple of links.

## Signature ✍️

Ahmed's signature is drawn into the footer, written on with a left-to-right sweep the first time it scrolls into view.
