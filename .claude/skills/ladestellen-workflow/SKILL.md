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

## Rule #1 — API usage compliance

The ladestellen.at API is free but **strictly contractual**. The end user accepted a binding Nutzungsbedingungen at registration that carries a €10,000 contract penalty for violations (§9). Every design decision here must respect those terms.

### The authoritative source

Full ToU text baked into the admin.ladestellen.at Angular bundle and rendered at https://admin.ladestellen.at/#/api/terms-of-use. Verbatim copy cached locally at `dev/terms-of-use.txt` (gitignored). Retrieved 2026-04-23. If the upstream changes the ToU, re-extract by downloading `main.*.js` from admin.ladestellen.at and grepping for the `app-terms-of-use` component.

**Title:** *Nutzungsbedingungen für die 3. Nutzer-Schnittstelle (API) des E-Control Ladestellenverzeichnisses*
**Publisher:** Energie-Control Austria (E-Control), Rudolfsplatz 13a, 1010 Wien. Regulator of the Austrian electricity and gas markets.
**Governing law:** Austrian law; exclusive venue Wien (§11).
**Duration:** Indefinite; E-Control can revoke with 3 months' notice without cause (§10).
**Cost:** Free (§6 — *"unentgeltlich"*).

### Binding clauses that drive integration design

**§3d — Exact attribution string (verbatim):**
> *"Der Nutzer muss die Datenquelle unmittelbar bei den von der E-Control angezeigten Daten durch folgenden Verweis anführen: **Datenquelle: E-Control**."*

This is the ONLY attribution string allowed. Do not substitute — "Data: E-Control Austria" / "Source: ladestellen.at" / etc. would be non-compliant. Applied as `_attr_attribution = "Datenquelle: E-Control"` on every entity.

**§3c — E-Control logo required:**
> *"Das von der E-Control vorgegebene Logo (Beilage) als Bild-Link beim Nutzer-Service anzuzeigen. Der Bild-Link muss auf die URL www.e-control.at verweisen."*

HA entity attributes can't render images. This is a Lovelace-card concern (Step 5): the card MUST display the E-Control logo as a clickable image link pointing to `https://www.e-control.at/`. Official logos at https://www.e-control.at/presse/pressebilder.

**§3i — No data modification:**
> *"die von der E-Control übermittelten Daten in irgendeiner Weise zu verändern. Alle übernommenen Werte und Informationen sind so darzustellen, wie Sie von der API übermittelt werden."*

Display values verbatim. Filtering (truncating to nearest-N) and sorting (by distance) are display-layer choices that preserve values — defensible. But **never transform, round, reformat, or re-unit the API's scalar values** (e.g. don't convert kW to W, don't round distances, don't localise station labels). The coordinator's `_async_update_data` passes values through unchanged; keep it that way.

**§3j — API key is a secret:**
> *"die Zugangsdaten zur API an Dritte weiterzugeben"* (prohibited)

Matches Rule #0. Both rules reinforce each other.

**§3k — No third-party / advertiser / sponsor integration:**
> *"eine direkte Verbindung zu Dritten, Werbepartnern oder Sponsoren herzustellen"* (prohibited)

No analytics SDKs, no ad pixels, no sponsor links in the card, no outbound beacons. Integration + card stay standalone.

**§3l — Don't charge visitors:**
> *"von Besuchern einer Website […] eine Abgeltung jedweder Form für die von der E-Control bezogenen Informationen zu verlangen"* (prohibited)

The integration is MIT-licensed and free; fine. Any fork that monetises access to this data violates the ToU.

**§4 — Rate limits (first time documented):**
- **30 concurrent requests, pooled across ALL E-Control API users globally** (Fair Use, not per-user).
- **2,500 requests per hour per user** (hard ceiling).
- E-Control may cut access without warning on violation.

Our 10-min default polling = 6 req/hour per entry. Even 100 entries at 5-min polling = 1,200 req/hour — still safely under 2,500. The integration is naturally compliant; no special back-off logic needed. **If an HTTP 429 is ever observed: back off, raise a repair issue, tighten the scan-interval floor in the schema.**

**§7 — Database copyright:**
> *"Das Datenbankurheberrecht am Ladestellenverzeichnis liegt ausschließlich bei der E-Control. […] Eine Weitergabe der Informationen an Dritte in anderer, als in diesen Nutzungsbedingungen bestimmten Form, ist nicht gestattet. Insbesondere ist die Weitergabe der gesammelten Daten zB als Datei oder das Weitervermitteln als Webservice nicht gestattet."*

Don't ship bulk-export features. Don't add a feature that writes the full dataset to disk. Don't add a REST endpoint that re-exposes the corpus. A single user's HA exposing its own entity state via HA's own API to their own automations is personal use — fine. Publishing their HA publicly with this data is a user-side question covered by §3a/§3b notifications.

**§9 — €10,000 contract penalty** (damage- and fault-independent) for any violation of §1–5. This is why every clause above matters.

### Binding clauses that hit the END USER, not us

These are obligations the HA owner accepted at registration. The integration must inform them in the README, but can't enforce or automate them:

- **§3a** — notify `support@ladestellen.at` before going productive.
- **§3b** — disclose public URL/IP of the Nutzer-Service to E-Control.
- **§3e** — display the prescribed liability disclaimer (full text in `dev/terms-of-use.txt`) prominently next to the data or attribution.
- **§3f** — notify on discontinuation (temporary or permanent).
- **§3g** — submit quarterly access statistics (Unique-Visits + Unique-Visitors) to `support@ladestellen.at`.
- **§3h** — public-facing HA instances need their own liability disclaimer.
- **§5** — no technical support from E-Control.

README "User obligations" section enumerates these. Do not delete.

### Rules we apply by default

1. **Identify every outbound request.** `const.USER_AGENT = f"HomeAssistant/{_HA_VERSION} {DOMAIN}/{INTEGRATION_VERSION}"`. Canonical format — already implemented.

2. **Respect the rate ceilings.** 10-min default poll interval, 5-min floor, 12-hour ceiling (5–720 min). Safe margins under the 2,500/hour limit even at 100+ entries. Raise the floor to 10 min if a 429 is ever reported.

3. **Attribute the data source with the verbatim string.** `_attr_attribution = "Datenquelle: E-Control"` on every entity. Must match §3d character-for-character.

4. **Ship the E-Control logo in the Lovelace card.** §3c compliance happens in the card. Card's header MUST include the logo as a clickable link to `https://www.e-control.at/`.

5. **Cache what you fetch.** `CoordinatorEntity` is the only read path. Side-channel fetches bypass HA's rate governance.

6. **Don't mutate values.** Pass API fields through to entity state unchanged. Preserve types, units, language, and formatting as received.

7. **No third-party integrations in card or coordinator.** No analytics, no ad pixels, no CDN beacons outside E-Control itself. §3k.

8. **Don't bulk-redistribute.** No bulk-export feature. No feature that writes the full dataset to a file. §7.

9. **Respect the Referer-match.** Never strip or fake the Referer header. Reauth flow exposes the correct path for the user to fix.

10. **Route upstream problems to the right inbox.** Data/API issues → `support@ladestellen.at`. Integration bugs → our GitHub. Never open GitHub issues upstream on the user's behalf.

11. **README must enumerate user obligations.** The "User obligations under the ladestellen.at Terms of Use" section is part of the compliance contract; removing it is a regression.

### Before the first non-beta release (v1.0.0)

- [ ] Lovelace card (Step 5) displays the E-Control logo-link prominently — this is legally required by §3c before any end user can publish a dashboard.
- [ ] README §3e liability disclaimer text is present in full. (Current stub; expand before v1.0.0.)
- [ ] Replace the placeholder `REGISTRATION_URL` constant with https://admin.ladestellen.at/#/api/registrieren (the real registration deep-link — now confirmed from the Angular routes).
- [ ] When issue tracker surfaces any 429 reports, raise the scan-interval floor in the config-flow schema from 5 to 10 minutes.

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
