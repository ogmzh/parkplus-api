import { IsNotEmpty, Length } from 'class-validator';

export class CityDto {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
