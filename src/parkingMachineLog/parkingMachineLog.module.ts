import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingMachineLogController } from './parkingMachineLog.controller';
import { ParkingMachineLogEntity } from './parkingMachineLog.entity';
import { ParkingMachineLogService } from './parkingMachineLog.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingMachineLogEntity])],
  controllers: [ParkingMachineLogController],
  providers: [ParkingMachineLogService],
})
export class ParkingMachineLogModule {}
