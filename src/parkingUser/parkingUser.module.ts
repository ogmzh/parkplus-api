import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingUsersController } from './parkingUser.controller';
import { ParkingUserEntity } from './parkingUser.entity';
import { ParkingUserService } from './parkingUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingUserEntity])],
  controllers: [ParkingUsersController],
  providers: [ParkingUserService],
})
export class ParkingUserModule {}
