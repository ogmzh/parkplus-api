import { ClientEntry } from '@app/client/interfaces/client.response';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';
import { ParkingMachineLogEntry } from '../../parkingMachineLog/interfaces/parkingMachineLog.response';

export interface ParkingMachineEntry {
  id: string;
  client: ClientEntry;
  zone: ZoneEntry;
  logs: ParkingMachineLogEntry[];
}

export interface ParkingMachineResponse {
  data: ParkingMachineEntry[];
  count: number;
}
