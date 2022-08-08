import { ZoneEntry } from '@app/zone/interfaces/zone.response';
import { ApiProperty } from '@nestjs/swagger';
import { ParkingMachineEntry } from '../../parkingMachine/interfaces/parkingMachine.interface';

export class TicketEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'J11M123' })
  licensePlate: string;
  @ApiProperty({ example: '2022-07-17T17:34:22+02:00' })
  issuedAt: string;
  @ApiProperty({ example: '2022-07-17T17:34:22+02:00' })
  expiresAt: string;
  @ApiProperty({
    type: ZoneEntry,
  })
  zone: ZoneEntry;
  @ApiProperty({ example: '1234abcd' })
  machineId: string;
}

export class TicketResponse {
  @ApiProperty({ type: TicketEntry, isArray: true })
  data: TicketEntry[];
  @ApiProperty({ example: 12 })
  count: number;
}
