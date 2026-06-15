# Contributing to react-noti

## Table of Contents

- [Development setup](#development-setup)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Code style](#code-style)
- [Commit convention](#commit-convention)
- [Branch strategy](#branch-strategy)
- [Opening a pull request](#opening-a-pull-request)
- [Release process](#release-process)
- [Demo deployment](#demo-deployment)

---

## Development setup

**Requirements:** Node.js ≥ 18.18, npm ≥ 10.

```bash
git clone https://github.com/vitaliiburlaka/react-noti.git
cd react-noti
npm install
npm start          # start the demo app at http://localhost:5173
```

---

## Project structure

```
src/
  components/
    ReactNoti/     # container component — registers with notify singleton,
    │              # manages toast list state, handles position ordering
    Toast/         # individual toast — timer, dismiss, progress, icons
  utils/
    constants.ts   # POSITION, MSG_TYPE, defaultOptions
    helpers.ts     # generateUID(), Timer class
  styles/
    colors.ts      # design token values (used as CSS variable fallbacks)
    typography.ts
    breakpoints.ts
  notify.ts        # Notify singleton — store, configure, register, CRUD methods
  index.ts         # public API surface
  setupTests.ts    # Vitest + @testing-library/jest-dom setup

examples/          # Vite demo app (not part of the published package)
  src/
  index.html
  vite.config.ts

dist/              # built library output (git-ignored)
  react-noti.esm.js
  react-noti.cjs.js
  react-noti.esm.js.map
  react-noti.cjs.js.map
  src/index.d.ts
```

---

## Scripts

| Script                    | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `npm start`               | Start demo app dev server                      |
| `npm test`                | Run tests once                                 |
| `npm run test:watch`      | Run tests in watch mode                        |
| `npm run coverage`        | Run tests with v8 coverage report              |
| `npm run build`           | Build the library (`dist/`)                    |
| `npm run examples:build`  | Build the demo app (`examples/build/`)         |
| `npm run typecheck`       | TypeScript type check (no emit)                |
| `npm run lint`            | ESLint check                                   |
| `npm run lint:fix`        | ESLint with auto-fix                           |
| `npm run lint:format`     | Prettier check (md, json, yml, css)            |
| `npm run lint:format:fix` | Prettier write (md, json, yml, css)            |
| `npm run commit`          | Interactive conventional commit via Commitizen |

**Before every commit, run:**

```bash
npm run lint:fix && npm run lint:format:fix
```

---

## Code style

- **ESLint** (`eslint.config.mjs`) — `typescript-eslint` recommended + React hooks rules + Prettier integration.
- **Prettier** — enforced via `eslint-plugin-prettier`; also run directly on md/json/yml/css files.
- **TypeScript** — strict mode, `moduleResolution: bundler`.
- **Emotion** — all styles live in `*.styled.ts` files alongside their component. No inline `css` prop usage in component files.
- **CSS custom properties** — design tokens are exposed as `--react-noti-*` variables in the styled files; `src/styles/colors.ts` holds the fallback values.

---

## Commit convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitizen. Always commit via:

```bash
npm run commit
```

Or match the format manually: `type(scope): subject`.

| Type                                | When to use                       | Version bump |
| ----------------------------------- | --------------------------------- | ------------ |
| `feat`                              | New feature                       | minor        |
| `fix`                               | Bug fix                           | patch        |
| `perf`                              | Performance improvement           | patch        |
| `refactor`                          | Refactor with no behaviour change | none         |
| `test`                              | Tests only                        | none         |
| `build`                             | Build system / tooling            | none         |
| `ci`                                | CI configuration                  | none         |
| `docs`                              | Documentation only                | none         |
| `chore`                             | Housekeeping                      | none         |
| `feat!` / `BREAKING CHANGE:` footer | Breaking change                   | **major**    |

---

## Branch strategy

| Branch   | Purpose                 | Publishes to        |
| -------- | ----------------------- | ------------------- |
| `master` | Stable releases         | `latest` tag on npm |
| `beta`   | Beta pre-releases       | `beta` tag on npm   |
| `next`   | Next major pre-releases | `next` tag on npm   |
| `alpha`  | Experimental            | `alpha` tag on npm  |

Work happens in feature branches (`feat/`, `fix/`, `chore/`) off `master`. Open a PR to `master`.

---

## Opening a pull request

1. Branch off `master`: `git checkout -b feat/your-feature`
2. Make changes — keep scope focused; one concern per PR.
3. Run the full check suite locally:
   ```bash
   npm run lint:fix && npm run lint:format:fix
   npm run typecheck
   npm test
   npm run build
   ```
4. If the change touches Emotion styled components, run `npm start` and visually verify in a browser — lint/tsc/test passing does not prove CSS-in-JS renders correctly.
5. Commit using `npm run commit`.
6. Push and open a PR against `master`.

---

## Release process

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io/) and triggered by CI on every push to `master`.

semantic-release will:

1. Analyse commits since the last release.
2. Determine the next version based on commit types (see table above).
3. Update `CHANGELOG.md` and `package.json`.
4. Publish to npm.
5. Create a GitHub Release with release notes.
6. Commit the version bump back to `master` (commit message: `chore(release): x.y.z [skip ci]`).

**Nothing needs to be done manually.** Merging a PR to `master` is the release trigger.

---

## Demo deployment

The demo at <https://vitaliiburlaka.github.io/react-noti> is deployed automatically to GitHub Pages after every successful release on `master`.

### How it works

The `deploy` job in `.github/workflows/ci.yml` runs after `release` completes. It:

1. Builds the demo app (`npm run examples:build` → `examples/build/`).
2. Uploads the build as a GitHub Pages artifact.
3. Deploys via the native `actions/deploy-pages` action.

### One-time repository setup

The native GitHub Actions deployment method requires a single setting change in the repository (done once by the maintainer, not tracked in code):

> **Settings → Pages → Build and deployment → Source → select "GitHub Actions"**

This switches GitHub Pages away from the legacy branch-based model (where you commit built files to a `gh-pages` branch) to the modern artifact-based model used by `actions/deploy-pages`. Without this setting the deploy job will fail with a permissions error.

The `Vite` demo config (`examples/vite.config.ts`) already sets `base: '/react-noti/'` so asset paths resolve correctly under the Pages subdirectory.
