import { ApiProperty } from '@nestjs/swagger';

export class ZoneEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'Z1' })
  name: string;
  @ApiProperty({ example: 16.94 })
  price: number;
  @ApiProperty({ example: 24, description: 'Duration in hours' })
  maxParkDuration: number;
  @ApiProperty({ example: '07:00' })
  parkTimeStart: string;
  @ApiProperty({ example: '23:00' })
  parkTimeEnd: string;
  @ApiProperty({ example: 12 })
  maxParkingSpots: number;
}

export class ZoneResponse {
  @ApiProperty({ type: ZoneEntry, isArray: true })
  data: ZoneEntry[];
  @ApiProperty({ example: 33 })
  count: number;
}
