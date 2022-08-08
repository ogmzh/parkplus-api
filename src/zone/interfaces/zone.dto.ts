import { ApiProperty } from '@nestjs/swagger';
import {
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  Max,
} from 'class-validator';

export class ZoneDto {
  @ApiProperty({ example: 'Z1', required: true })
  @IsNotEmpty()
  @Length(2, 60)
  readonly name: string;

  @ApiProperty({ example: 12.34, required: true })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @Max(9999999999.99)
  readonly price: number;

  @ApiProperty({ example: 24, required: true })
  @IsNotEmpty()
  @IsPositive()
  readonly maxParkDuration: number;

  @ApiProperty({ example: '08:00', required: true })
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly parkTimeStart: string;

  @ApiProperty({ example: '23:00', required: true })
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly parkTimeEnd: string;

  @ApiProperty({ example: 14, required: true })
  @IsPositive()
  readonly maxParkingSpots: number;
}

export class RequestBodyZoneDto {
  @ApiProperty()
  readonly zone: ZoneDto;
}
