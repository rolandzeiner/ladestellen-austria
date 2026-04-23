---
name: ladestellen-workflow
description: Reminds Claude of the full development workflow for the Ladestellen Austria HA integration — API-key protection, quality-scale compliance, git branching, release process, and pre-commit QA gate.
---

You are working on the **Ladestellen Austria** Home Assistant integration. Data source: https://www.ladestellen.at. Every user (including the developer) needs their own API key + domain. Follow all rules below for every change you make.

---

## Rule #0 — Protect the API key (read this first, always)

The ladestellen.at API requires a per-user `api_key` and `domain`. Both are **secrets**. They must never land in the repo, in a test fixture, in a README example, in a commit message, or in a cached file that gets pushed.

### `.gitignore` must exist before any integration code

Before you create a single integration file, `.gitignore` at the repo root must exclude at minimum:

```
secrets.json
.env
.env.*
*.secret
tests/fixtures/secrets/
dev/
```

`dev/` is where the Swagger spec (`dev/api-spec.json`) and any local scratch work live. It is never committed.

### Pre-commit secret scan (run every single time)

Before every `git add` / `git commit`, run:

```bash
git diff --cached | grep -iE 'api.?key|authorization|bearer|ladestellen\.at/[a-z0-9]{16}' || echo "clean"
```

If anything other than `clean` prints, **abort the commit**, inspect what matched, and fix it before proceeding. A hit in a documentation example is only safe if it's an obvious placeholder (`REDACTED_API_KEY`, `your-api-key-here`) — anything that looks real is treated as real.

### Staging rules

- **Never** use `git add -A` or `git add .`. Always stage files by name: `git add path/to/file1 path/to/file2`.
- Never commit `dev/`, `secrets.json`, `.env*`, or anything under `tests/fixtures/secrets/`.

### Placeholder values everywhere user-visible

In tests, fixtures, README, docstrings, commit messages, and code comments — any API key or domain is a placeholder:

- `api_key`: `REDACTED_API_KEY` or `your-api-key-here`
- `domain`: `REDACTED_DOMAIN` or `your-domain.example`

The real key and domain never appear in the repo. They live only in the running HA instance's config entry and, during development, in an untracked `secrets.json` or `.env` file.

### If the user pastes their API key into chat

Use it from conversation context only. Never write it to a tracked file. If it accidentally lands in a tracked file (even uncommitted), **stop immediately** and tell the user so they can:
1. Rotate the key upstream at ladestellen.at.
2. Purge any git history that may have captured it (`git reset` if not yet committed; history rewrite + force-push if already committed).

### `diagnostics.py` must redact `api_key` and `domain`

Use `homeassistant.components.diagnostics.async_redact_data` with `TO_REDACT = {"api_key", "domain"}` (plus any coordinate fields, same pattern as tankstellen-austria). Lat/lng redaction is a Gold-rule requirement; credential redaction is mandatory regardless.

---

## 1. Quality Scale Compliance

The integration targets **Platinum** quality scale from day one. Every code change must be checked against the current status in `custom_components/ladestellen_austria/quality_scale.yaml`.

**Official rule references:**
- Bronze rules: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/#bronze
- Silver rules: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/#silver
- Gold rules: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/#gold
- Platinum rules: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/#platinum
- Quality scale overview: https://developers.home-assistant.io/docs/core/integration-quality-scale/

### Active rules to respect on every change

**Bronze (all must stay `done` or `exempt`):**
- `appropriate-polling` — coordinator uses configurable scan interval
- `config-flow` — full UI config flow required; collects `api_key` + `domain`
- `config-flow-test-coverage` — config flow tests must pass
- `entity-unique-id` — all entities have stable unique IDs
- `has-entity-name` — `_attr_has_entity_name = True` on all entities
- `runtime-data` — coordinator stored in `entry.runtime_data`
- `source-code-standards` — follow HA coding standards, use `from __future__ import annotations`
- `test-before-configure` — config flow tests API (with supplied key/domain) before creating entry
- `test-before-setup` — `async_config_entry_first_refresh` raises `ConfigEntryNotReady` on failure
- `unique-config-entry` — no duplicate entries allowed (unique_id based on domain + location/radius)

**Silver (all must stay `done` or `exempt`):**
- `config-entry-unloading` — `async_unload_entry` must work cleanly; all listeners/tasks cancelled in `async_teardown`
- `entity-unavailable` — sensors go unavailable when coordinator fails (CoordinatorEntity handles this)
- `log-when-unavailable` — log warning on first failure, info when back online
- `parallel-updates` — `PARALLEL_UPDATES = 0` set in sensor.py
- `reauth-flow` — `async_step_reauth` + `async_step_reauth_confirm` triggered on 401/403 from API
- `test-coverage` — every new coordinator/sensor behaviour needs a test; update the `comment` in quality_scale.yaml when adding tests

**Gold (all must stay `done` or `exempt`):**
- `devices` — `DeviceInfo` on entities + explicit `dr.async_get_or_create` in `__init__.py`
- `diagnostics` — `diagnostics.py` with `async_redact_data` for `api_key`, `domain`, lat/lng
- `docs-data-update` / `docs-examples` / `docs-known-limitations` / `docs-supported-functions` / `docs-troubleshooting` / `docs-use-cases` — README sections must stay populated
- `entity-translations` — entity names come from `translation_key` + `strings.json` / `translations/*.json`
- `exception-translations` — every `UpdateFailed` raise uses `translation_domain=DOMAIN, translation_key=..., translation_placeholders={...}`
- `icon-translations` — `icons.json` (no `_attr_icon` hardcodes)
- `reconfiguration-flow` — `async_step_reconfigure` in `config_flow.py`
- `repair-issues` — for recoverable failures (e.g. stale/invalid API key), raise/clear an `issue_registry` issue keyed by `entry_id`

**Platinum (all must stay `done` or `exempt`):**
- `async-dependency` — only `aiohttp`; no blocking HTTP
- `inject-websession` — `async_get_clientsession(hass)` everywhere
- `strict-typing` — `py.typed` marker present; CI runs `mypy --strict`

### Gold/Platinum guardrails (don't regress)

- Any new `UpdateFailed(...)` must use `translation_domain=DOMAIN, translation_key=..., translation_placeholders={...}`. Bare-string raises break `exception-translations`.
- Adding a new entity type? Touch **four files at once**: `strings.json`, `translations/en.json`, `translations/de.json`, `icons.json`. Missing one is silent but breaks translation/icon rules.
- `_attr_icon = "mdi:..."` hardcodes are forbidden — use `icons.json` under `entity.sensor.<translation_key>.default`.
- Config-schema restructures require bumping `ConfigEntry.VERSION` + adding `async_migrate_entry` in the same PR.
- `unique_id` formulas (entry + entity) are **frozen from the first release** — changing them wipes every existing install. Decide the format carefully before v1.0.0.
- `mypy --strict` runs in CI. Fix type errors; don't widen annotations.
- `api_key` and `domain` must be redacted in `diagnostics.py` (see Rule #0).

### After any code change:
1. Check if the change affects any quality scale rule.
2. If a new behaviour is added (especially in `coordinator.py` or `sensor.py`), add tests in `tests/test_coordinator.py` or `tests/test_sensor.py`.
3. Update `quality_scale.yaml` comments if test coverage changes.
4. Run `python3 -m pytest tests/ -v` — all tests must pass before committing.
5. Run `mypy --strict --ignore-missing-imports custom_components/ladestellen_austria` — must be clean.
6. Run `ruff check .` — must be clean.

---

## 2. README.md Conformance

Before every commit, verify that `README.md` still matches reality:

- **Features list** — any user-visible capability added or changed in this session must be documented. Extend an existing bullet or add a new one, tagged `*(x.y.z)*` with the release it was introduced in (the clean version, not the beta).
- **Requirements** section — the "Home Assistant X.Y or newer" line must match `hacs.json` `homeassistant` and the `HA min version` badge in the header.
- **Version badge** (`version-x.y.z-blue.svg`) must match `manifest.json` `version` (always the clean version — never a beta).
- **Installation / Setup** — if the config flow gains or loses a step/field (including `api_key` / `domain`), the numbered steps must reflect it. Example values must use `your-api-key-here` / `your-domain.example`, never real credentials.
- **Historical version markers** (e.g. `*(1.0.0)*` on old bullets) are frozen — never rewrite them, only the bullet that describes the change you just made.

Bug fixes generally do not require README updates — only update if the fix changes documented behaviour. Refactors never require README updates.

---

## 3. Dev Push Workflow (live HA instance)

For fast iteration without git commits, the integration can be pushed directly to the live HA container over SSH.

- **Script:** `scripts/dev-push.sh` — rsyncs `custom_components/ladestellen_austria/` to `rpi25:/home/rolandzeiner/docker/configuration/custom_components/ladestellen_austria/`
- **Invocation:**
  - `./scripts/dev-push.sh` — push, verbose
  - `./scripts/dev-push.sh --quiet` — used by the Edit/Write hook
  - `./scripts/dev-push.sh --dry-run` — preview without writing
- **Python changes:** script does not auto-restart HA. After pushing, restart the HA container manually (Developer Tools → YAML → Restart, or `docker restart homeassistant` on `rpi25`).
- **When to stop using it:** the dev push is for iteration only. Always still commit/push to `dev` and recreate the beta release when the change is ready to share — the live container is a convenience, not the source of truth.
- **Never rsync `dev/` or `secrets.json`.** The script's exclude list must include `dev/`, `secrets.json`, `.env*`, `__pycache__`, `*.pyc`, `.DS_Store`. Uses `--delete` so the remote folder mirrors local; do not hand-edit files on the remote.

---

## 4. Git Workflow

- **All development happens on the `dev` branch** — never commit directly to `main`.
- Always confirm current branch with `git branch --show-current` before committing.
- If the push is rejected (non-fast-forward), use `git pull --rebase origin dev` then push again.
- Do not use `--no-verify` or force push to `main`.
- **Never** use `git add -A` / `git add .`. Stage files by name (Rule #0).
- Run the Rule #0 secret scan before every commit.

### Commit message style

```
type: short description

- bullet explaining what changed and why
- another bullet if needed
```

Types: `feat`, `fix`, `test`, `chore`, `refactor`

**No Claude co-author trailer.** Commits in this repo are authored solely by the human developer — do not append `Co-Authored-By: Claude ...` lines. This rule overrides the default Claude Code commit template.

---

## 5. Release Workflow

### Pre-release (beta)

Before tagging, run the full local verification:

```bash
python3 -m pytest tests/ -v
mypy --strict --ignore-missing-imports custom_components/ladestellen_austria
ruff check .
```

All three must be clean. Then:

```bash
# Stage by name, scan for secrets, commit, push
git diff --cached | grep -iE 'api.?key|authorization|bearer|ladestellen\.at/[a-z0-9]{16}' || echo "clean"
git add <files>
git commit -m "..."
git push origin dev

# Create pre-release from dev branch
gh release create v1.0.0-beta-N \
  --repo rolandzeiner/ladestellen-austria \
  --target dev \
  --title "v1.0.0-beta-N" \
  --prerelease \
  --notes "..."
```

- Name pre-releases: `v{major}.{minor}.{patch}-beta-{N}` (incrementing N).
- To hide a beta: `gh release edit vX.Y.Z-beta-N --repo rolandzeiner/ladestellen-austria --draft`.
- To delete and recreate: `gh release delete vX.Y.Z-beta-N --yes` then delete the remote tag with `git push origin :refs/tags/vX.Y.Z-beta-N`.

### Official release

```bash
# Merge dev → main via PR
gh pr create --base main --head dev --title "Release vX.Y.Z" ...

# Create release from main
gh release create vX.Y.Z \
  --repo rolandzeiner/ladestellen-austria \
  --target main \
  --title "vX.Y.Z" \
  --notes "..."
```

Official releases are **not** pre-releases and target `main`, not `dev`.

---

## Pre-commit checklist

- [ ] **Rule #0 secret scan ran and printed `clean`**
- [ ] Files staged by name (no `git add -A` / `git add .`)
- [ ] Tests pass: `python3 -m pytest tests/ -v`
- [ ] `mypy --strict --ignore-missing-imports custom_components/ladestellen_austria` is clean
- [ ] `ruff check .` is clean
- [ ] Quality scale rules still satisfied; `quality_scale.yaml` updated if needed (Bronze + Silver + Gold + Platinum)
- [ ] New `UpdateFailed` raises use `translation_key` (not bare strings)
- [ ] New entity types have matching entries in `strings.json`, `translations/en.json`, `translations/de.json`, and `icons.json`
- [ ] `diagnostics.py` still redacts `api_key`, `domain`, and lat/lng
- [ ] README.md reflects current features, requirements, and version (see section 2)
- [ ] On `dev` branch
- [ ] Commit message has no Claude co-author trailer

---

## Sections added later

The following sections will be appended to this skill when the corresponding feature lands:

- **CARD_VERSION / version files / embedded Lovelace card rules** — added in step 5 of the initial kickoff, once the Lit 3 + Rollup card ships. Until then, version bumps only touch `manifest.json` + README badge.
