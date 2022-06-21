import { ApiProperty } from '@nestjs/swagger';

class Employer {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'Ognjen' })
  name: string;
}

export class ClientUserEntry {
  @ApiProperty({ example: 'uuid-uuid-uuid-uuid' })
  id: string;
  @ApiProperty({ example: 'Ognjen' })
  firstName: string;
  @ApiProperty({ example: 'Ognjenović' })
  lastName: string;
  @ApiProperty({ example: 'ognjen@gmail.com' })
  email: string;
  @ApiProperty({ type: Employer })
  employer?: Employer;
}
