import { CityData } from '../../city/interfaces/city.response';

export interface AddressData {
  id: string;
  name: string;
  number: string;
  cities?: CityData[];
}
