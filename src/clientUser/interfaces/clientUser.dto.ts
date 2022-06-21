import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ClientUserDto {
  @ApiProperty({ example: 'Ognjen', required: true })
  @IsNotEmpty()
  @Length(3, 30)
  readonly firstName: string;

  @ApiProperty({ example: 'Ognjenić', required: true })
  @IsNotEmpty()
  @Length(3, 30)
  readonly lastName: string;

  @ApiProperty({ example: 'ognjen@mail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class RequestBodyClientUserDto {
  @ApiProperty()
  readonly clientUser: ClientUserDto;
}
