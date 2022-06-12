import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { ClientModule } from './client/client.module';
import { ClientUserModule } from './clientUser/clientUser.module';
import { ZoneModule } from './zone/zone.module';
import { ParkingPlaceModule } from './parkingPlace/parkingPlace.module';
import { ParkingUserModule } from './parkingUser/parkingUser.module';
import { ParkingMachineModule } from './parkingMachine/parkingMachine.module';
import { ParkingMachineLogModule } from './parkingMachineLog/parkingMachineLog.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CityModule,
    AddressModule,
    ClientModule,
    ClientUserModule,
    ZoneModule,
    ParkingPlaceModule,
    ParkingUserModule,
    ParkingMachineModule,
    ParkingMachineLogModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
