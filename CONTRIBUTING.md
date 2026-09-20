# Contributing to Ladestellen Austria

## Dev setup

Uses [`uv`](https://docs.astral.sh/uv/) — the same tool CI installs deps with.

```bash
uv venv --python 3.14 && source .venv/bin/activate
uv pip install -r requirements_test.txt pre-commit
pre-commit install

npm ci
npm run build           # → custom_components/ladestellen_austria/www/ladestellen-austria-card.js
npm run dev             # watch mode
```

For iterating against a live HA container, `./scripts/dev-push.sh` rebuilds the bundle and rsyncs `custom_components/ladestellen_austria/` over SSH; see the script header for prereqs and flags.

## Branching & releases

- Work on `dev`. PRs target `dev`.
- Releases are tagged from `main` after merging `dev → main`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

## Card-version sync

Bump `manifest.json` `version` and `src/const.ts` `CARD_VERSION` **in the same commit** — `const.py` reads `CARD_VERSION` from the manifest, and `tests/test_card_version.py` asserts the TS constant matches byte-for-byte. If they drift, users get an infinite reload-banner loop.

There is no dev-time suffix. A pre-release carries the same version as the eventual final release; the GitHub `--prerelease` flag and the target branch are what distinguish them. The README badge is a dynamic release badge, so it needs no edit.

## Tooling & config

- `rolldown.config.mjs` — the card build. Rolldown does transpilation, minification, module resolution and JSON natively, so the card's whole `devDependencies` is `rolldown` + `typescript`; the `@rollup/plugin-*` stack and `@swc/core` were **deleted** in the 2026-09 migration, not replaced. Three things there fail silently if you change them:
  - The banner must be a **legal** comment — `/*! ... */` — with `comments: { legal: true }`. A `//` banner is stripped by the minifier and nothing tells you; only the built file's first bytes do.
  - **`dropConsole` stays `false`.** Rolldown's option is a boolean, not terser's per-method array, so it is all-or-nothing — and most `console.*` calls here sit in `catch` blocks where dropping them turns a caught error into a silent one.
  - **Decorators are not configured.** Rolldown reads `tsconfig.json` itself and enables Lit's legacy decorators from it. If that ever regresses, class fields overwrite Lit's accessors and reactivity dies while the build stays green — diff a built bundle's Lit reactive-property list to catch it.
- **Rolldown does not type-check.** `npx tsc --noEmit` is the only thing between a type error and a green build, which is why the gate runs it as its own step.
- `pyproject.toml` is the source of truth for ruff, mypy, and coverage rules — change them here, not in CI flags.
  - **`target-version` tracks the oldest Python we support, never the one CI runs.** `hacs.json` promises HA ≥ 2025.1.0, which runs on Python 3.12, so `target-version = "py312"` — even though the venv and CI are on 3.14. Pointing it at the CI interpreter lets ruff rewrite code into syntax our users cannot parse and then stay silent about it; that is how wiener-linien-austria v1.7.1 shipped a SyntaxError. The `compile-floor-python` CI job byte-compiles the shipped package on 3.12 as an independent backstop. Raise all three together or not at all.
- `ATTRIBUTION` is the canonical data-source statement; it must stay in sync with `const.ATTRIBUTION` (the value every sensor emits).

Per-file coverage locally:

```bash
pytest tests/ --cov --cov-report=term-missing
```

`_dev_fixture.py` in `custom_components/ladestellen_austria/` is **gitignored** and the `no-dev-fixture` CI job hard-fails if it ever lands. Use it to inject synthetic 13-status stations during local card work; never commit it.

## Snapshot tests

Diagnostics output is pinned via `syrupy`. Snapshots live under `tests/snapshots/`. After an intentional change to the diagnostics shape (new field, redaction-set drift), regenerate:

```bash
pytest tests/test_diagnostics.py --snapshot-update
```

Commit the updated `.ambr` file alongside the code change so the diff is reviewable.

## Verification gate (must pass before pushing)

```bash
pytest tests/ -v
mypy --strict --ignore-missing-imports custom_components/ladestellen_austria
ruff check .
ruff format --check .       # separate: `ruff check` never inspects formatting
npx tsc --noEmit            # rolldown does not type-check at all
npm test                    # vitest; the only step that runs the card's logic
npm run build
```

`npm run test:coverage` prints a per-file v8 report and writes
`coverage/coverage-final.json`. There is no coverage threshold gate — the
number is there to show you which branches a change left unexercised, not to
block on a percentage.

CI runs the same checks plus hassfest + HACS validation + the dev-fixture guard + `npm audit --omit=dev --audit-level=high`. Failing locally wastes a push.

## Reporting issues

Open an issue with:
- HA version + Ladestellen Austria version
- Diagnostics download (Settings → Devices & Services → Ladestellen Austria → Download diagnostics) — secrets are auto-redacted
- Steps to reproduce
