import type {
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from "custom-card-helpers";

// Type declarations the Lovelace ecosystem exposes globally but doesn't
// yet ship in custom-card-helpers. Both cards push entries onto
// `window.customCards` so the dashboard's "Add Card" picker can list
// them; the field isn't typed by HA core, hence the augmentation here
// (rather than the triple-cast each card used to repeat).
declare global {
  interface HTMLElementTagNameMap {
    "ladestellen-austria-card-editor": LovelaceCardEditor;
    "ladestellen-austria-parking-card-editor": LovelaceCardEditor;
    "hui-error-card": LovelaceCard;
  }

  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

export interface LadestellenAustriaCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  entity?: string;
  max_stations?: number;
  show_hero?: boolean;
  show_amenities?: boolean;
  show_pricing?: boolean;
  sort_by_power?: boolean;
  logo_adapt_to_theme?: boolean;
  only_available?: boolean;
  only_free?: boolean;
  only_open?: boolean;
  connector_types?: string[];
  // Amenity keys a station must have. AND semantics — a station is
  // included only if every selected amenity is present. Narrowing filter
  // (a user selecting "barrier-free" + "roofed_parking" wants both).
  amenities?: string[];
  // Payment-method tokens (OCPI authenticationMode strings). OR
  // semantics — a station is included if any of its points accept at
  // least one selected method. "Any of these works" matches the real-
  // world usage of wallet-style payment options.
  payment_methods?: string[];
  // Stations pinned to the top of the list. Ordered — first entry shows
  // first. Pinned stations override filters and bypass sort, but still
  // count toward max_stations. A pinned ID that's not in the /search
  // response is rendered as an orphan placeholder with an unpin action.
  pinned_station_ids?: string[];
  // Hide the card header (icon-tile + title + filter chip cluster).
  // Defaults to false (header shown).
  hide_header?: boolean;
}

// Second card type — single-station "parking lot from above" visualization.
// User picks one station and the card renders every point as a parking
// slot; AVAILABLE points pop, non-available points are muted. Lives in
// the same bundle as the list card.
export interface ParkingLotCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  station_id?: string;
  name?: string;
  // Whether the X / Y free counter renders in the header. Defaults to
  // true; users who only want the lot visualization can hide it.
  show_free_count?: boolean;
  // Same toggle the list card carries — the E-Control logo follows
  // the active theme's dark/light mode (silhouette via brightness/invert
  // filter). Defaults to false (keeps the brand-coloured logo).
  logo_adapt_to_theme?: boolean;
  // Source of the per-occupied-slot car colour:
  //   "random" — deterministic 10-hue palette by EVSE id (default)
  //   "theme"  — every car uses --primary-color
  //   "fixed"  — every car uses car_color_fixed (hex string)
  car_color_mode?: "random" | "theme" | "fixed";
  // Hex colour used when car_color_mode === "fixed". Plain "#rrggbb".
  car_color_fixed?: string;
  // Hide the parking-card header (icon-tile + station title + free
  // count). Defaults to false (header shown).
  hide_header?: boolean;
}

// Short-label tokens used in the connector filter. These are the UI
// labels as rendered by `_shortConnector` in the card — matching them
// here keeps the filter config human-readable and stable across API
// changes (consumerName values on the wire occasionally shift).
export const CONNECTOR_FILTER_OPTIONS: string[] = [
  "Type 2",
  "CCS",
  "CHAdeMO",
  "Type 1",
  "Tesla",
  "Schuko",
  "CEE",
];

// Amenity filter options. `key` is stored in the config, `label_key`
// resolves through the localize dictionary, `icon` renders the chip.
// The same keys are used in _filterStations to index into Station
// fields via the AMENITY_FLAG_GETTERS map.
export interface AmenityFilterOption {
  key: string;
  icon: string;
  label_key: string;
}
export const AMENITY_FILTER_OPTIONS: ReadonlyArray<AmenityFilterOption> = [
  { key: "green_energy", icon: "mdi:leaf", label_key: "amenities.green_energy" },
  { key: "austrian_ecolabel", icon: "mdi:certificate-outline", label_key: "amenities.austrian_ecolabel" },
  { key: "free_parking", icon: "mdi:parking", label_key: "amenities.free_parking" },
  { key: "roofed_parking", icon: "mdi:home-roof", label_key: "amenities.roofed_parking" },
  { key: "illuminated_parking", icon: "mdi:lightbulb-outline", label_key: "amenities.illuminated_parking" },
  { key: "barrier_free", icon: "mdi:wheelchair-accessibility", label_key: "amenities.barrier_free" },
  { key: "catering", icon: "mdi:silverware-fork-knife", label_key: "amenities.catering" },
  { key: "bathrooms", icon: "mdi:toilet", label_key: "amenities.bathrooms" },
  { key: "resting", icon: "mdi:sofa", label_key: "amenities.resting" },
];

// Payment-method filter options. `key` is the raw OCPI
// authenticationMode string the /search response emits on each point;
// storing the raw string keeps the filter stable if we ever re-skin
// auth labels.
export interface PaymentFilterOption {
  key: string;
  icon: string;
  label_key: string;
}
export const PAYMENT_FILTER_OPTIONS: ReadonlyArray<PaymentFilterOption> = [
  { key: "APP", icon: "mdi:cellphone", label_key: "auth.app" },
  { key: "QR", icon: "mdi:qrcode", label_key: "auth.qr" },
  { key: "RFID_READER", icon: "mdi:credit-card-wireless-outline", label_key: "auth.rfid" },
  { key: "CHARGING_CONTRACT", icon: "mdi:handshake-outline", label_key: "auth.contract" },
  { key: "DEBIT_CARD", icon: "mdi:credit-card-outline", label_key: "auth.debit" },
  { key: "CREDIT_CARD", icon: "mdi:credit-card", label_key: "auth.credit" },
  { key: "CONTACTLESS_CARD_SUPPORT", icon: "mdi:contactless-payment", label_key: "auth.contactless" },
];

export interface ConnectorType {
  key: string;
  description: string;
  legacy: boolean;
  consumerName: string;
}

export interface Point {
  evseId: string;
  capacityKw: number;
  location: { lat: number; lon: number };
  connectorType: ConnectorType[];
  electricityType: string[];
  status: string;
  freeOfCharge: boolean;
  priceCentKwh: number;
  priceCentMin: number;
  startFeeCent: number;
  blockingFeeCentMin: number;
  blockingFeeFromMinute: number;
  authenticationMode: string[];
}

export interface OpeningHours {
  fromWeekday: string;
  fromTime: string;
  toWeekday: string;
  toTime: string;
}

export interface Station {
  stationId: string;
  label: string;
  description: string | null;
  countryId: string;
  operatorId: string;
  operatorName: string;
  owner: string;
  stationStatus: string;
  postCode: string;
  city: string;
  street: string;
  location: { lat: number; lon: number };
  distance: number;
  contactName: string | null;
  phoneCountryCode: string | null;
  phoneNumber: string | null;
  email: string | null;
  website: string | null;
  greenEnergy: boolean;
  austrianEcoLabel: boolean;
  freeParking: boolean;
  roofedParking: boolean;
  illuminatedParking: boolean;
  cateringService: boolean;
  bathroomsAvailable: boolean;
  restingFacilities: boolean;
  parkingPlaces: number;
  barrierFreeParkingPlaces: number;
  priceUrl: string | null;
  openingHours?: OpeningHours[];
  points: Point[];
}
