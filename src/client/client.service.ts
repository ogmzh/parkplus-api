import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExistingResourceException } from '../shared/errors/existingResource.exception';
import { MissingResourceException } from '../shared/errors/missingResource.exception';
import { isValidUUID } from '../shared/utils/utils';
import { ClientEntity } from './client.entity';
import { ClientDto } from './interfaces/client.dto';
import { ClientData } from './interfaces/client.response';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientUserEntity)
    private readonly clientUserRepository: Repository<ClientUserEntity>,
  ) {}

  async getAll(): Promise<{ count: number; data: ClientData[] }> {
    const result = await this.clientRepository.findAndCount();

    return {
      data: result[0].map(entity => ({ id: entity.id, name: entity.name })),
      count: result[1],
    };
  }

  async createClient(clientDto: ClientDto): Promise<ClientData> {
    const existing =
      (await this.clientRepository.countBy({ name: clientDto.name })) > 0;
    if (existing) {
      throw new ExistingResourceException('name', clientDto.name);
    }
    const clientEntity = new ClientEntity();
    Object.assign(clientEntity, clientDto);
    const newEntry = await this.clientRepository.save(clientEntity);
    return { id: newEntry.id, name: newEntry.name };
  }

  async updateClient(id: string, clientDto: ClientDto): Promise<ClientData> {
    const clientEntity = await this.clientRepository.findOne({
      where: { id },
    });
    if (!clientEntity) {
      throw new MissingResourceException('id', id);
    }
    Object.assign(clientEntity, clientDto);
    const updatedEntity = await this.clientRepository.save(clientEntity);
    return { id: updatedEntity.id, name: updatedEntity.name };
  }

  async deleteClient(clientId: string): Promise<void> {
    const existing =
      (await this.clientRepository.countBy({ id: clientId })) > 0;

    if (!existing) {
      throw new MissingResourceException('id', clientId);
    }
    await this.clientRepository.delete({ id: clientId });
    return;
  }
}
