import { ClientEntry } from '@app/client/interfaces/client.response';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';
import { ApiProperty } from '@nestjs/swagger';
import { ParkingMachineLogEntry } from '../../parkingMachineLog/interfaces/parkingMachineLog.response';

export class ParkingMachineEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ type: ClientEntry })
  client: ClientEntry;
  @ApiProperty({ type: ZoneEntry })
  zone: ZoneEntry;
  @ApiProperty({ type: ParkingMachineLogEntry, isArray: true })
  logs: ParkingMachineLogEntry[];
}

export class ParkingMachineResponse {
  @ApiProperty({ type: ParkingMachineEntry, isArray: true })
  data: ParkingMachineEntry[];
  @ApiProperty({ example: 12 })
  count: number;
}
