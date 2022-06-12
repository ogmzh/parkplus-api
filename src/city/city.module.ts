import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '@app/address/address.entity';
import { CityController } from './city.controller';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, AddressEntity])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
