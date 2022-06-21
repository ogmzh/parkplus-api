import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CityDto {
  @ApiProperty({ example: 'Doboj', required: true })
  @IsNotEmpty()
  @Length(3, 30)
  readonly name: string;
}

export class RequestBodyCityDto {
  @ApiProperty()
  readonly city: CityDto;
}
