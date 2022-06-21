import { CityEntry } from '@app/city/interfaces/city.response';
import { ApiProperty } from '@nestjs/swagger';

export class AddressEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'Cara Dušana' })
  name: string;
  @ApiProperty({ example: '10' })
  number: string;
  @ApiProperty({
    type: () => CityEntry,
    isArray: true,
  })
  cities?: CityEntry[];
}
