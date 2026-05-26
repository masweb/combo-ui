# Contributing to Combo UI

First off — thank you for considering a contribution! Combo UI is an open-source project and every bit of help counts, whether it's a bug report, a feature idea, documentation improvement, or a pull request.

## Development Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/guillermovln/combo-ui.git
   cd combo-ui
   ```

2. **Install dependencies**

   This project uses [pnpm](https://pnpm.io/) as its package manager.

   ```sh
   pnpm install
   ```

3. **Start the development server**

   ```sh
   pnpm dev
   ```

   This will launch the dev build for the Vue 3 runtime package and the Tauri 2 editor app.

## Running Tests

```sh
pnpm test
```

## Linting & Formatting

Run the linter to check for issues:

```sh
pnpm check
```

You can also invoke [oxlint](https://oxc.rs/docs/guide/usage/linter.html) directly:

```sh
oxlint .
```

Code is formatted with **oxfmt**. Make sure your changes are formatted before committing.

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Please structure your commit messages like:

```
type(scope): description
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`

**Examples:**

```
feat(button): add secondary variant
fix(tooltip): close on outside click
docs(readme): update installation instructions
```

## Pull Request Process

1. **Fork** the repository.
2. Create a **feature branch** from `main`:
   ```sh
   git checkout -b feat/my-new-feature
   ```
3. Make your changes, commit them with a descriptive conventional commit message.
4. **Push** your branch to your fork.
5. Open a **Pull Request** against the `main` branch of the upstream repository.
6. Ensure all CI checks pass and address any review feedback.

## Code Style

- **TypeScript** in strict mode — no `any` unless absolutely necessary.
- Use **English** for all code, comments, documentation, and commit messages.
- Follow the existing code conventions in the repository.
- Keep changes focused — one concern per PR is preferred.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for helping make Combo UI better! 🎉
