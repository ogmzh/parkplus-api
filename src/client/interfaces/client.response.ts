import { ClientUserEntry } from '@app/clientUser/interfaces/clientUser.response';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';

export interface ClientResponse {
  count: number;
  data: ClientEntry[];
}

export interface ClientEntry {
  id: string;
  name: string;
  employees?: ClientUserEntry[];
  zones?: ZoneEntry[];
}
