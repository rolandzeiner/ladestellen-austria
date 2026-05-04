# Contributing to Ladestellen Austria

## Dev setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements_test.txt pre-commit
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

`README.md` badge + `manifest.json` stay at the clean (non-beta) version; `src/const.ts` can carry a `-beta-N` suffix during development.

## Tooling & config

- `pyproject.toml` is the source of truth for ruff, mypy, and coverage rules — change them here, not in CI flags.
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
npx tsc --noEmit            # rollup's TS plugin is more permissive than tsc
npm run build
```

CI runs the same checks plus hassfest + HACS validation + the dev-fixture guard + `npm audit --omit=dev --audit-level=high`. Failing locally wastes a push.

## Reporting issues

Open an issue with:
- HA version + Ladestellen Austria version
- Diagnostics download (Settings → Devices & Services → Ladestellen Austria → Download diagnostics) — secrets are auto-redacted
- Steps to reproduce
