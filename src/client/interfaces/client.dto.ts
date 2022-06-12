import { IsNotEmpty, Length } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
