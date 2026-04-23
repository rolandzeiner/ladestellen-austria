import type {
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from "custom-card-helpers";

declare global {
  interface HTMLElementTagNameMap {
    "ladestellen-austria-card-editor": LovelaceCardEditor;
    "hui-error-card": LovelaceCard;
  }
}

export interface LadestellenAustriaCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  entity?: string;
  max_stations?: number;
  show_amenities?: boolean;
}

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
  points: Point[];
}
