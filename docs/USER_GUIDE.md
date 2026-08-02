# User Guide

A visitor-facing walkthrough of everything the portfolio can do — for anyone browsing [ahmednassar7.github.io](https://ahmednassar7.github.io/), not for developers. (If you're looking to run or modify the code, see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) instead.)

## Getting Around

The site is a single scrollable page, not a multi-page app — every section lives on one URL. Three ways to move around:

1. **Click a link in the navbar** — `Home`, `Stats`, `About`, `Resume`, `Testimonials`, `Contact` all smooth-scroll to their section, and the current section is highlighted as you scroll past it.
2. **Use the command palette** (`Ctrl/Cmd + K`) — see below.
3. **Use the terminal's `open <section>` command** — see below.

A thin progress bar at the top of the navbar fills in as you scroll down the page. A **scroll-to-top button** appears in the bottom-right corner once you've scrolled past the hero.

## Command Palette 🎛️

Press **`Ctrl + K`** (Windows/Linux) or **`Cmd + K`** (macOS) anywhere on the page — or click the small `Ctrl K` trigger pinned to the bottom-left corner — to open a searchable command list.

| Action                                                              | What it does                                              |
| ------------------------------------------------------------------- | --------------------------------------------------------- |
| Go to Home / About / Resume / GitHub Stats / Testimonials / Contact | Jumps straight to that section                            |
| Switch to Dark/Light Theme                                          | Toggles the site theme (same as the navbar moon/sun icon) |
| Download Resume (PDF)                                               | Downloads `Ahmed_Nassar_Resume.pdf` directly              |
| Open GitHub Profile / Open LinkedIn Profile                         | Opens the profile in a new tab                            |
| Email Ahmed                                                         | Opens your mail client addressed to Ahmed                 |

**Keyboard controls once it's open:**

- Type to filter the list.
- `↑` / `↓` to move the selection.
- `Enter` to run the highlighted command.
- `Esc` to close without doing anything.

## Interactive Terminal 🖥️

Click the terminal icon (bottom-left, next to the command palette trigger) to open a retro, fully-typed terminal Easter egg. Type `help` inside it to see the full list, or try any of these:

| Command               | What it does                                                                  |
| --------------------- | ----------------------------------------------------------------------------- |
| `help`                | Lists every available command                                                 |
| `whoami`              | Who Ahmed is, one line                                                        |
| `about`               | Short bio                                                                     |
| `experience`          | Work history, pulled from the same data as the Resume section                 |
| `projects`            | Featured projects with tech stack and links                                   |
| `skills`              | Technical skills by category                                                  |
| `achievements`        | Notable wins and recognitions                                                 |
| `contact`             | Email, LinkedIn, and GitHub, as plain text                                    |
| `resume`              | Downloads the resume PDF                                                      |
| `github` / `linkedin` | Opens the corresponding profile in a new tab                                  |
| `open <section>`      | Jumps to a section — `about`, `resume`, `stats`, `testimonials`, or `contact` |
| `theme <dark\|light>` | Switches the site theme                                                       |
| `neofetch`            | A `neofetch`-style system-info card, but it's about Ahmed                     |
| `clear`               | Clears the terminal screen                                                    |
| `exit`                | Closes the terminal                                                           |

Like a real shell, `↑` / `↓` recall previously run commands.

## Theme Toggle 🌙☀️

The moon/sun icon in the top-right of the navbar switches between light and dark themes. Your choice is remembered (via `localStorage`) for your next visit — you don't have to set it again.

## GitHub Stats 📈

The **Stats** section shows live numbers pulled directly from the GitHub API when you load the page: total stars across public repos, public repo count, merged open-source PRs, and total commits, plus a full **contribution heatmap** with a running streak counter. If GitHub's API is briefly unavailable, the section quietly falls back to last-known values instead of showing an error.

From here you can also **star the portfolio repo**, **join the community Discord**, or jump to the contact form — all via the CTA buttons under the stat cards.

## Live Availability (About Section) 🕐

The **About** section includes a small clock showing Ahmed's current time in Cairo, with an "Available now" / "Away" indicator. Click/expand it and it will also detect your own device's time zone and explain the offset between the two in plain English (e.g. "That's 3 hours behind you").

## Resume 📝

The **Resume** section covers education, work experience, featured projects, achievements, and a categorized skills list. Use the **View / Download** buttons to open or save `Ahmed_Nassar_Resume.pdf`.

## Testimonials 💬

A rotating carousel of recommendations from instructors, mentors, and colleagues. Every testimonial links out to the reviewer's LinkedIn profile so you can verify it's real; "See all recommendations on LinkedIn" links to the full list.

## Contact Form 📬

The **Contact** section collects your name, email, an optional country (searchable dropdown with flags), and a message. On submit, your message is emailed to Ahmed and saved to a database — the two happen independently, so if one is briefly unavailable the other can still succeed.

## Installing as an App (PWA) 📱

This site is an installable Progressive Web App:

- **Desktop (Chrome/Edge)** — look for an install icon in the address bar, or open the browser menu → "Install [site name]".
- **Mobile (Android/Chrome)** — browser menu → "Add to Home screen" / "Install app".
- **iOS (Safari)** — Share button → "Add to Home Screen".

Once installed, previously visited content is available even with a flaky connection, since a service worker precaches the site's assets.

## Accessibility Notes

- Every interactive element (pagination dots, command palette results, terminal controls) is keyboard-reachable and carries an accessible label — this is enforced by lint rules (`jsx-a11y`), not just convention.
- The site respects your OS-level **"reduce motion"** setting: if you have that enabled, scroll-triggered animations are disabled rather than forced on you.
- Both light and dark themes are designed for readable contrast; if you rely on a screen reader or high-contrast mode, the theme toggle and command palette are the fastest way to get to any section without relying on scroll position.

## Rotating Quotes 💬

Near the bottom of the page, a rotating set of ten programming quotes auto-advances every 5 seconds. Click a quote to advance it manually at your own pace instead.
