# Contributing

Ahmed's personal portfolio. Issues, bug reports, and small PRs (typos, accessibility, dependency bumps) are welcome. For anything bigger, open an issue first.

## Before You Start

Read [DEVELOPER_GUIDE.md](./docs/DEVELOPER_GUIDE.md) for setup, and [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the contact form, build pipeline, or how sections connect.

## Workflow

1. **Fork** and clone.
2. **Branch** off `main` (e.g. `fix/mobile-nav-overflow`).
3. **Change**, scoped to one concern per PR.
4. **Test** any behavioral change — see [Testing](./docs/DEVELOPER_GUIDE.md#testing).
5. **Check locally before pushing:**

   ```bash
   npm run format
   npm run lint
   npm test
   npm run build
   ```

   Mirrors [`ci.yml`](./.github/workflows/ci.yml) — green here means green in CI.

6. **Commit.** Husky auto-formats/lints staged files; review and re-stage if it changes anything. Plain, imperative commit messages (e.g. `Fix contact form stuck on "Sending..."`).
7. **Open a PR** against `main` — what changed, why, and any related issue.

## Code Style

Prettier and ESLint are the source of truth — don't hand-format. Propose a config change if a rule feels wrong, not a workaround. See [Project Conventions](./docs/DEVELOPER_GUIDE.md#project-conventions).

## Reporting Bugs

Open a [GitHub issue](https://github.com/AhmedNassar7/AhmedNassar7.github.io/issues) with: expected vs. actual, steps to reproduce, browser/OS, and a screenshot if visual.

## Code of Conduct

Be respectful and constructive.

## License

Contributions are licensed under the project's [MIT License](./LICENSE).
