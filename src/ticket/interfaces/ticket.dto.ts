import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinDate,
} from 'class-validator';
import { add } from 'date-fns';

export class TicketDto {
  @IsNotEmpty()
  @IsString()
  @Matches('[A-Z0-9]')
  @Length(4, 12)
  licensePlate: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(add(new Date(), { hours: 1 }))
  expiresAt: string;
}
