import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { AddressDto } from './interfaces/address.dto';
import { AddressEntry } from './interfaces/address.response';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async getById(id: string): Promise<AddressEntry> {
    const entity = await this.addressRepository.findOne({
      where: { id },
      relations: ['cities'],
    });
    if (!entity) {
      throw new MissingResourceException('id', id);
    }
    return {
      id: entity.id,
      name: entity.name,
      number: entity.number,
      cities: entity.cities.map(city => ({ id: city.id, name: city.name })),
    };
  }

  async deleteAddress(id: string): Promise<void> {
    const existing = (await this.addressRepository.countBy({ id })) > 0;
    if (!existing) {
      throw new MissingResourceException('id', id);
    }
    await this.addressRepository.delete({ id });
    return;
  }

  async updateAddress(id: string, dto: AddressDto): Promise<AddressEntry> {
    const entity = await this.addressRepository.findOneBy({ id });
    if (!entity) {
      throw new MissingResourceException('id', id);
    }
    Object.assign(entity, dto);

    const updated = await this.addressRepository.save(entity);
    return {
      id: updated.id,
      name: updated.name,
      number: updated.number,
    };
  }
}
