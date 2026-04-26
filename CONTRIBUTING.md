# Contributing to Ladestellen Austria

Thanks for taking the time to look. This file is the single answer to "how do I work on this repo?" — read it once and you'll have everything you need.

## Dev setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements_test.txt pre-commit
pre-commit install      # runs ruff + mypy + checks on every commit

npm ci                  # Lovelace card deps
npm run build           # produces custom_components/ladestellen_austria/www/ladestellen-austria-card.js
```

## Branching & releases

- Work on `dev`. PRs target `dev`.
- Releases are tagged from `main` after merging `dev → main`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

## Card-version sync

`src/const.ts` `CARD_VERSION` and `custom_components/ladestellen_austria/const.py` `CARD_VERSION` **must stay byte-identical** — `tests/test_card_version.py` enforces it. Bump both in the same commit. If they drift, users get an infinite reload-banner loop.

`README.md` badge + `manifest.json` stay at the clean (non-beta) version; `const.py` + the TS constant can carry a `-beta-N` suffix during development.

## Tooling & config

- `pyproject.toml` — source of truth for ruff (target-version, line-length), mypy (strict, ignore_missing_imports, files), and coverage config. Change rules here, not in CI flags.
- `pytest.ini` — pytest config (asyncio mode + path).
- `ATTRIBUTION` — canonical data-source statement and licence terms; matches the `attribution` attribute every sensor emits. Update when the upstream API or licence wording changes (and keep `const.ATTRIBUTION` in sync).

View per-file coverage locally:

```bash
pytest tests/ --cov --cov-report=term-missing
```

The `_dev_fixture.py` hook in `custom_components/ladestellen_austria/` is **gitignored** and a CI job (`no-dev-fixture`) hard-fails if it ever lands. Use it to inject synthetic 13-status stations during local card development; never commit it.

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
npm run build
```

CI runs the same checks plus hassfest + HACS validation + the dev-fixture guard. Failing locally wastes a push.

## Reporting issues

Open an issue with:
- HA version + Ladestellen Austria version
- Diagnostics download (Settings → Devices & Services → Ladestellen Austria → Download diagnostics) — secrets are auto-redacted
- Steps to reproduce
