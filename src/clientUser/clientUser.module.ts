import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUserController } from './clientUser.controller';
import { ClientUserEntity } from './clientUser.entity';
import { ClientUserService } from './clientUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientUserEntity])],
  controllers: [ClientUserController],
  providers: [ClientUserService],
})
export class ClientUserModule {}
