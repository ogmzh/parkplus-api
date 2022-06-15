import { AddressEntry } from '@app/address/interfaces/address.response';

export interface CityEntry {
  id: string;
  name: string;
  addresses?: AddressEntry[];
  // TODO zones
}

export interface CityResponse {
  data: CityEntry[];
  count: number;
}
