import { AddressData } from '@app/address/interfaces/address.response';

export interface CityData {
  id: string;
  name: string;
  addresses?: AddressData[];
}

export interface CityResponse {
  data: CityData[];
  count: number;
}
