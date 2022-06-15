import {
  IsMilitaryTime,
  IsNotEmpty,
  IsPositive,
  Length,
} from 'class-validator';

export class ZoneDto {
  @IsNotEmpty()
  @Length(2, 60)
  name: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  maxParkDuration: number;

  @IsMilitaryTime()
  @IsNotEmpty()
  parkTimeStart: string;

  @IsMilitaryTime()
  @IsNotEmpty()
  parkTimeEnd: string;
}
