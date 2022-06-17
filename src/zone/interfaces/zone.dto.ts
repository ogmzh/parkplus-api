import {
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  Max,
} from 'class-validator';

export class ZoneDto {
  @IsNotEmpty()
  @Length(2, 60)
  name: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @Max(9999999999.99)
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
