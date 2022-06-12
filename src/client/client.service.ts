import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientUserEntity)
    private readonly clientUserRepository: Repository<ClientUserEntity>,
  ) {}
}
