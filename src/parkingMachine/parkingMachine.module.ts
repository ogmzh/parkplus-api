import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingMachineController } from './parkingMachine.controller';
import { ParkingMachineEntity } from './parkingMachine.entity';
import { ParkingMachineService } from './parkingMachine.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingMachineEntity])],
  controllers: [ParkingMachineController],
  providers: [ParkingMachineService],
})
export class ParkingMachineModule {}
