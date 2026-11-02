# Contributing to Ladestellen Austria

Thanks for taking a look. This repo is a Home Assistant integration with two Lovelace cards. Everything you need to work on it is on this page, and the gate in *Verification gate* has to pass before a change lands.

## Quick start

```bash
git clone https://github.com/rolandzeiner/ladestellen-austria.git
cd ladestellen-austria
uv venv --python 3.14 && source .venv/bin/activate
uv pip install -r requirements_test.txt pre-commit
pre-commit install
npm ci && npm run build
```

Before a PR, run the gate in *Verification gate*. It is what CI runs, so failing locally only costs you a push.

## Branching and releases

- Work on `dev`; PRs target `dev`. Nothing is committed or force-pushed to `main`.
- For anything bigger than a fix, open an issue first so the shape is agreed before the code is written.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. A subject line, then bullets that say what changed and why.
- The built bundle is committed and travels with the `src/` change that produced it: users install through the Marketplace and never run `npm`, and CI fails when the committed bundle differs from a fresh build by a byte.
- Releases are the maintainer's: a `dev → main` PR, squash-merged, then a tag from `main`. Publishing the release runs `release.yml`, which attaches `ladestellen_austria.zip`, a flat archive of `custom_components/ladestellen_austria/`. `hacs.json` sets `zip_release`, so the Marketplace downloads that file, and a release without it can't be installed. If the job fails, `gh workflow run release.yml -f tag=vX.Y.Z` re-runs it against the existing tag.
- Contributions are accepted under the repo's MIT licence.

## Python environment

- The project uses [`uv`](https://docs.astral.sh/uv/) for Python environments, the same tool CI installs with (`astral-sh/setup-uv` and `uv pip install --system`), so a gate that passes locally resolves what CI resolves. Plain `python -m venv` and `pip` work too.
- `3.14` is the CI interpreter and what `pytest-homeassistant-custom-component` requires. It is deliberately not the support floor; see *Two Python versions*.
- `pre-commit install` runs ruff, ruff-format, mypy and `vp check` on every commit, plus the whitespace hooks, from which the built bundle is excluded (see *Card toolchain*).
- A venv built months ago drifts from `requirements_test.txt`. Re-run `uv pip install -U -r requirements_test.txt` after a pin bump and whenever you come back to the repo; the `-U` is what moves a floating range such as PHACC's.
- `requirements_test.txt` carries its own rules in its header comment: PHACC governs the test stack, and nothing it pins is declared again.
- `custom_components/ladestellen_austria/_dev_fixture.py` is gitignored and the `no-dev-fixture` CI job fails if it ever lands. The coordinator imports it only when `LADESTELLEN_AUSTRIA_DEV_FIXTURE=1` is set, to inject a synthetic station with every status for local card work.

## Two Python versions

Every change has to respect both, and conflating them has shipped a broken release in this portfolio.

| Axis | Version | Where it is declared |
|---|---|---|
| **Runtime**: what we develop and test on | 3.14 | `validate.yml` `tests` job, your local venv |
| **Floor**: the oldest Python we must still run on | 3.12 | `pyproject.toml` `[tool.ruff] target-version`, the `compile-floor-python` CI job |

The floor is whatever `hacs.json`'s `homeassistant` value requires. HA 2025.1.0 declares `REQUIRED_PYTHON_VER = (3, 12, …)`, which you can check rather than remember:

```bash
gh api "repos/home-assistant/core/contents/homeassistant/const.py?ref=2025.1.0" \
  --jq .content | base64 -d | grep REQUIRED_PYTHON_VER
```

Setting `target-version` to the CI interpreter lets `ruff format` emit syntax the floor cannot parse and then stay silent about it; that is how a sibling once shipped a `SyntaxError` with green CI, because every check ran on the newer interpreter. Raise the floor only by changing all three declarations in one commit, plus the README's requirement line and badge.

## Card toolchain

The cards live in `src/` and build to `custom_components/ladestellen_austria/www/ladestellen-austria-card.js`. Their whole toolchain runs through [Vite+](https://viteplus.dev/) (`vp`), configured in `vite.config.ts`: `vp build` (Vite library mode on Rolldown), `vp test` (Vitest) and `vp check` (Oxfmt, Oxlint and the type-check). The only card `devDependencies` are `vite-plus` and `happy-dom`; Vitest, Rolldown and the type-checker ship inside `vite-plus`, and `typescript` is not installed. `npx vp` runs the copy in `node_modules`; a global `vp` works too.

| Command | What it does |
|---|---|
| `npm run dev` | Watches `src/` and rebuilds the bundle on save, with a sourcemap (`--mode development`). |
| `npm run build` | Production build into `www/`. |
| `npm test` | `vp test run`: the card suites. |
| `npm run check` | `vp check`: Oxfmt, Oxlint and the type-check. `npx vp check --fix` rewrites what it can. |

Node 24.11 or newer (26 works too) and npm 11.

Commit the built bundle. End users install through the Marketplace and never run `npm`, so `custom_components/ladestellen_austria/www/ladestellen-austria-card.js` is tracked. CI asserts the committed bundle matches a fresh build byte for byte; a stale bundle is the infinite reload-banner bug. A dev build writes a `.map` file next to it; it is gitignored.

Things in `vite.config.ts` that fail silently if you change them:

- **One entry, one bundle, two cards.** The station list card and the parking card ship from a single `ladestellen-austria-card.js` on purpose: they share the localize helper, the formatters, the status mapping, the slot palette, the footer and the version banner. The reasoning sits above `entry:`. Don't split it into one bundle per card.
- The banner must be a **legal** comment, `/*! ... */`, with `comments: { legal: true }`. The minifier strips a `//` banner without a word; only the built file's first bytes show it.
- **`minify` lives on `rolldownOptions.output`, with `dropConsole: false`.** Vite's library mode skips whitespace minification for ES output, so `build.minify` alone ships the bundle with its whitespace left in. `dropConsole` is all-or-nothing, and a `console.*` call in a `catch` block is the only client-side failure signal a card has.
- **Dev vs prod comes from `--mode development`** (`npm run dev`). A plain `vp build` is production: minified, no sourcemap.
- **`fmt.embeddedLanguageFormatting` stays `"off"`.** Otherwise Oxfmt reformats Lit `html` and `css` templates and changes the whitespace inside rendered elements, which is a DOM change, not a style change.
- **Decorators are not configured.** Rolldown reads `tsconfig.json` itself and enables Lit's legacy decorators from it. If that ever regresses, class fields overwrite Lit's accessors and reactivity dies while the build stays green; `src/card-smoke.test.ts` reads `elementProperties` back off each element and catches it.
- **`lint.plugins` replaces Oxlint's defaults.** It names `typescript`, `unicorn` and `oxc` next to `vitest`; drop one and its rules stop running without a word. The `vitest/*` rules fail a committed `.only` or `.skip`, a test without an assertion, a duplicate title, an `expect` inside an `if` and a bare `toThrow()`, and `reportUnusedDisableDirectives` fails a disable comment that no longer suppresses anything.
- **`lint.options.denyWarnings: true`.** Without it `vp check` exits 0 on warnings, and CI and pre-commit let them through.
- **`codeSplitting: false`.** The bundle is one file; a dashboard resource can't load a second chunk the bundler decided on. Nothing is dynamically imported today, and this keeps a future `import()` from emitting a chunk next to the bundle.
- **`emptyOutDir: false`.** Vite empties the output directory before each build by default, and `www/` sits inside the integration package.

The `vite` override in `package.json` must name the same version as `vite-plus`. It keeps npm from installing upstream Vite next to Vite+'s core. Dependabot bumps `vite-plus` but not the override, and `src/toolchain.test.ts` fails until both match. Bump with `npx --package=vite-plus@<new> vp migrate --no-interactive`, which moves both; `npm install vite-plus@<new>` fails with ERESOLVE.

The build does not type-check. `vp check` is the only thing between a type error and a green build, which is why the gate runs it as its own step. It also catches a backtick inside a Lit `css` or `html` template, comments included, which ends the template early and fails the card at load while the build stays green.

The bundle is excluded from the `end-of-file-fixer` and `trailing-whitespace` hooks: the bundler emits no trailing newline, and a hook that fixes the file after the build leaves it out of sync with a fresh one, which CI asserts byte for byte. `vp check` runs as a local hook on card source; don't switch to Vite+'s own `vp staged` hooks, which take over `core.hooksPath` and silently disable ruff and mypy.

`tsconfig.json`'s `lib` is the cards' browser floor: ES2022. That is why a copy is sorted in place rather than with `toSorted()`, and why the ES2023 array methods stay out: the bundle doesn't polyfill them. Raising it is a browser requirement for users; say so in the README's Requirements section in the same commit.

### Trying it in Home Assistant

Copy `custom_components/ladestellen_austria/` into your Home Assistant config's `custom_components/` and restart Home Assistant. After a card change, copy the rebuilt `www/` file the same way and hard-refresh the browser: the resource URL only changes with the version.

## Verification gate

```bash
# Python
pytest tests/ -v
mypy --strict --ignore-missing-imports custom_components/ladestellen_austria
ruff check .
ruff format --check .                     # separate: `ruff check` never inspects formatting

# The oldest Python we support, derived from pyproject.toml, never hardcoded
FLOOR=$(sed -n 's/^target-version = "py3\([0-9]*\)"/3.\1/p' pyproject.toml)
uv run --python "$FLOOR" --no-project python -m compileall -q custom_components/ladestellen_austria

# Card
npx vp check                              # format, lint and the only type-check
npm test                                  # vp test run
npm run build                             # commit the rebuilt bundle with the src/ change
git diff --exit-code -- custom_components/ladestellen_austria/www/*.js
node -c custom_components/ladestellen_austria/www/ladestellen-austria-card.js
```

CI runs the same checks plus hassfest, HACS validation, `npm audit --omit=dev --audit-level=high`, a check that the committed bundle matches a fresh build, the dev-fixture guard and CodeQL. Failing locally only costs you a push.

Two of these are easy to skip and expensive to skip:

- **`ruff format --check`** is separate from `ruff check`, which never inspects formatting. Without it the formatter drifts silently until someone runs it.
- **`npx vp check`** is the only type-check anywhere. The build strips types without checking them, so a type error builds cleanly all the way to a shipped bundle.

**Keep `--no-project`** on the `compileall` line. Without it `uv` treats the repo root as a project, finds no `requires-python`, and rebuilds `.venv` on the floor interpreter, taking every tool in it along. Recover with `uv venv --clear --python 3.14 && uv pip install -r requirements_test.txt pre-commit`.

## Tests

**Python.** `pytest tests/` runs on `pytest-homeassistant-custom-component`. `tests/conftest.py` holds what a new test starts from: `make_entry()` builds a config entry, `make_response_cm()` wraps a fake HTTP response, the `mock_fetch` fixture stands in for the upstream, and three autouse fixtures (`auto_enable_custom_integrations`, `mock_aiohttp_session` and `no_deprecated_ha_api`) are on in every test. `test_api.py` is an AST guard: it fails on any Home Assistant or package import in `api.py`. `test_user_agent.py` checks both outbound call sites, the coordinator and the config flow's trial search, and `test_status_parity.py` holds the Python status normaliser and the card's to the same buckets. The harness traps that cost an afternoon:

- The autouse `no_deprecated_ha_api` fixture fails any test that trips Home Assistant's deprecation channel, in both of HA's message shapes. A test that exercises a deprecated API on purpose takes `@pytest.mark.allow_deprecated_ha_api`; don't weaken the fixture.
- Unknown markers fail the run (`strict_markers`), a hung fixture fails after 15 s, and a `DeprecationWarning` reached through our own code is an error (`pytest.ini` says which libraries are exempt and how to add one).
- `tests/test_coordinator.py` pins the translation key each API error turns into; a new API error joins it, and its key goes into `strings.json` in the same change.

**Card.** The suites sit beside the sources as `src/**/*.test.ts` and import from `vite-plus/test`, not `vitest`. Pure functions run in plain Node: the formatters and status classification (`utils.test.ts`), the station filters, opening hours and row status (`station-logic.test.ts`), the lifecycle helpers both cards and both editors share (`card-lifecycle.test.ts`), the language packs (`localize/localize.test.ts`), the CSS text of the grid-cell rules (`grid-cell.test.ts`) and the Vite+ pins named in *Card toolchain* (`toolchain.test.ts`). Anything that needs a DOM opts in with a `@vitest-environment happy-dom` line in the file's leading comment: `card-smoke.test.ts` mounts both cards and both editors, checks the decorator wiring, the error states, the accessibility tree of the station rows and the editors' chip filters; `editor-panels.test.ts` registers a stand-in expansion panel to check the editors' groups and what their forms save; `render-snapshot.test.ts` holds the snapshots under *Snapshots*.

- The HA components the cards and editors host (`ha-card`, `ha-form`, `ha-icon`, `ha-alert`, `ha-expansion-panel`) are deliberately never defined in tests. An undefined element is inert, Lit renders straight through it, and not stubbing them is what keeps this layer free of a test harness. `card-smoke.test.ts` therefore sees every editor group drawn open.
- happy-dom lays nothing out: `getBoundingClientRect()` is all zeros, so nothing here asserts a size.
- `src/localize/localize.ts` keeps the active language in module-level state, shared across a file's tests; set the language explicitly in a test that depends on it.

A change to what a card does comes with a test that fails without it.

### Snapshots

Diagnostics output is pinned with `syrupy` under `tests/snapshots/`. After an intended change to the diagnostics shape, regenerate with `pytest tests/test_diagnostics.py --snapshot-update`, review the diff and commit the `.ambr` file with the code.

On the card side, `src/render-snapshot.test.ts` pins the markup of the station detail panel and the parking editor, one snapshot per optional branch, under `src/__snapshots__/`. Lit's marker comments and the whitespace between tags are stripped, so re-indenting a template changes nothing. After an intended markup change, regenerate with `npx vp test run -u src/render-snapshot.test.ts`, review the diff and commit the snapshot with the code.

### Coverage

`pytest.ini` enforces `--cov-fail-under=90` on the package total; `pytest tests/ --cov-report=term-missing` gives the per-file view. The card side has no gate and the provider is not a dependency. To see which branches a change left unexercised, install it for one run at the Vitest version Vite+ bundles:

```bash
V=$(npx vp toolchain vitest | grep -oE 'vitest@[0-9.]+' | head -1 | cut -d@ -f2)
npm i --no-save @vitest/coverage-v8@"$V"
npx vp test run --coverage --coverage.provider=v8 --coverage.reporter=text \
  '--coverage.include=src/**/*.ts' '--coverage.exclude=src/**/*.test.ts'
```

`--no-save` leaves `package.json` and the lockfile alone; the next `npm ci` removes the provider.

## Version sync

`manifest.json` `version` and `src/const.ts` `CARD_VERSION` must match byte for byte. `const.py` derives its value from the manifest at import, so the Python side needs no edit, and `tests/test_card_version.py` enforces the pair. Both cards read the one constant. The failure mode: a card's version check sees a mismatch, shows the reload banner, the reload re-serves the same bundle, and the banner comes back, for every user. A bump edits both files, rebuilds the bundle and commits all three together. Neither carries a `-beta` suffix: a pre-release has the final release's number and GitHub's pre-release flag. The README badge reads the latest release tag and needs no edit.

## Dependencies

| Package | Pin | Why |
|---|---|---|
| `ruff`, `mypy` | exact, `requirements_test.txt` | CI runs nightly; a floating linter turns the build red with no code change. The `rev:` in `.pre-commit-config.yaml` must match; check both tools when bumping either. |
| `pytest-homeassistant-custom-component` | `>=` floor with a `<` cap | it tracks HA core; pinning it would freeze the HA version tested against |
| `vite-plus` | exact, `package.json` | it decides what the committed bundle looks like; the `vite` override names the same version |
| `happy-dom` | exact | it decides what the DOM suites see; the siblings keep one version |
| `lit` | exact | it is inlined into the bundle, so a bump changes the committed file; bumping it on purpose keeps the bundle diff explainable |

- **Dependabot's blind spots.** It bumps the `requirements_test.txt` pin and leaves the hook `rev` alone (it is told to); it bumps `vite-plus` and leaves the override alone. The toolchain test catches the second; nothing catches the first except reading both files.
- **Runtime vs dev.** What the build inlines into the bundle is a `dependency`; a build-time tool is a `devDependency` even though the build needs it. CI's `npm audit --omit=dev` only means something because of that split.
- **Adding a dependency.** The bundle loads on every dashboard, so a new runtime dependency is discussed in an issue first; today the cards have `lit` alone. Its licence must be compatible with MIT and its notice must survive the build (`comments: { legal: true }` keeps the `@license` comments). Prefer vendoring a few constants with a provenance comment over depending on a package that exports thousands.

## Translations

Adding or changing a user-visible string means touching four files together: `strings.json`, `translations/en.json`, `translations/de.json`, and `icons.json` for a new entity. hassfest checks the keys in CI, and the German copy uses **du**, never **Sie**.

The cards' strings live in `src/localize/languages/{de,en}.json`, with `common`, `card`, `parking` and `editor` namespaces. `src/localize/localize.ts` resolves the language Home Assistant reports (the cards push it from `willUpdate`), then the browser's, then English; a key missing in the active language falls back to English, and a key missing everywhere comes back as the key itself, so a half-translated string shows up on screen rather than as a blank. `src/localize/localize.test.ts` pins that order.

## Home Assistant conventions

- Every `UpdateFailed` and `ConfigEntryAuthFailed` carries `translation_domain`, `translation_key` and placeholders; never a bare string. The coordinator turns the API's exceptions into them, and `outage.py` turns a sustained upstream failure into one Repairs issue instead of a silent setup retry.
- Icons live in `icons.json`; `_attr_icon = "mdi:…"` appears nowhere.
- Every platform module sets `PARALLEL_UPDATES = 0`.
- `api.py` imports nothing from Home Assistant or the package: it owns the endpoint, the headers, the one request and the `EControlError` hierarchy, and returns decoded bodies and nothing more. Callers pass in the session and the User-Agent, because `const.py` imports HA. `tests/test_api.py` fails on any such import. Outside `api.py`, catch `EControlError`, never `aiohttp`'s errors.
- The `User-Agent` constant goes on every outbound call and no `Accept-Encoding` is pinned (aiohttp's own offer already gets gzip). The poll floor and the per-entry and domain-wide dynamic cooldowns in `const.py` are fair use towards E-Control, whose terms allow 2,500 requests an hour: don't lower them without thinking about the multi-entry install. `tests/test_user_agent.py` covers every call site; a new HTTP call joins it.
- `unique_id` formulas are frozen: changing one wipes every existing install.
- `ATTRIBUTION` in `const.py` is the data-source statement every entity emits and both cards show in their footer; E-Control's terms require that exact line. The cards' fallback copy stays in sync with it.
- Diagnostics redact the fields in `TO_REDACT` in `diagnostics.py`: the API key, the registered domain, the coordinates and the referer. The set only grows. Test payloads are synthetic: never a real key, domain or station id, not even in a fixture.
- `const.normalize_status` and the card's `normStatus` bucket E-Control's status values the same way, and `tests/test_status_parity.py` keeps them that way; a new upstream status is added to both.

## Where things are

| Module | Owns |
|---|---|
| `api.py` | Transport to E-Control's charging-station API. HA-free. |
| `coordinator.py` | The poll per entry, the tracker-driven dynamic mode with its cooldowns, backoff, the status-change events and the dev-fixture hook. |
| `outage.py` | Sustained-outage detection across entries and the Repairs issue it raises. |
| `sensor.py`, `binary_sensor.py` | The nearest-station sensor with its station attributes; the free-slot binary sensor. |
| `config_flow.py`, `diagnostics.py`, `card_registration.py` | The setup, reconfigure, reauth and options flows, diagnostics, and the Lovelace resource registration for the bundle. |
| `src/ladestellen-austria-card.ts` | The station list card: hero, filters, pinned stations, the detail panel. |
| `src/parking-card.ts`, `src/car-svg.ts` | The parking-lot card and the car it draws into each slot. |
| `src/editor.ts`, `src/parking-editor.ts`, `src/editor-panels.ts` | The two `ha-form` editors and the groups, labels and save logic they share. |
| `src/station-logic.ts` | Station predicates and filtering: amenities, connectors, payment, opening hours, row status. |
| `src/utils.ts` | Formatters and status classification both cards call on every render. |
| `src/card-lifecycle.ts`, `src/shared-render.ts` | What both cards and both editors share: language sync, the version probe, the grid-cell height test, the stub entity; the version banner, the outage notice and the attribution footer. |
| `src/styles.ts` | The style fragments composed into both cards' styles. |
| `src/types.ts` | The card configs, the station shape and the filter option tables. |
| `src/localize/` | The cards' strings and their test. |

### Adding a card option

Add the key to the card's config interface in `src/types.ts`, its default to the card's `setConfig` and to `FORM_DEFAULTS` in that card's editor, and a field to the group's schema in the editor, with an `editor.*` label in both language packs. `card-smoke.test.ts` and `editor-panels.test.ts` fail when the editor writes a key the card doesn't read or draws a default the card doesn't apply.

## Style

- TypeScript strict; the `tsconfig.json` flags are not negotiable, and `vp check` reports no warnings (`denyWarnings`).
- Comments say why, not what; identifiers carry the what.
- The browser floor is ES2022: a copy is sorted in place rather than with `toSorted()`, and no other ES2023 built-in. Imports carry no extension; the bundler resolves them.
- Runtime dependencies are `lit` alone; adding one goes through *Dependencies*.
- Python: `pyproject.toml` is the source of truth for ruff, mypy and coverage; change rules there, never in CI flags or hook args. A rule that is noise in tests goes into `per-file-ignores`, not off.
- German copy uses du.

## Reporting issues

Open an issue with:

- your Home Assistant version and the Ladestellen Austria version
- the diagnostics download: **Settings → Devices & services → Ladestellen Austria** → ⋮ → **Download diagnostics**. The API key, the registered domain and the coordinates are redacted before the file is written.
- the steps to reproduce, and the log lines from `custom_components.ladestellen_austria`

A security problem goes through **Report a vulnerability** under the repository's **Security** tab, not a public issue.
