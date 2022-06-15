import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientUserDto } from '@app/clientUser/interfaces/clientUser.dto';
import { ClientUserEntry } from '@app/clientUser/interfaces/clientUser.response';
import { ExistingResourceException } from '@app/shared/errors/existingResource.exception';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { ClientEntity } from './client.entity';
import { ClientDto } from './interfaces/client.dto';
import { ClientEntry } from './interfaces/client.response';
import { ZoneDto } from '@app/zone/interfaces/zone.dto';
import { ZoneEntity } from '@app/zone/zone.entity';
import { ZoneEntry } from '@app/zone/interfaces/zone.response';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientUserEntity)
    private readonly clientUserRepository: Repository<ClientUserEntity>,
    @InjectRepository(ZoneEntity)
    private readonly zoneRepository: Repository<ZoneEntity>,
  ) {}

  async getAll(): Promise<{ count: number; data: ClientEntry[] }> {
    const [data, count] = await this.clientRepository.findAndCount();

    return {
      data: data.map(entity => ({ id: entity.id, name: entity.name })),
      count,
    };
  }

  async createClient(clientDto: ClientDto): Promise<ClientEntry> {
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

  async updateClient(id: string, clientDto: ClientDto): Promise<ClientEntry> {
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
  ): Promise<ClientUserEntry> {
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

  async getById(clientId: string): Promise<ClientEntry> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['employees', 'zones'],
    });
    if (!client) {
      throw new MissingResourceException('id', clientId);
    }
    return {
      id: client.id,
      name: client.name,
      zones: client.zones,
      employees: client.employees.map(employee => ({
        id: employee.id,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
      })),
    };
  }

  async createZone(clientId: string, dto: ZoneDto): Promise<ZoneEntry> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['zones'],
    });
    if (!client) {
      throw new MissingResourceException('id', clientId);
    }

    if (client.zones.some(zone => zone.name === dto.name)) {
      throw new ExistingResourceException(
        'name',
        dto.name,
        'existing zone name',
      );
    }

    const zone = new ZoneEntity();
    Object.assign(zone, dto);
    zone.client = client;
    const persisted = await this.zoneRepository.save(zone);
    return {
      id: persisted.id,
      name: persisted.name,
      price: persisted.price,
      maxParkDuration: persisted.maxParkDuration,
      parkTimeStart: persisted.parkTimeStart,
      parkTimeEnd: persisted.parkTimeEnd,
    };
  }
}
