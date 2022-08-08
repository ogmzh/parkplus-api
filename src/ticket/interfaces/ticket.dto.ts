import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class TicketDto {
  @ApiProperty({ required: true, example: 'J12L123' })
  @IsNotEmpty()
  @IsString()
  @Matches('[A-Z0-9]')
  @Length(4, 12)
  readonly licensePlate: string;

  // @ApiProperty({ example: '2022-07-17T17:34:22+02:00', required: true })
  // @IsNotEmpty()
  // @IsDate()
  // @Transform(({ value }) => new Date(value))
  // @MinDate(add(new Date(), { hours: 1 }))
  // readonly expiresAt: string;
}

export class RequestBodyTicketDto {
  @ApiProperty()
  readonly ticket: TicketDto;
}
