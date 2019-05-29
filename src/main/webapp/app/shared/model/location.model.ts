export interface ILocation {
  id?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  latitude?: string;
  longitue?: string;
}

export const defaultValue: Readonly<ILocation> = {};
