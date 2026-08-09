# User Guide

A walkthrough for visitors of [ahmednassar7.github.io](https://ahmednassar7.github.io/). For developers: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md).

## Getting Around

One scrollable page, one URL. Three ways to move:

1. **Navbar links** — `Home`, `Stats`, `About`, `Resume`, `Testimonials`, `Contact` smooth-scroll; the current section highlights as you pass it.
2. **Command palette** — `Ctrl/Cmd + K`.
3. **Terminal** — `open <section>`.

A progress bar fills the navbar as you scroll. A **scroll-to-top button** appears once you're past the hero.

## Command Palette 🎛️

`Ctrl + K` (Windows/Linux) or `Cmd + K` (macOS) — or click the `Ctrl K` trigger, bottom-left.

| Action                                                              | Does                                |
| ------------------------------------------------------------------- | ----------------------------------- |
| Go to Home / About / Resume / GitHub Stats / Testimonials / Contact | Jumps to that section               |
| Switch to Dark/Light Theme                                          | Toggles the theme                   |
| Download Resume (PDF)                                               | Downloads `Ahmed_Nassar_Resume.pdf` |
| Open GitHub Profile / Open LinkedIn Profile                         | Opens in a new tab                  |
| Email Ahmed                                                         | Opens your mail client              |

**Keys**: type to filter · `↑`/`↓` to move · `Enter` to run · `Esc` to close.

## Interactive Terminal 🖥️

Click the terminal icon (bottom-left). Type `help` for the list:

| Command               | Does                                                              |
| --------------------- | ----------------------------------------------------------------- |
| `help`                | Lists commands                                                    |
| `whoami`              | Who Ahmed is                                                      |
| `about`               | Short bio                                                         |
| `experience`          | Work history                                                      |
| `projects`            | Featured projects                                                 |
| `skills`              | Tech stack                                                        |
| `achievements`        | Notable wins                                                      |
| `contact`             | Email, LinkedIn, GitHub                                           |
| `resume`              | Downloads the resume PDF                                          |
| `github` / `linkedin` | Opens the profile                                                 |
| `open <section>`      | Jumps to `about`, `resume`, `stats`, `testimonials`, or `contact` |
| `theme <dark\|light>` | Switches theme                                                    |
| `neofetch`            | System-info card, but Ahmed                                       |
| `clear`               | Clears the screen                                                 |
| `exit`                | Closes the terminal                                               |

`↑`/`↓` recall previous commands.

## Theme Toggle 🌙☀️

Moon/sun icon, top-right. Choice is remembered via `localStorage`.

## GitHub Stats 📈

Live stars, repos, merged PRs, commits, and a contribution heatmap with streak counter — fetched on load, falling back to last-known values if the API is unavailable.

CTAs: star the repo, join the Discord, or jump to Contact.

## Live Availability (About) 🕐

Ahmed's current Cairo time with an available/away indicator. Expand it to compare against your own time zone.

## Resume 📝

Education, experience, projects, achievements, skills. View/download `Ahmed_Nassar_Resume.pdf`.

## Testimonials 💬

Rotating recommendations, each linked to the reviewer's LinkedIn. "See all" links to the full list.

## Contact Form 📬

Name, email, optional country, message. Sent via email and saved to a database — independently, so one failing doesn't block the other.

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
