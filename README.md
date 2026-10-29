# <sub><sub><img src="https://raw.githubusercontent.com/rolandzeiner/ladestellen-austria/main/custom_components/ladestellen_austria/brand/icon.png" width="40" height="40" alt=""></sub></sub> Ladestellen Austria

[![Marketplace](https://img.shields.io/badge/Marketplace-Catalog-41BDF5.svg)](https://www.home-assistant.io/integrations/marketplace/)
[![HA min version](https://img.shields.io/badge/Home%20Assistant-%3E%3D2025.1-blue.svg)](https://www.home-assistant.io/)
[![Version](https://img.shields.io/github/v/release/rolandzeiner/ladestellen-austria?label=version&color=blue)](https://github.com/rolandzeiner/ladestellen-austria/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![vibe-coded](https://img.shields.io/badge/vibe-coded-ff69b4?logo=musicbrainz&logoColor=white)](https://en.wikipedia.org/wiki/Vibe_coding)
[![Live demo](https://img.shields.io/badge/live-demo-2196F3.svg)](https://demo.rolandzeiner.at/#ladestellen)

EV charging stations near you in Home Assistant, from E-Control's official [Ladestellenverzeichnis](https://www.e-control.at/ladestellenverzeichnis), the Austrian directory of public charging points. You get the distance to the nearest station, the ten nearest with live status per charging point, and two dashboard cards.

## Screenshots

### Cards

<table>
  <tr>
    <td align="center" valign="top">
      <img src="https://raw.githubusercontent.com/rolandzeiner/ladestellen-austria/main/screenshots/card.webp" height="320" alt="Main card showing distance to the nearest station and a list of nearby stations" />
      <br/><em>Main card</em>
    </td>
  </tr>
</table>

### Setup

<table>
  <tr>
    <td align="center" valign="top">
      <img src="https://raw.githubusercontent.com/rolandzeiner/ladestellen-austria/main/screenshots/card-config.webp" height="320" alt="Card editor with filter and display options" />
      <br/><em>Card editor</em>
    </td>
    <td align="center" valign="top">
      <img src="https://raw.githubusercontent.com/rolandzeiner/ladestellen-austria/main/screenshots/config-flow.webp" height="320" alt="Integration setup dialog asking for API key, domain and location" />
      <br/><em>Config flow</em>
    </td>
  </tr>
</table>

## Features

- Distance to the nearest charging station, plus the ten nearest with connectors, power, live status, operator, prices and opening hours.
- A sensor that turns on when any nearby charging point is free, and an event whenever a charging point changes status.
- Follow a phone or car tracker instead of a fixed location, so the station list moves with you.
- Two cards: a station list with filters and pinned stations, and a top-down parking-lot view of a single station.
- Pick one of the integration's sensors in the card picker, and the matching card offers itself already set up.
- When E-Control is down, a repair says so, and the cards show it instead of an empty list.
- Setup, cards and card editors in English and German. Both cards and their editors meet WCAG 2.2 AA.

## Requirements

- Home Assistant **2025.1.0** or newer.
- A free API key from [ladestellen.at](https://admin.ladestellen.at/#/api/registrieren), registered for a domain name (see *Known limitations*).

> [!IMPORTANT]
> Registering an API key is a contract between you and E-Control, with obligations and a contractual penalty. Read *Legal* before you register.

## Installation

### Marketplace (recommended)

The Marketplace is HACS, built into Home Assistant since 2026.11.

1. In Home Assistant, go to **Settings → Marketplace** and search for **Ladestellen Austria**.
2. Select it, then select **Install**. The setup starts right away, no restart needed.

[![Open this repository in the Marketplace of your Home Assistant.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=rolandzeiner&repository=ladestellen-austria&category=integration)

On Home Assistant older than 2026.11, use HACS instead: search for **Ladestellen Austria**, select **Download**, then restart Home Assistant.

### Manual

1. Download `ladestellen_austria.zip` from the [latest release](https://github.com/rolandzeiner/ladestellen-austria/releases/latest).
2. Extract it into `config/custom_components/ladestellen_austria/`.
3. Restart Home Assistant.

## Setup

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ladestellen_austria)

1. Register an API key at [ladestellen.at](https://admin.ladestellen.at/#/api/registrieren). As the referer domain, enter the bare hostname of your Home Assistant external URL, such as `www.example.com`: no protocol, no port, no path.
2. Go to **Settings → Devices & services → Add integration** and search for **Ladestellen Austria**.
3. Enter the API key and the domain, place the location on the map, and save. The integration runs one search with your key and domain before it saves the entry, so a rejected key or domain shows up right away.

| Field | Default | Description |
|---|---|---|
| **Name** | Ladestellen Austria | The entry's title and the device name. |
| **API key** | none | Your key from ladestellen.at. Stored as a password and redacted in diagnostics. |
| **Registered domain** | the hostname of your external URL | The domain you registered at ladestellen.at, without protocol, port or path. A pasted full URL is trimmed to its hostname. Redacted in diagnostics. |
| **Location** | your Home Assistant home | Where the search starts. With a tracker, the fallback when the tracker has no position. |
| **Update interval (minutes)** | 10 | How often the list refreshes, from 5 to 720 in steps of 5. Not used with a tracker. |
| **Dynamic location tracker** | empty | A `device_tracker`, such as your phone from the companion app. Leave it empty for a fixed location. See *Dynamic location*. |

For a second location, add the integration again with the same key. To change the key, domain, location, interval or tracker later, select **Reconfigure** on the entry.

## Options

Under **Settings → Devices & services → Ladestellen Austria**, select **Configure** on an entry:

| Option | Default | Description |
|---|---|---|
| **Update interval (minutes)** | 10 | From 5 to 720. Not used with a tracker. |

## Entities

Each entry gets one device with two entities. Home Assistant names them in your interface language:

| Entity | English install | German install |
|---|---|---|
| Nearest station | `sensor.<entry>_nearest_station` | `sensor.<entry>_nachste_ladestelle` |
| Free slot available | `binary_sensor.<entry>_free_slot_available` | `binary_sensor.<entry>_freier_ladepunkt_verfugbar` |

### Nearest station

The distance to the nearest station in kilometres (device class `distance`, no long-term statistics).

| Attribute | Notes |
|---|---|
| `attribution` | `Datenquelle: E-Control` |
| `station_count` | How many stations the last search returned, at most 10. |
| `stations` | Up to 10 stations, nearest first, as E-Control sends them. See *Station shape*. |
| `live_status_available` | `true` after every successful search: the status of each charging point is live. |
| `dynamic_mode` | `true` when the entry follows a tracker. |
| `dynamic_entity` | The tracker's entity ID, or `null`. |

`stations` and `live_status_available` aren't recorded in history.

#### Station shape

Each entry in `stations` carries E-Control's fields, among them:

- The station: `stationId`, `label`, `operatorName`, `stationStatus`, `street`, `postCode`, `city`, `location`, `distance` (km) and `openingHours`.
- Amenities as booleans: `greenEnergy`, `austrianEcoLabel`, `freeParking`, `roofedParking`, `illuminatedParking`, `cateringService`, `bathroomsAvailable`, `restingFacilities`, plus `barrierFreeParkingPlaces`.
- `points`, one per charging point, ordered by the number at the end of `evseId`: `evseId`, `capacityKw`, `connectorType`, `status`, `freeOfCharge`, `priceCentKwh`, `priceCentMin`, `startFeeCent`, `blockingFeeCentMin` and `authenticationMode`.

`status` is E-Control's value as sent, such as `AVAILABLE`, `CHARGING`, `OCCUPIED`, `RESERVED`, `BLOCKED`, `OUTOFORDER`, `INOPERATIVE`, `PLANNED`, `REMOVED` or `UNKNOWN`.

### Free slot available

On when at least one charging point among the nearby stations reports `AVAILABLE` (device class `presence`).

| Attribute | Notes |
|---|---|
| `attribution` | `Datenquelle: E-Control` |
| `free_slot_count` | Charging points reporting `AVAILABLE`. |
| `total_slot_count` | All charging points among the nearby stations. |
| `stations_with_free` | Stations with at least one free charging point. |

### Events

`ladestellen_austria_slot_status_changed` fires once for each charging point whose status differs between two successful searches. It doesn't fire on the first search after a start, for a point that appears or disappears from the list, or when either status is empty.

| Field | Notes |
|---|---|
| `entry_id` | The config entry. |
| `station_id`, `station_label`, `station_distance` | The station the point belongs to. |
| `evse_id` | The charging point. |
| `old_status`, `new_status` | E-Control's values, such as `CHARGING` and `AVAILABLE`. |

It's a bus event, so it isn't in the automation editor's trigger list: write the trigger in YAML (see *Examples*).

## Cards

Both cards ship in one bundle, `ladestellen-austria-card.js`, which the integration serves and adds to your dashboard resources itself. Add either card with **Add card**. Each card checks its version and shows a reload banner when your browser holds an older copy, so hard-refresh the page after an update.

### Station list

The ten nearest stations with distance, power, price, connectors and live status. Select a station to see opening hours, every charging point, payment methods, amenities, fees and the address, with a button that opens it in your maps app. In the card picker it's **Ladestellen Austria**.

```yaml
type: custom:ladestellen-austria-card
entity: sensor.ladestellen_austria_nearest_station
```

| Option | Default | Description |
|---|---|---|
| `entity` | required | A **Nearest station** sensor. |
| `name` | `Ladestellen Austria` | The card title. |
| `max_stations` | `10` | Stations to show, from 1 to 10. Pinned stations count toward it. |
| `hide_header` | `false` | Hides the header. |
| `show_hero` | `true` | Shows the distance to the nearest station large. |
| `show_pricing` | `true` | Shows prices. |
| `show_amenities` | `true` | Shows amenity details. |
| `sort_by_power` | `false` | Sorts by power, fastest first, instead of by distance. |
| `logo_adapt_to_theme` | `false` | Shows the E-Control logo black on light themes and white on dark ones. |
| `only_available` | `false` | Only stations with a free charging point right now. |
| `only_free` | `false` | Only stations with free charging. |
| `only_open` | `false` | Only stations open right now. |
| `connector_types` | none | Only stations with at least one of these: `Type 2`, `CCS`, `CHAdeMO`, `Type 1`, `Tesla`, `Schuko`, `CEE`. |
| `amenities` | none | Only stations with all of these: `green_energy`, `austrian_ecolabel`, `free_parking`, `roofed_parking`, `illuminated_parking`, `barrier_free`, `catering`, `bathrooms`, `resting`. |
| `payment_methods` | none | Only stations accepting at least one of these: `APP`, `QR`, `RFID_READER`, `CHARGING_CONTRACT`, `DEBIT_CARD`, `CREDIT_CARD`, `CONTACTLESS_CARD_SUPPORT`. |
| `pinned_station_ids` | none | Station IDs shown first, in this order, regardless of filters. The editor lets you pick them from the list. Ignored while the entry follows a tracker. |

### Parking lot

One station seen from above, each charging point a parking spot, in the order of their charging-point numbers. Free spots glow green, occupied ones show a car, and faulty, planned or removed ones show an icon for their status. Hover or tap a spot to see its power, connector and status. In the card picker it's **Ladestellen Austria — Parking**.

```yaml
type: custom:ladestellen-austria-parking-card
entity: sensor.ladestellen_austria_nearest_station
station_id: <stationId>
```

| Option | Default | Description |
|---|---|---|
| `entity` | required | A **Nearest station** sensor. |
| `station_id` | required | The station to show. The editor lets you pick it from the sensor's stations. |
| `name` | the station's name | The card title. |
| `hide_header` | `false` | Hides the header. |
| `show_free_count` | `true` | Shows the free / total counter. |
| `logo_adapt_to_theme` | `false` | Shows the E-Control logo black on light themes and white on dark ones. |
| `car_color_mode` | `random` | `random` (a fixed colour per spot), `theme` (your theme's accent colour) or `fixed`. |
| `car_color_fixed` | none | The car colour as `#rrggbb`, for `car_color_mode: fixed`. |
| `asphalt_style` | `default` | `default` (flat grey from your theme) or `textured` (dark asphalt). |
| `paint_width` | `medium` | Width of the painted lines: `thin` (2 px), `medium` (3 px) or `wide` (5 px). |
| `icon_paint_mode` | `default` | `default` (status colours) or `white` (painted on the asphalt). |

## Data updates

Each entry sends one `GET /search` to E-Control's `api.e-control.at` per refresh, every 10 minutes by default and every 5 to 720 minutes as you set it. The answer carries the live status of every charging point, so there is no second request.

### Dynamic location

With a tracker set, the tracker's position starts each search instead of **Location**, and the update interval isn't used. A position change refreshes the list when all three hold:

- the tracker has moved at least 1.5 km since the last search,
- this entry hasn't searched in the last 10 minutes,
- no entry of this integration has searched in the last 5 minutes.

A timer still refreshes every 6 hours, in case the tracker doesn't move. When the tracker has no position, because the phone is off or location access is revoked, the search falls back to **Location** and a repair names the tracker. It clears once the tracker reports a position again.

### When E-Control fails

The sensors become unavailable, and both cards show *Can't reach E-Control* instead of an empty list. Pinned stations stay pinned. The first failure keeps the interval. From the second failure in a row the interval doubles each time (10, 20, 40 minutes with the default), up to 12 hours, and the first successful search restores it.

After 10 minutes of server errors or unreadable answers from E-Control, a repair says the fault is on their side, and it clears itself once stations return. Timeouts and connection errors don't count toward it, because those can come from your own network. When E-Control rejects your key or domain, Home Assistant asks you to enter them again.

## Examples

- Show the distance to the nearest fast charger on a wall tablet.
- Get a notification when a charging point near home becomes free.
- Follow your car's tracker on a trip and see the chargers around you.
- Count nearby stations that run on green energy.

Get a notification when a nearby charging point becomes free:

```yaml
alias: "Charger free nearby"
triggers:
  - trigger: event
    event_type: ladestellen_austria_slot_status_changed
    event_data:
      new_status: AVAILABLE
actions:
  - action: notify.mobile_app_phone
    data:
      title: "Charger free"
      message: >
        {{ trigger.event.data.station_label }}
        ({{ trigger.event.data.station_distance | round(1) }} km) has a free charging point.
```

<details>
<summary>Template sensor: nearby stations on green energy</summary>

```yaml
template:
  - sensor:
      - name: "Green-energy chargers nearby"
        state: >
          {{ state_attr('sensor.ladestellen_austria_nearest_station', 'stations')
             | selectattr('greenEnergy', 'eq', true) | list | count }}
```

</details>

<details>
<summary>Turn on a dashboard light while no charging point nearby is free</summary>

```yaml
alias: "No free charger nearby"
triggers:
  - trigger: state
    entity_id: binary_sensor.ladestellen_austria_free_slot_available
actions:
  - action: >
      {{ 'light.turn_on' if trigger.to_state.state == 'off' else 'light.turn_off' }}
    target:
      entity_id: light.hallway_indicator
```

</details>

## Known limitations

- **Ten stations at most.** The API returns the nearest stations and has no radius search. The integration keeps the ten nearest.
- **You need a registered domain name.** E-Control checks the `Referer` of every request against the domains you registered. The integration builds it from **Registered domain**, so that domain has to be one you registered at ladestellen.at.
- **Pinning doesn't work with a tracker.** The list follows your position, so the station list card hides pinned stations while the entry follows a tracker. They come back when you switch to a fixed location.
- **The parking lot needs its station in the list.** It shows only a station among the sensor's ten nearest. With a tracker, it shows *not found* once you've moved away.
- **YAML dashboards don't get the resource added.** The integration adds the card to the dashboard resources only for dashboards edited in the UI. For a YAML dashboard, add `/ladestellen_austria/ladestellen-austria-card.js` as a JavaScript module yourself.

## Troubleshooting

- **"The API key was rejected (HTTP 401)."** The key is wrong, or was disabled or replaced at ladestellen.at.
- **"The API accepted the key but rejected this referer domain (HTTP 403)."** **Registered domain** doesn't match a domain registered for your key. Correct it with **Reconfigure**, or add the domain at ladestellen.at.
- **Setup can't reach E-Control.** A DNS or network problem between your Home Assistant host and `api.e-control.at`, or E-Control is down. Try again in a few minutes.
- **A card says *Can't reach E-Control*.** The last search failed, or none has worked since Home Assistant started. Check **Settings → Repairs**. If the outage issue is there, the fault is on E-Control's side and stations return on their own. If it isn't, check that your Home Assistant host can reach `api.e-control.at`.
- **Problems with the API itself.** Write to `support@ladestellen.at`. For bugs in this integration, open a [GitHub issue](https://github.com/rolandzeiner/ladestellen-austria/issues).
- **Bug reports.** Go to **Settings → Devices & services → Ladestellen Austria**, open the entry's menu and select **Download diagnostics**. The API key, the domain and the coordinates are redacted.
- **Debug logging.** Add this to `configuration.yaml`, restart, and reproduce the problem:

  ```yaml
  logger:
    default: info
    logs:
      custom_components.ladestellen_austria: debug
  ```

## Removal

1. Go to **Settings → Devices & services → Ladestellen Austria**, open the entry's menu and select **Delete**. Removing the last entry also removes the card from your dashboard resources.
2. To uninstall, go to **Settings → Marketplace**, open **Ladestellen Austria**, then ⋮ → **Uninstall**. Restart Home Assistant when a repair asks you to. On Home Assistant older than 2026.11, remove it in HACS. For a manual install, delete `config/custom_components/ladestellen_austria/`.
3. If you no longer need it, revoke your API key at ladestellen.at.

## Attribution

Every entity, every diagnostics download and both cards' footer carry:

> Datenquelle: E-Control

In full: Energie-Control Austria für die Regulierung der Elektrizitäts- und Erdgaswirtschaft (E-Control). The data comes from the [Ladestellenverzeichnis](https://www.e-control.at/ladestellenverzeichnis) API under E-Control's [Terms of Use](https://admin.ladestellen.at/#/api/terms-of-use), whose §3(d) requires this exact line next to the data. If you build your own card or dashboard on this data, keep it visible.

Icon: Font Awesome Free, CC BY 4.0.

## Legal

Registering an API key at [admin.ladestellen.at](https://admin.ladestellen.at/#/api/registrieren) is a contract between you and E-Control. Its §9 sets a contractual penalty of €10,000 for breaching §1 to §5. Read the terms before you register.

### What the integration handles for you

- **§3(c) logo and §3(d) attribution.** Both cards' footer shows the E-Control logo, linked to `https://www.e-control.at/`, and *Datenquelle: E-Control*. Neither can be hidden.
- **§3(i) no changes to the data.** Values pass through as received, with their precision.
- **§3(j) a confidential key.** The key is stored as a password, never logged, and redacted in diagnostics.
- **§4 rate limits** of 2,500 requests an hour and 30 at once. Each entry makes one request per refresh, well below that (see *Data updates*).
- **§7 no bulk redistribution.** There is no export and no re-served API.

### What you must do

- **§3(j) Keep your key to yourself.** Not in screenshots, shared configuration or issue reports.
- **§3(k) No third-party, advertising or sponsor links** attached to the data.
- **§3(l) Don't charge anyone** for the E-Control data, in any form.
- **§7 Don't redistribute** the data as a bulk export or a re-served API.

### Once you publish the data

A private Home Assistant dashboard has no visitors in the sense of §3(g). As soon as the data appears on a page anyone can open, these apply as well:

- **§3(a) Go-live.** Tell `support@ladestellen.at` from when and how you use the *Nutzer-Service*.
- **§3(b) Address.** Send `support@ladestellen.at` the public URL or IP where the *Nutzer-Service* can be reached.
- **§3(f) Shutdown.** Tell `support@ladestellen.at` when you take the page offline, for good or for a while.
- **§3(g) Quarterly figures.** Once a quarter, send `support@ladestellen.at` the page's *Unique-Visits* and *Unique-Visitors* for that quarter.
- **§3(e) Accuracy notice.** Show this text *"gut sichtbar"* (clearly visible) next to the data source, word for word:

  > Die Dateneingaben der angegebenen Standorte und Informationen werden ausschließlich durch die Betreiber der Ladepunkte direkt und selbst vorgenommen. Diese Betreiber haben die Möglichkeit, die Informationen tagesaktuell zu halten. Für die Richtigkeit, Vollständigkeit und Aktualität der von den Betreibern selbst vorgenommenen Angaben kann keine Haftung übernommen werden. Für Schäden, die sich aus fehlerhaften Inhalten oder Handlungen ergeben, welche im Vertrauen auf die Richtigkeit des Inhaltes gemacht wurden, übernimmt die E-Control keine Haftung.

- **§3(h) Service notice.** Add a *Haftungs- und Gewährleistungsausschluss für Störungen der Dienste* to the page. It covers the availability of the service itself, apart from §3(e).

The binding text is E-Control's [Terms of Use](https://admin.ladestellen.at/#/api/terms-of-use); this section summarises it. The developer isn't a lawyer, and how you meet these obligations on your own deployment is up to you.

E-Control can end your API access with three months' notice and without giving reasons (§10), or at once on a breach or suspected misuse of §1 to §5.

## License

MIT, see [LICENSE](https://github.com/rolandzeiner/ladestellen-austria/blob/main/LICENSE).

Dev setup, tests and the verification gate: [CONTRIBUTING.md](https://github.com/rolandzeiner/ladestellen-austria/blob/main/CONTRIBUTING.md).

## Disclaimer

This integration is not affiliated with or endorsed by E-Control. Charging-station data comes from the [E-Control Ladestellenverzeichnis](https://www.e-control.at/ladestellenverzeichnis) under E-Control's [Terms of Use](https://admin.ladestellen.at/#/api/terms-of-use). The developer assumes no liability for the accuracy, completeness or timeliness of the displayed data. Use at your own risk.

---

Diese Integration steht in keiner Verbindung zur E-Control und wird von ihr nicht unterstützt. Die Ladestellen-Daten stammen aus dem [E-Control-Ladestellenverzeichnis](https://www.e-control.at/ladestellenverzeichnis) und stehen unter den [Nutzungsbedingungen](https://admin.ladestellen.at/#/api/terms-of-use) der E-Control. Für die Richtigkeit, Vollständigkeit und Aktualität der angezeigten Daten wird keine Haftung übernommen. Nutzung auf eigene Verantwortung.
