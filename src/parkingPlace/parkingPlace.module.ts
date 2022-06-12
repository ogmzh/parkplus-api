import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingPlacesController } from './parkingPlace.controller';
import { ParkingPlaceEntity } from './parkingPlace.entity';
import { ParkingPlaceService } from './parkingPlace.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingPlaceEntity])],
  controllers: [ParkingPlacesController],
  providers: [ParkingPlaceService],
})
export class ParkingPlaceModule {}
