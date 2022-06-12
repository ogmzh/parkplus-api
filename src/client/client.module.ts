import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, ClientUserEntity])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
