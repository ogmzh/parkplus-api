import { CityEntry } from '@app/city/interfaces/city.response';

export interface AddressEntry {
  id: string;
  name: string;
  number: string;
  cities?: CityEntry[];
}
