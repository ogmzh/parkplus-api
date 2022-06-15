import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';
import { ZoneEntity } from '@app//zone/zone.entity';
import { ParkingMachineEntity } from '../parkingMachine/parkingMachine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      ClientUserEntity,
      ZoneEntity,
      ParkingMachineEntity,
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
