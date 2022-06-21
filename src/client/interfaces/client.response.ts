import { ClientUserEntry } from '@app/clientUser/interfaces/clientUser.response';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';
import { ApiProperty } from '@nestjs/swagger';

export class ClientEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'DIRG' })
  name: string;
  @ApiProperty({ type: ClientUserEntry, isArray: true })
  employees?: ClientUserEntry[];
  @ApiProperty({ type: ZoneEntry, isArray: true })
  zones?: ZoneEntry[];
}

export class ClientResponse {
  @ApiProperty({ example: 23 })
  count: number;
  @ApiProperty({ type: ClientEntry, isArray: true })
  data: ClientEntry[];
}
