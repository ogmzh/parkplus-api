import { IsNumber, IsPositive, Max } from 'class-validator';

export class ParkingMachineLogDto {
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @Max(9999999999.99)
  temperature: number;
}
