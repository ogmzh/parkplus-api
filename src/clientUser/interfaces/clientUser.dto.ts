import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ClientUserDto {
  @IsNotEmpty()
  @Length(3, 30)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 30)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
