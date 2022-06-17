import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from '../ticket/ticket.entity';
import { ZoneController } from './zone.controller';
import { ZoneEntity } from './zone.entity';
import { ZoneService } from './zone.service';

@Module({
  imports: [TypeOrmModule.forFeature([ZoneEntity, TicketEntity])],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
