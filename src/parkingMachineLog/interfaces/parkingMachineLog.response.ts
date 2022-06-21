import { ParkingMachineEntry } from '@app/parkingMachine/interfaces/parkingMachine.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ParkingMachineLogEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;

  @ApiProperty({ example: 12.34 })
  temperature: number;
  @ApiProperty({ example: '2022-07-17T17:34:22+02:00' })
  takenAt: string;
  @ApiProperty({ type: () => ParkingMachineEntry }) // circular dependency resolver with function
  machine?: ParkingMachineEntry;
}

export class ParkingMachineLogResponse {
  @ApiProperty({ type: ParkingMachineLogEntry })
  data: ParkingMachineLogEntry[];
  @ApiProperty({ example: 11 })
  count: number;
}
