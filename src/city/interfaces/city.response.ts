import { AddressEntry } from '@app/address/interfaces/address.response';
import { ApiProperty } from '@nestjs/swagger';

export class CityEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'Doboj' })
  name: string;
  @ApiProperty({ type: () => AddressEntry, isArray: true })
  addresses?: AddressEntry[];
}

export class CityResponse {
  @ApiProperty({ type: CityEntry, isArray: true })
  data: CityEntry[];
  @ApiProperty({ example: 16 })
  count: number;
}
