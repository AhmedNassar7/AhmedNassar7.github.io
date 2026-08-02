# Contributing

This is Ahmed's personal portfolio, but issues, bug reports, and small pull requests (typo fixes, accessibility improvements, dependency bumps) are welcome. For anything larger — a new feature or section — please open an issue first to discuss it before writing code, so you don't spend time on something that doesn't fit the site.

## Before You Start

Read [docs/DEVELOPER_GUIDE.md](./docs/DEVELOPER_GUIDE.md) for local setup, and [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) if your change touches how sections talk to each other, the contact form, or the build pipeline.

## Workflow

1. **Fork** the repo and clone your fork.
2. **Branch** off `main` with a short, descriptive name (e.g. `fix/mobile-nav-overflow`, `docs/update-readme`).
3. **Make your change**, keeping it scoped to one concern per PR — small, reviewable diffs over large ones.
4. **Add or update tests** for any behavioral change (see [Testing](./docs/DEVELOPER_GUIDE.md#testing)).
5. **Run the full local check before pushing:**

   ```bash
   npm run format
   npm run lint
   npm test
   npm run build
   ```

   This mirrors what [`ci.yml`](./.github/workflows/ci.yml) runs on every push and PR — if these pass locally, CI should too.

6. **Commit.** Husky's pre-commit hook will auto-format and lint the files you staged; if it fixes something, review the diff and re-stage before committing. Write commit messages as plain, imperative sentences describing the change (e.g. `Fix contact form submit button getting stuck on "Sending..."`) — this repo doesn't enforce a strict commit-message format, but clear ones make the history useful.
7. **Open a pull request** against `main`, describing what changed and why. Link any related issue.

## Code Style

Don't hand-format anything — Prettier and ESLint are the source of truth (`.prettierrc`, `eslint.config.js`). If a formatting/lint rule feels wrong, propose a config change in your PR rather than working around it file-by-file. See [Project Conventions](./docs/DEVELOPER_GUIDE.md#project-conventions) for the non-tooling conventions (colocation, the `@` alias, data-driven resume content).

## Reporting Bugs

Open a [GitHub issue](https://github.com/AhmedNassar7/AhmedNassar7.github.io/issues) with:

- What you expected to happen vs. what actually happened.
- Steps to reproduce.
- Browser/OS, and whether it reproduces on the [live site](https://ahmednassar7.github.io/) or only locally.
- A screenshot or screen recording if it's visual.

## Code of Conduct

Be respectful and constructive. Disagreements about implementation are fine and expected — personal attacks aren't.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
