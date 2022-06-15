import { IsNotEmpty, Length } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @Length(3, 60)
  name: string;

  number: string;
}
