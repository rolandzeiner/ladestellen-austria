# Ladestellen Austria

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![HA min version](https://img.shields.io/badge/Home%20Assistant-%3E%3D2025.1-blue.svg)](https://www.home-assistant.io/)
[![Version](https://img.shields.io/badge/version-0.2.2-blue.svg)](https://github.com/rolandzeiner/ladestellen-austria/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![vibe-coded](https://img.shields.io/badge/vibe-coded-ff69b4?logo=musicbrainz&logoColor=white)](https://en.wikipedia.org/wiki/Vibe_coding)

Home Assistant custom integration for the Austrian EV charging station directory (*Ladestellenverzeichnis*), powered by **E-Control Austria's** official API. Targets the Platinum tier of the HA Quality Scale.

## Features

- Distance-to-nearest-station sensor + full nearby list (label, address, connectors, power, live status, operator, pricing) as state attributes.
- Bilingual config flow (EN/DE), with reauth and reconfigure flows.
- **Dynamic location mode** — point the entry at a `device_tracker` and the search origin follows live GPS, with rate-limit guards (see [Dynamic location mode](#dynamic-location-mode)).
- **Two Lovelace cards** — a list view (kW-led tile rows, expandable per-station detail) and a parking-lot view (top-down vector cars on occupied spots, wrench overlay on out-of-order, hover or tap reveals the slot's spec).
- WCAG 2.2 A+AA accessibility across both cards and editors.
- Strict-typed, async-only.

## Requirements

- Home Assistant **2025.1** or newer.
- An **API key + domain** registered (free) at [ladestellen.at](https://www.ladestellen.at/).
- An accessible HA external URL whose hostname matches the registered domain — the API enforces a `Referer` header check.

## Installation

### HACS (recommended)

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=rolandzeiner&repository=ladestellen-austria&category=integration)

1. HACS → *Integrations* → *⋮ → Custom repositories*.
2. Add `https://github.com/rolandzeiner/ladestellen-austria` as category *Integration*.
3. Install **Ladestellen Austria** and restart Home Assistant.

### Manually

Copy `custom_components/ladestellen_austria/` into `config/custom_components/` and restart HA.

## Setup

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ladestellen_austria)

1. Register an API key at [ladestellen.at](https://www.ladestellen.at/). Enter the **bare hostname** of your HA external URL (no protocol, no port, no path) — e.g. `www.example.com` — as your authorized referer domain.
2. *Settings → Devices & services → Add integration → Ladestellen Austria*. Fields are described in [Configuration parameters](#configuration-parameters).
3. The integration probes `/search` once before creating the entry to confirm both key and domain are accepted.

### Dynamic location mode

Set the **Dynamic location tracker** field to a `device_tracker` (e.g. `device_tracker.<your_phone>` from the HA companion app) and refreshes follow live GPS instead of the fixed *Location*. Rate-limit guards: 1.5 km movement threshold, 10-min per-entry cooldown, 5-min domain-wide cooldown, 6-hour fallback timer if the device never moves. The pinned-stations list hides in dynamic mode (the list shifts as you move). When the tracker has no coordinates (phone off, permission revoked), the static *Location* is used as a fallback and the integration raises a Repairs issue.

## Lovelace Cards

Both cards ship in a single bundle and auto-register as a Lovelace resource — add either via the visual *Add card* picker.

### Main card — `ladestellen-austria-card`

Header icon-tile + a distance-to-nearest hero, then an expandable list of nearby stations. Each row leads with bold kW (DC fast-charge in amber) and price (free in green) plus connector chips and a halo status dot; station name + city + distance sit below as a subtitle, with a circular Maps button on the right. Tapping a row reveals opening hours, a per-point rack (DC/AC, kW, connector, status, wrench for out-of-order), payment + amenity chips, fees, and address — with a filled *Open in Maps* CTA. Filters: only-available, only-free, only-open, connector types, amenities, payment methods. Pinned stations bypass filters; the pin list hides in dynamic mode.

### Parking card — `ladestellen-austria-parking-card`

Single-station, top-down view: dark asphalt, sharp-cornered slots separated by solid white painted lane-lines, a free / total counter pinned to the header. Free spots glow green; charging / occupied / reserved / blocked spots show a top-down vector car (deterministic per-EVSE colour by default, or theme accent / single picked colour); out-of-order / empty / planned / removed / unknown spots show a tone-tinted MDI overlay (wrench, battery-off, progress-wrench, close-circle, help-circle) keyed to the upstream status, with a state-coloured radial-glow background — orange for faults / empty, blue for planned, red for removed. Hover or tap fades the overlay to reveal the slot's spec. Slots render in the operator-issued EVSE-ID order. Editor exposes a free-count toggle, a car-colour mode picker, and the same logo-adapt-to-theme switch the main card has.

Both cards always show the E-Control logo-link and *Datenquelle: E-Control* attribution footer (§3c/§3d) — these cannot be hidden.

## Entities

| Entity | State | Attributes |
|---|---|---|
| `sensor.<entry_name>_nearest_station` | Distance to the nearest station (km) | `station_count`, `stations[]` (id, label, address, distance, status, points, connectors, pricing), `live_status_available`, `dynamic_mode`, `dynamic_entity` |
| `binary_sensor.<entry_name>_has_free_slot` | `on` if any EVSE in range reports `AVAILABLE` | `free_slot_count`, `total_slot_count`, `stations_with_free` |

Icons: `mdi:ev-station` / `mdi:ev-plug-type2`. Sensor device-class: `distance` (state-class: `measurement`). Binary-sensor device-class: `presence`.

## Events

The integration fires `ladestellen_austria_slot_status_changed` on the HA bus whenever a single EVSE's status changes between two successful refreshes — skipped on first refresh, on no-change, and on slots that appear or disappear from the result list. Payload: `entry_id`, `station_id`, `station_label`, `station_distance`, `evse_id`, `old_status`, `new_status`.

```yaml
# Notify when any nearby slot transitions to AVAILABLE
trigger:
  - platform: event
    event_type: ladestellen_austria_slot_status_changed
    event_data:
      new_status: AVAILABLE
```

## Configuration parameters

| Field | Required | Default | Notes |
|---|---|---|---|
| `name` | yes | `Ladestellen Austria` | Entry title; becomes the device name. |
| `api_key` | yes | — | From ladestellen.at. Stored as a secret; redacted in diagnostics. |
| `domain` | yes | HA external URL hostname | Bare hostname, no protocol. Stored as a secret; redacted in diagnostics. |
| `location` | yes | HA home coordinates | Map picker. In dynamic mode this is the fallback when the tracker has no coords. |
| `scan_interval` | no | `10` | Minutes (5–720) between refreshes. Ignored in dynamic mode. |
| `dynamic_entity` | no | *(empty)* | `device_tracker` entity. See [Dynamic location mode](#dynamic-location-mode). |

## Use cases

- Range-anxiety dashboards — distance to the nearest fast charger on a glance card.
- Trip-planning automations — trigger routines when arriving in a region with specific connector types available.
- "On the road" scenes — flip when the nearest station reports ACTIVE while you're away.

## Examples

```yaml
# Template sensor: count of green-energy stations nearby
template:
  - sensor:
      - name: "Green-energy chargers nearby"
        state: >
          {{ state_attr('sensor.ladestellen_austria_nearest_station', 'stations')
             | selectattr('greenEnergy', 'eq', true) | list | count }}
```

## Supported functions

- Nearest-station lookup (`GET /search`) with live per-point status inline (AVAILABLE / CHARGING / OCCUPIED / OUTOFORDER / BLOCKED / INOPERATIVE / UNKNOWN).
- Reauth flow on HTTP 401/403.
- Diagnostics export with redacted credentials.
- Repairs issues for recoverable degraded conditions (e.g. dynamic-tracker without coordinates).

## Data update

`GET /search?latitude=…&longitude=…` runs every **10 minutes** by default (configurable 5–720). Station metadata rarely changes; `stationStatus` and per-point `status` flip during outages. In [Dynamic location mode](#dynamic-location-mode) refreshes are triggered by tracker movement (rate-limited) instead of by the scan interval.

## Known limitations

- Nearest-N only — the upstream API has no radius query. Truncated to 10 stations.
- `Referer` header match required — bare-IP or `homeassistant.local` setups cannot be used; you need a registered domain.

## Troubleshooting

- **`invalid_auth` / 401** — API key was rotated or disabled at ladestellen.at.
- **`domain_mismatch` / 403** — HA's Referer hostname doesn't match a registered domain. Update your external URL, reconfigure with the correct domain, or add the HA domain at ladestellen.at.
- **`cannot_connect`** — DNS / network issue reaching `api.e-control.at`.
- For deeper debugging, download *Diagnostics* from the integration's three-dot menu — secrets are redacted.

## Removal

1. *Settings → Devices & services → Ladestellen Austria → ⋮ → Delete*.
2. In HACS, *Remove* on the integration card.
3. Optionally revoke your API key at ladestellen.at.

## Development

Cards are TypeScript + Lit 3 + Rollup, single bundle at `custom_components/ladestellen_austria/www/ladestellen-austria-card.js`. End users install via HACS and never run `npm`; contributors do:

```bash
npm install && npm run build      # production bundle
npm run dev                       # watch mode
ruff check .
mypy --strict --ignore-missing-imports custom_components/ladestellen_austria
python3 -m pytest tests/ -v
```

`src/const.ts` and `custom_components/ladestellen_austria/const.py` both carry `CARD_VERSION` — they must stay byte-identical, otherwise the frontend version check loops on a reload banner. Bump both together.

## Attribution

Data is served by the official [Ladestellenverzeichnis](https://api.e-control.at) operated by [E-Control Austria](https://www.e-control.at/) (the federal energy regulator), an initiative of the [BMK](https://www.bmk.gv.at/). Catalogued on [data.gv.at](https://www.data.gv.at/katalog/dataset/e-control-ladestellenverzeichnis-api).

Upstream issues: `support@ladestellen.at` (API) / `office@e-control.at` (general). Bugs in *this* integration: open a GitHub issue.

## Terms of Use — integration compliance

Registering an API key at [admin.ladestellen.at](https://admin.ladestellen.at/#/api/registrieren) binds you to a contract with E-Control (full ToU at [admin.ladestellen.at/#/api/terms-of-use](https://admin.ladestellen.at/#/api/terms-of-use); §9 carries a €10,000 penalty). Read it — non-technical obligations (notifications, public-facing disclaimer, quarterly stats, no ad/sponsor integration) are yours, not the integration's.

What this integration handles automatically:

- **§3c — E-Control logo + §3d — Attribution:** both cards render the E-Control logo as a clickable link to `https://www.e-control.at/` and the verbatim *Datenquelle: E-Control* footer; sensors carry the same attribution. Frozen, can't be hidden.
- **§3i — No data mutation:** values flow through unchanged; precision and ordering preserved as received.
- **§3j — API-key confidentiality:** stored as a password field, never logged, redacted in diagnostics.
- **§4 — Rate limits (2,500 req/hour per user):** one outbound `/search` per refresh, 10-min default (5-min minimum). [Dynamic location mode](#dynamic-location-mode) replaces interval polling with movement-triggered refreshes under their own cooldown guards.
- **§7 — No bulk redistribution:** no export feature, no re-served API.

## License

MIT — see [LICENSE](LICENSE).

## Disclaimer

This integration is not affiliated with or endorsed by E-Control Austria, the BMK, or the operators of ladestellen.at. All charging-station data is provided by the [E-Control Ladestellenverzeichnis API](https://www.ladestellen.at/) under the [official Terms of Use](https://admin.ladestellen.at/#/api/terms-of-use). The developer assumes no liability for the accuracy, completeness, or timeliness of the displayed data. Use at your own risk.

---

Diese Integration steht in keiner Verbindung zur E-Control Austria, dem BMK oder den Betreibern von ladestellen.at und wird von diesen nicht unterstützt. Alle Ladestellen-Daten stammen vom [E-Control-Ladestellenverzeichnis](https://www.ladestellen.at/) und unterliegen den [offiziellen Nutzungsbedingungen](https://admin.ladestellen.at/#/api/terms-of-use). Für die Richtigkeit, Vollständigkeit und Aktualität der angezeigten Daten wird keine Haftung übernommen. Nutzung auf eigene Verantwortung.
