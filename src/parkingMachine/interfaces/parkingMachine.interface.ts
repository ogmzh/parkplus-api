import { ClientEntry } from '@app/client/interfaces/client.response';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';

export interface ParkingMachineEntry {
  id: string;
  client: ClientEntry;
  zone: ZoneEntry;
  // TODO logs
}

export interface ParkingMachineResponse {
  data: ParkingMachineEntry[];
  count: number;
}
