# Ladestellen Austria

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/rolandzeiner/ladestellen-austria/releases)
[![HA min version](https://img.shields.io/badge/HA-2025.1%2B-blue.svg)](https://www.home-assistant.io/)

Home Assistant custom integration for the Austrian EV charging station directory (*Ladestellenverzeichnis*), powered by **E-Control Austria's** official API.

> Status: pre-release, targeting Platinum quality scale from v0.1.0.

## Features

- Nearest charging stations for any point in Austria, pulled from the official E-Control *Ladestellenverzeichnis*.
- Single sensor per config entry exposing the distance to the nearest station in km; the full station list (label, address, connectors, power, status, operator, price URL) is available as attributes.
- Bilingual config flow (English + German) with pre-filled external-URL referer domain and HA-home coordinates.
- Reauth flow when the API rejects stored credentials.
- Reconfiguration flow to change credentials, location, or polling interval without losing entity history.
- Strict-typed, async-only. *(0.1.0)*

## Requirements

- Home Assistant **2025.1** or newer.
- An **API key + domain** registered at [ladestellen.at](https://www.ladestellen.at/). Registration is free.
- An accessible Home Assistant external URL whose hostname matches the domain registered at ladestellen.at — the API checks the HTTP `Referer` header against the registered domain list.

## Installation

### Via HACS (recommended)

1. Open HACS → *Integrations* → *⋮ → Custom repositories*.
2. Add `https://github.com/rolandzeiner/ladestellen-austria` with category *Integration*.
3. Install **Ladestellen Austria** and restart Home Assistant.

### Manually

1. Copy `custom_components/ladestellen_austria/` into your HA `config/custom_components/` folder.
2. Restart Home Assistant.

## Setup

1. Register for an API key at [ladestellen.at](https://www.ladestellen.at/). During signup enter the **bare hostname** of your Home Assistant external URL (no protocol, no port, no path) — e.g. `www.example.com` — as your authorized referer domain.
2. In HA: *Settings → Devices & services → Add integration → Ladestellen Austria*.
3. Fill in:
   - **API key** — from your ladestellen.at account.
   - **Registered domain** — pre-filled from `hass.config.external_url`; must exactly match what you registered in step 1.
   - **Location** — pre-filled with your HA home coordinates; adjust via the map picker if you want a different search origin.
   - **Update interval** — defaults to 10 minutes.
4. Submit. The integration performs a trial `/search` call to confirm both the key and the domain are accepted before creating the entry.

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
| `location` | yes | HA home coordinates | Map picker. Latitude + longitude sent to `/search`. |
| `scan_interval` | no | `10` | Minutes between upstream refreshes (5–720). |

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

## Data & license

Charging-station data is served by the official Austrian *Ladestellenverzeichnis* at [api.e-control.at](https://api.e-control.at), operated by [E-Control Austria](https://www.e-control.at/) (the federal energy regulator), an initiative of the [BMK (Federal Ministry for Climate Action)](https://www.bmk.gv.at/). The dataset is catalogued on [data.gv.at](https://www.data.gv.at/katalog/dataset/e-control-ladestellenverzeichnis-api) as Austrian Open Government Data.

Every sensor shipped by this integration carries the attribution string *"Data: E-Control Austria via ladestellen.at"* (visible in entity attributes). Upstream terms of use are accepted by each user at registration: https://admin.ladestellen.at/#/api/registrieren.

Problems with the upstream data or API? Contact `support@ladestellen.at` (API issues) or `office@e-control.at` (general). Bugs in *this* integration — open an issue on GitHub instead.

---

This integration is an independent project. Not affiliated with, endorsed by, or sponsored by E-Control Austria, BMK, or the operators of ladestellen.at.
