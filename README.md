# Ladestellen Austria

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![HA min version](https://img.shields.io/badge/Home%20Assistant-%3E%3D2025.1-blue.svg)](https://www.home-assistant.io/)
[![Version](https://img.shields.io/badge/version-0.2.1-blue.svg)](https://github.com/rolandzeiner/ladestellen-austria/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![vibe-coded](https://img.shields.io/badge/vibe-coded-ff69b4?logo=musicbrainz&logoColor=white)](https://en.wikipedia.org/wiki/Vibe_coding)

Home Assistant custom integration for the Austrian EV charging station directory (*Ladestellenverzeichnis*), powered by **E-Control Austria's** official API.

> Status: pre-release, targeting Platinum quality scale from v0.2.0.

## Features

- Nearest charging stations for any point in Austria, pulled from the official E-Control *Ladestellenverzeichnis*.
- Single sensor per config entry exposing the distance to the nearest station in km; the full station list (label, address, connectors, power, status, operator, price URL) is available as attributes.
- Bilingual config flow (English + German) with pre-filled external-URL referer domain and HA-home coordinates.
- Reauth flow when the API rejects stored credentials.
- Reconfiguration flow to change credentials, location, or polling interval without losing entity history.
- Strict-typed, async-only. *(0.2.0)*
- **Dynamic location mode** *(0.2.0)* — optionally point the config entry at a `device_tracker` (e.g. your phone via the HA companion app) and the nearby-stations list follows your live GPS instead of a fixed address. Rate-limited to protect the upstream API: 1.5 km movement threshold, 10-min per-entry cooldown, 5-min domain-wide cooldown. Pinning is disabled in dynamic mode since the list changes as you move.
- **WCAG 2.2 A+AA accessibility** *(0.2.1)* — both cards and their visual editors now pass the WCAG 2.2 A+AA baseline. Status dots carry three independent cues (colour + halo/ring geometry + fill-vs-hollow shape) so grayscale and colour-blind users can disambiguate live availability; editor form controls have explicit label associations; invalid entity selections render an accessible error alert; text font-sizes switched to `rem` so user text-size overrides scale proportionally.

## Requirements

- Home Assistant **2025.1** or newer.
- An **API key + domain** registered at [ladestellen.at](https://www.ladestellen.at/). Registration is free.
- An accessible Home Assistant external URL whose hostname matches the domain registered at ladestellen.at — the API checks the HTTP `Referer` header against the registered domain list.

## Installation

### HACS (recommended)

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=rolandzeiner&repository=ladestellen-austria&category=integration)

1. Open HACS → *Integrations* → *⋮ → Custom repositories*.
2. Add `https://github.com/rolandzeiner/ladestellen-austria` with category *Integration*.
3. Install **Ladestellen Austria** and restart Home Assistant.

### Manually

1. Copy `custom_components/ladestellen_austria/` into your HA `config/custom_components/` folder.
2. Restart Home Assistant.

## Setup

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ladestellen_austria)

1. Register for an API key at [ladestellen.at](https://www.ladestellen.at/). During signup enter the **bare hostname** of your Home Assistant external URL (no protocol, no port, no path) — e.g. `www.example.com` — as your authorized referer domain.
2. In HA: *Settings → Devices & services → Add integration → Ladestellen Austria*.
3. Fill in:
   - **API key** — from your ladestellen.at account.
   - **Registered domain** — pre-filled from `hass.config.external_url`; must exactly match what you registered in step 1.
   - **Location** — pre-filled with your HA home coordinates; adjust via the map picker if you want a different search origin.
   - **Update interval** — defaults to 10 minutes.
   - **Dynamic location tracker** *(optional)* — pick a `device_tracker` to follow live GPS instead of the fixed location above. See [Dynamic location mode](#dynamic-location-mode).
4. Submit. The integration performs a trial `/search` call to confirm both the key and the domain are accepted before creating the entry.

### Dynamic location mode

Optional. If you set the **Dynamic location tracker** field to a `device_tracker` entity (typically `device_tracker.<your_phone>` from the HA companion app), the coordinator uses the tracker's live GPS coordinates on every refresh instead of the fixed *Location* field above. Refreshes are triggered by tracker movement, not the scan interval, and are rate-limited so a phone that reports every few seconds doesn't hammer E-Control:

- **Distance threshold:** 1.5 km — moves below that (GPS jitter, walking inside a parking lot) are ignored.
- **Per-entry cooldown:** 10 minutes — the same entry won't refresh twice within that window even if you cross the distance threshold.
- **Domain-wide cooldown:** 5 minutes — two entries sharing the same tracker won't both fire on the same state change.
- **Fallback timer:** 6 hours — if the device never moves, a refresh still runs on this safety interval.

When dynamic mode is active, the main card hides its pinned-stations section (pins are preserved in the config for when you switch back to static mode) and shows a small *Tracking: device_tracker.…* indicator under the hero. The initial *Location* field you entered at setup time becomes a fallback — used when the tracker has no coordinates (e.g. phone off / companion-app permissions revoked), at which point the integration also raises a Repairs issue.

## Lovelace Cards

The integration ships two custom cards in a single bundle. Both auto-register as a Lovelace resource on HA start — no manual resource registration. Add either via the visual "Add card" picker.

### Main card — `ladestellen-austria-card`

Distance-to-nearest hero + an expandable list of nearby stations. Each station row carries kW + connector chips + distance pill + live-availability dot; tapping a row reveals opening hours, a per-point rack view (DC/AC badge, kW, connector, status, wrench for out-of-order points), payment methods, start/blocking fees, and address. Supports filters (only-available, only-free, only-open, connector types, amenities, payment methods) and pinned stations. When the sensor is in *Dynamic location mode* the pin list is automatically hidden.

Required by §3c/§3d of the ToU, the card always shows the E-Control logo-link and the *Datenquelle: E-Control* attribution footer — these cannot be hidden.

### Parking card — `ladestellen-austria-parking-card`

Single-station focus. Each point of the chosen station renders as a parking slot viewed from above, with painted-lane separators and a dark asphalt surface. AVAILABLE points pop with a success-tinted glow; busy / out-of-order / unknown points are desaturated and muted so the "where can I plug in right now" read is instant. Minimalistic by design — a dashboard-tile companion to the main list card.

## Entities

| Entity | State | Attributes |
|---|---|---|
| `sensor.<entry_name>_nearest_station` | Distance to the nearest station (km) | `station_count`, `stations[]` (each with id, label, address, distance, status, connectors, pricing URL) |

Icon: `mdi:ev-station`. Device-class: `distance`. State-class: `measurement`.

## Configuration parameters

| Field | Required | Default | Notes |
|---|---|---|---|
| `name` | yes | `Ladestellen Austria` | Entry title; becomes the device name. |
| `api_key` | yes | — | From ladestellen.at. Stored as a secret; redacted in diagnostics. |
| `domain` | yes | HA external URL hostname | Bare hostname, no protocol. Stored as a secret; redacted in diagnostics. |
| `location` | yes | HA home coordinates | Map picker. Latitude + longitude sent to `/search`. In dynamic mode this becomes a fallback — used when the tracker has no coordinates. |
| `scan_interval` | no | `10` | Minutes between upstream refreshes (5–720). Ignored in dynamic mode; a 6-hour safety-net timer is used instead. |
| `dynamic_entity` | no | *(empty)* | Optional `device_tracker` entity. When set, the entry runs in dynamic mode (see *Setup → Dynamic location mode*). |

## Use cases

- **Range anxiety dashboards** — display the distance to the nearest fast charger on a glance card.
- **Trip planning automations** — trigger routines when arriving in a region with specific connector types available.
- **EV-ready-home** scenes — flip a scene to "on the road" when the nearest station reports ACTIVE status while you're away from home.

## Examples

```yaml
# Template sensor: count of fast chargers within range
template:
  - sensor:
      - name: "Fast chargers nearby"
        state: >
          {{ state_attr('sensor.ladestellen_austria_nearest_station', 'stations')
             | selectattr('greenEnergy', 'eq', true) | list | count }}
```

## Supported functions

- Nearest charging station lookup (`GET /search`).
- Reauth on 401/403.
- Diagnostics export with redacted credentials.
- Repairs issues for recoverable degraded conditions.

## Data update

The integration polls `GET /search?latitude=…&longitude=…` every **10 minutes** by default. Station metadata rarely changes, but the `stationStatus` field (ACTIVE/INACTIVE) can flip during outages. Polling less often (e.g. 30–60 minutes) is safe; polling faster than 5 minutes is rate-limited by the E-Control gateway.

## Known limitations

- Only returns nearest-N stations sorted by distance; no radius-based query (the upstream API doesn't expose one). Truncated client-side to 10 stations.
- No live per-connector occupancy. The DATEX II status feed is not yet wired up — it's on the v0.2 roadmap.
- E-Control's API enforces a `Referer` header match. Home Assistant running on a bare IP or `homeassistant.local` cannot be used — you need a registered domain.

## Troubleshooting

- **`invalid_auth` / HTTP 401**: API key was rotated or disabled at ladestellen.at.
- **`domain_mismatch` / HTTP 403**: the hostname in HA's Referer header doesn't match any domain registered for your key. Either update your external URL, reconfigure the integration with the correct domain, or add the HA domain at ladestellen.at.
- **`cannot_connect`**: DNS/network issue reaching `api.e-control.at`.
- For deeper debugging, download *Diagnostics* from the integration's three-dot menu — secrets are redacted automatically.

## Removal

1. *Settings → Devices & services → Ladestellen Austria → ⋮ → Delete*.
2. In HACS, click *Remove* on the integration card.
3. Optionally revoke your API key at ladestellen.at.

## Development

### Lovelace cards

The two custom cards (`ladestellen-austria-card` + `ladestellen-austria-parking-card`) are written in TypeScript with Lit 3 and bundled by Rollup into a single `custom_components/ladestellen_austria/www/ladestellen-austria-card.js`. End users install via HACS and never run `npm`; contributors do:

```bash
npm install
npm run build       # production bundle (terser-minified)
npm run dev         # watch mode for iteration
```

`src/const.ts` and `custom_components/ladestellen_austria/const.py` both carry `CARD_VERSION` — they must stay byte-identical, or the frontend version check shows an infinite reload banner. Bump both together when releasing.

### Python

```bash
ruff check .
mypy --strict --ignore-missing-imports custom_components/ladestellen_austria
python3 -m pytest tests/ -v
```

All three must be clean before committing. Config-flow changes are covered by `tests/test_config_flow.py`; coordinator + dynamic-mode behaviour by `tests/test_coordinator.py`.

## Attribution

Charging-station data is served by the official Austrian *Ladestellenverzeichnis* at [api.e-control.at](https://api.e-control.at), operated by [E-Control Austria](https://www.e-control.at/) (the federal energy regulator), an initiative of the [BMK (Federal Ministry for Climate Action)](https://www.bmk.gv.at/). The dataset is catalogued on [data.gv.at](https://www.data.gv.at/katalog/dataset/e-control-ladestellenverzeichnis-api).

Every sensor shipped by this integration carries the attribution string *"Datenquelle: E-Control"*, required verbatim by §3d of the [ladestellen.at Nutzungsbedingungen](https://admin.ladestellen.at/#/api/terms-of-use).

Problems with the upstream data or API? Contact `support@ladestellen.at` (API issues) or `office@e-control.at` (general). Bugs in *this* integration — open an issue on GitHub instead.

## Terms of Use — integration compliance

Registering an API key at [admin.ladestellen.at](https://admin.ladestellen.at/#/api/registrieren) binds you to a contract with E-Control (the [full ToU is here](https://admin.ladestellen.at/#/api/terms-of-use); violations carry a €10,000 contract penalty under §9). Read it before you deploy — the obligations you accept at signup (notifications, public-facing disclaimer, quarterly stats, no ad/sponsor integration, etc.) are yours, not the integration's.

What this integration does automatically to keep you on the right side of the technical clauses:

- **§3c — E-Control logo:** both Lovelace cards render the official E-Control logo as a clickable link to `https://www.e-control.at/`. The link is a hard requirement of the card layout and can't be hidden.
- **§3d — Attribution:** every sensor carries `attribution = "Datenquelle: E-Control"` (verbatim); the cards repeat the string in their footer. The wording is frozen — the card falls back to the hard-coded string even if a template sensor strips the attribute.
- **§3i — No data mutation:** values flow through the coordinator unchanged. Precision, language, and formatting are preserved as received.
- **§3j — API key confidentiality:** the key is stored as a password field, never logged, and redacted in diagnostics exports.
- **§4 — Rate limits (2,500 req/hour per user):** the default 10-minute polling interval leaves comfortable headroom even with dozens of entries; the minimum configurable interval is 5 minutes. Dynamic-tracker mode adds a 1.5 km distance threshold, 10-min per-entry cooldown, and 5-min domain-wide cooldown on top.
- **§7 — No bulk redistribution:** the integration has no export feature and doesn't re-serve the dataset over a separate API.

## License

MIT – see [LICENSE](LICENSE)

## Disclaimer

This integration is not affiliated with or endorsed by E-Control Austria, the BMK, or the operators of ladestellen.at. All charging-station data is provided by the [E-Control Ladestellenverzeichnis API](https://www.ladestellen.at/) under the [official Terms of Use](https://admin.ladestellen.at/#/api/terms-of-use). The developer assumes no liability for the accuracy, completeness, or timeliness of the displayed data. Use at your own risk.

---

Diese Integration steht in keiner Verbindung zur E-Control Austria, dem BMK oder den Betreibern von ladestellen.at und wird von diesen nicht unterstützt. Alle Ladestellen-Daten stammen vom [E-Control-Ladestellenverzeichnis](https://www.ladestellen.at/) und unterliegen den [offiziellen Nutzungsbedingungen](https://admin.ladestellen.at/#/api/terms-of-use). Für die Richtigkeit, Vollständigkeit und Aktualität der angezeigten Daten wird keine Haftung übernommen. Nutzung auf eigene Verantwortung.
