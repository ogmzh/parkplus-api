import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExistingResourceException } from '@app/shared/errors/existingResource.exception';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { ClientUserEntity } from './clientUser.entity';
import { ClientUserDto } from './interfaces/clientUser.dto';
import { ClientUserEntry } from './interfaces/clientUser.response';

@Injectable()
export class ClientUserService {
  constructor(
    @InjectRepository(ClientUserEntity)
    private readonly clientUserRepository: Repository<ClientUserEntity>,
  ) {}

  async getById(id: string): Promise<ClientUserEntry> {
    const user = await this.clientUserRepository.findOne({
      where: { id },
      relations: ['employer'],
    });
    if (!user) {
      throw new MissingResourceException('id', id);
    }
    return this.buildResponse(user);
  }

  async update(id: string, dto: ClientUserDto): Promise<ClientUserEntry> {
    const user = await this.clientUserRepository.findOne({
      where: { id },
      relations: ['employer'],
    });
    if (!user) {
      throw new MissingResourceException('id', id);
    }

    if (dto.email !== user.email) {
      const existingEmail =
        (await this.clientUserRepository.countBy({ email: dto.email })) > 0;
      if (existingEmail) {
        throw new ExistingResourceException('email', user.email);
      }
    }

    Object.assign(user, dto);
    const updatedUser = await this.clientUserRepository.save(user);
    return this.buildResponse(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const existing = (await this.clientUserRepository.countBy({ id })) > 0;
    if (!existing) {
      throw new MissingResourceException('id', id);
    }
    await this.clientUserRepository.delete({ id });
    return;
  }

  private buildResponse(entity: ClientUserEntity): ClientUserEntry {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      employer: { id: entity.employer.id, name: entity.employer.name },
    };
  }
}
