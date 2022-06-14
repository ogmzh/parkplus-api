import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientUserDto } from '@app/clientUser/interfaces/clientUser.dto';
import { ClientUserData } from '@app/clientUser/interfaces/clientUser.response';
import { ExistingResourceException } from '@app/shared/errors/existingResource.exception';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { ClientEntity } from './client.entity';
import { ClientDto } from './interfaces/client.dto';
import { ClientData, SingleClientData } from './interfaces/client.response';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientUserEntity)
    private readonly clientUserRepository: Repository<ClientUserEntity>,
  ) {}

  async getAll(): Promise<{ count: number; data: ClientData[] }> {
    const [data, count] = await this.clientRepository.findAndCount();

    return {
      data: data.map(entity => ({ id: entity.id, name: entity.name })),
      count,
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
    await this.clientRepository.save(clientEntity);
    return { id, name: clientDto.name };
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

  async addUserToClient(
    dto: ClientUserDto,
    clientId: string,
  ): Promise<ClientUserData> {
    const existingEmail =
      (await this.clientUserRepository.countBy({
        email: dto.email,
      })) > 0;

    if (existingEmail) {
      throw new ExistingResourceException('email', dto.email);
    }
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['employees'],
    });
    if (!client) {
      throw new MissingResourceException(
        'id',
        clientId,
        'could not find client',
      );
    }
    const clientUser = new ClientUserEntity();
    Object.assign(clientUser, dto);
    clientUser.employer = client;
    const entity = await this.clientUserRepository.save(clientUser);
    return {
      email: clientUser.email,
      employer: { id: client.id, name: client.name },
      firstName: clientUser.firstName,
      lastName: clientUser.lastName,
      id: entity.id,
    };
  }

  async getById(clientId: string): Promise<SingleClientData> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['employees'],
    });
    if (!client) {
      throw new MissingResourceException('id', clientId);
    }
    return {
      id: client.id,
      name: client.name,
      employees: client.employees.map(employee => ({
        id: employee.id,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
      })),
    };
  }
}
