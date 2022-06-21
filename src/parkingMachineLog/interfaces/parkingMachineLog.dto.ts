import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Max } from 'class-validator';

export class ParkingMachineLogDto {
  @ApiProperty({ example: 1234.67, required: true })
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @Max(9999999999.99)
  readonly temperature: number;
}

export class RequestBodyParkingMachineLogDto {
  @ApiProperty()
  readonly log: ParkingMachineLogDto;
}
