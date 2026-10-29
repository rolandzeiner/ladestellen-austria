# Contributing to Ladestellen Austria

## Dev setup

Uses [`uv`](https://docs.astral.sh/uv/) — the same tool CI installs deps with.

```bash
uv venv --python 3.14 && source .venv/bin/activate
uv pip install -r requirements_test.txt pre-commit
pre-commit install       # runs ruff, mypy and `vp check` on every commit

npm ci                   # Node ^24.11 or 26+, npm 11+
npm run build            # → custom_components/ladestellen_austria/www/ladestellen-austria-card.js
npm run dev              # watch mode (development build with sourcemaps)
```

## Branching & releases

- Work on `dev`. PRs target `dev`.
- Releases are tagged from `main` after merging `dev → main`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

## Card-version sync

Bump `manifest.json` `version` and `src/const.ts` `CARD_VERSION` **in the same commit** — `const.py` reads `CARD_VERSION` from the manifest, and `tests/test_card_version.py` asserts the TS constant matches byte-for-byte. If they drift, users get an infinite reload-banner loop.

There is no dev-time suffix. A pre-release carries the same version as the eventual final release; the GitHub `--prerelease` flag and the target branch are what distinguish them. The README badge is a dynamic release badge, so it needs no edit.

## Tooling & config

- `vite.config.ts` — the whole card toolchain, run through [Vite+](https://viteplus.dev/) (`vp`): `vp build` (Vite library mode on Rolldown), `vp test` (Vitest), and `vp check` (Oxfmt + Oxlint + type-check). The only card `devDependencies` are `vite-plus` and `happy-dom`. Vitest, Rolldown and the type-checker all ship inside `vite-plus`, and `typescript` is not installed. Six things there fail silently if you change them:
  - **One entry, one bundle, two cards.** The list card and the parking card ship from a single `ladestellen-austria-card.js` on purpose; the reasoning sits above `entry:`. Don't split it into one bundle per card.
  - The banner must be a **legal** comment — `/*! ... */` — with `comments: { legal: true }`. A `//` banner is stripped by the minifier and nothing tells you; only the built file's first bytes do.
  - **`minify` lives on `rolldownOptions.output`, with `dropConsole: false`.** Vite's library mode skips whitespace minification for ES output, so `build.minify` alone ships the bundle with its whitespace left in. `dropConsole` is all-or-nothing, and a `console.*` call in a `catch` block is the only client-side failure signal a card has.
  - **Dev vs prod comes from `--mode development`** (`npm run dev`). A plain `vp build` is production: minified, no sourcemap.
  - **`fmt.embeddedLanguageFormatting` stays `"off"`.** Otherwise Oxfmt reformats Lit `html`/`css` templates and changes the whitespace inside rendered elements, which is a DOM change, not a style change.
  - **Decorators are not configured.** Rolldown reads `tsconfig.json` itself and enables Lit's legacy decorators from it. If that ever regresses, class fields overwrite Lit's accessors and reactivity dies while the build stays green — diff a built bundle's Lit reactive-property list to catch it.
- **The `vite` override in `package.json` must name the same version as `vite-plus`.** It keeps npm from installing upstream Vite next to Vite+'s core. Dependabot bumps `vite-plus` but not the override, and `src/toolchain.test.ts` fails until you bump both.
- **The build does not type-check.** `vp check` is the only thing between a type error and a green build, which is why the gate runs it as its own step.
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
uv run --python 3.12 --no-project python -m compileall -q custom_components/ladestellen_austria
npx vp check                # format, lint and type-check; the build does not type-check at all
npm test                    # vp test run; the only step that runs the card's logic
npm run build
node -c custom_components/ladestellen_austria/www/ladestellen-austria-card.js
```

The `compileall` line mirrors the `compile-floor-python` CI job: the venv runs
3.14, so it is the only local check for syntax that users on Python 3.12 cannot
parse (see `target-version` above). **Keep `--no-project`.** Without it `uv`
treats the repo root as a project, finds no `requires-python`, and rebuilds
`.venv` on 3.12, taking every tool in it along. Recover with
`uv venv --clear --python 3.14 && uv pip install -r requirements_test.txt pre-commit`.

Python coverage **is** gated: `pytest.ini` carries `--cov-fail-under=90` in
`addopts`, so any `pytest` run that drops the package below 90 % fails
(it currently sits at ~94 %).

The card side is not gated, so the v8 coverage provider is not a dependency.
To see which branches a change left unexercised, install it for one run at the
Vitest version Vite+ bundles (`--no-save` leaves `package.json` and the
lockfile alone):

```bash
V=$(npx vp toolchain vitest | grep -oE 'vitest@[0-9.]+' | head -1 | cut -d@ -f2)
npm i --no-save @vitest/coverage-v8@"$V"
npx vp test run --coverage --coverage.provider=v8 --coverage.reporter=text \
  '--coverage.include=src/**/*.ts' '--coverage.exclude=src/**/*.test.ts'
```

CI runs the same checks plus hassfest + HACS validation + the dev-fixture guard + `npm audit --omit=dev --audit-level=high` + a check that the committed bundle matches a fresh build. Failing locally wastes a push.

## Reporting issues

Open an issue with:
- HA version + Ladestellen Austria version
- Diagnostics download (Settings → Devices & services → Ladestellen Austria, then the entry's ⋮ menu → Download diagnostics). The API key, the domain and the coordinates are redacted.
- Steps to reproduce
