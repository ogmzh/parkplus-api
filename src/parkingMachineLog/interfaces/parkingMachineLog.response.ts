import { ParkingMachineEntry } from '@app/parkingMachine/interfaces/parkingMachine.interface';

export interface ParkingMachineLogEntry {
  id: string;
  temperature: number;
  takenAt: string;
  machine?: ParkingMachineEntry;
}

export interface ParkingMachineLogResponse {
  data: ParkingMachineLogEntry[];
  count: number;
}
