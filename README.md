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

Charging-station data is served by the official Austrian *Ladestellenverzeichnis* at [api.e-control.at](https://api.e-control.at), operated by [E-Control Austria](https://www.e-control.at/) (the federal energy regulator), an initiative of the [BMK (Federal Ministry for Climate Action)](https://www.bmk.gv.at/). The dataset is catalogued on [data.gv.at](https://www.data.gv.at/katalog/dataset/e-control-ladestellenverzeichnis-api).

Every sensor shipped by this integration carries the attribution string *"Datenquelle: E-Control"*, required verbatim by §3d of the [ladestellen.at Nutzungsbedingungen](https://admin.ladestellen.at/#/api/terms-of-use).

Problems with the upstream data or API? Contact `support@ladestellen.at` (API issues) or `office@e-control.at` (general). Bugs in *this* integration — open an issue on GitHub instead.

## User obligations under the ladestellen.at Terms of Use

When you register for an API key at [admin.ladestellen.at](https://admin.ladestellen.at/#/api/registrieren) you accept a binding contract with E-Control. This integration helps you comply, but the **legal obligations are yours, not the integration author's**. Violations carry a **€10,000 contract penalty** under §9 of the ToU.

**You must:**

- **Attribute the data source** — "Datenquelle: E-Control" shown directly next to any displayed data. This integration sets it on every entity automatically (§3d).
- **Display the E-Control logo** next to the data, as an image-link to `https://www.e-control.at/`. The companion Lovelace card ships this for you (§3c). If you render the sensor attributes in a custom card, add the logo yourself.
- **Notify E-Control before going productive** — email `support@ladestellen.at` with what you're building and when it goes live (§3a).
- **Notify E-Control of your public URL** if your HA dashboard is reachable over the internet (§3b).
- **Display the prescribed liability disclaimer** on any public-facing HA dashboard that surfaces this data (§3e):

  > *"Die Dateneingaben der angegebenen Standorte und Informationen werden ausschließlich durch die Betreiber der Ladepunkte direkt und selbst vorgenommen. Diese Betreiber haben die Möglichkeit, die Informationen tagesaktuell zu halten. Für die Richtigkeit, Vollständigkeit und Aktualität der von den Betreibern selbst vorgenommenen Angaben kann keine Haftung übernommen werden. Für Schäden, die sich aus fehlerhaften Inhalten oder Handlungen ergeben, welche im Vertrauen auf die Richtigkeit des Inhaltes gemacht wurden, übernimmt die E-Control keine Haftung."*

- **Submit quarterly usage statistics** — Unique-Visits + Unique-Visitors per quarter to `support@ladestellen.at` (§3g).
- **Notify E-Control on discontinuation** (temporary or permanent) via `support@ladestellen.at` (§3f).
- **Keep your API key secret** — never share it with third parties (§3j; enforced technically by the integration via masked input fields and diagnostic redaction).

**You must not:**

- Modify the data values returned by the API — display them as received (§3i).
- Connect the data to advertising partners, sponsors, or third parties (§3k).
- Charge visitors for access to the E-Control-sourced information (§3l).
- Re-distribute the data as a file export or re-serve it as a web service (§7).

**Rate limits (§4):** 30 concurrent requests pooled across all API users globally (Fair Use), 2,500 requests per hour per user. The default 10-minute poll interval keeps you well under these ceilings even with dozens of entries.

**No technical support** from E-Control for API consumers (§5). For integration issues, open a GitHub issue here — not at ladestellen.at.

**Governing law**: Austrian law, exclusive venue Vienna (§11). E-Control can revoke access with 3 months' notice without cause (§10).

Full ToU: https://admin.ladestellen.at/#/api/terms-of-use

---

This integration is an independent project. Not affiliated with, endorsed by, or sponsored by E-Control Austria, BMK, or the operators of ladestellen.at.
