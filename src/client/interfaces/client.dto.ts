import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ClientDto {
  @ApiProperty({ example: 'Manja', required: true })
  @IsNotEmpty()
  @Length(3, 30)
  readonly name: string;
}

export class RequestBodyClientDto {
  @ApiProperty()
  readonly client: ClientDto;
}
