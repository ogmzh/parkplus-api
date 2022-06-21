import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class AddressDto {
  @ApiProperty({ example: 'Cara Dušana', required: true })
  @IsNotEmpty()
  @Length(3, 60)
  readonly name: string;

  @ApiProperty({ example: '10', required: false })
  readonly number: string;
}

export class RequestBodyAddressDto {
  @ApiProperty()
  readonly address: AddressDto;
}
