import { AddressEntry } from '@app/address/interfaces/address.response';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';

export interface CityEntry {
  id: string;
  name: string;
  addresses?: AddressEntry[];
}

export interface CityResponse {
  data: CityEntry[];
  count: number;
}
