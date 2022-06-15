import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '@app/address/address.entity';
import { AddressDto } from '@app/address/interfaces/address.dto';
import { AddressEntry } from '@app/address/interfaces/address.response';
import { ExistingResourceException } from '@app/shared/errors/existingResource.exception';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { CityEntity } from './city.entity';
import { CityDto } from './interfaces/city.dto';
import { CityEntry, CityResponse } from './interfaces/city.response';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async getAll(): Promise<CityResponse> {
    const [cities, count] = await this.cityRepository.findAndCount();
    return { data: cities, count };
  }

  async getById(id: string): Promise<CityEntry> {
    const existingCity = await this.cityRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
    if (!existingCity) {
      throw new MissingResourceException('id', id);
    }

    return {
      id: existingCity.id,
      name: existingCity.name,
      addresses: existingCity.addresses.map(address => ({
        id: address.id,
        name: address.name,
        number: address.number,
      })),
    };
  }

  async save(dto: CityDto): Promise<CityEntry> {
    return await this.cityRepository.save({ ...dto });
  }

  async update(id: string, dto: CityDto): Promise<CityEntry> {
    const existingCity = await this.cityRepository.findOneBy({ id });
    if (!existingCity) {
      throw new MissingResourceException('id', id);
    }

    Object.assign(existingCity, dto);

    const updated = await this.cityRepository.save(existingCity);
    return { id: updated.id, name: updated.name };
  }

  async deleteCity(id: string): Promise<void> {
    const existingCity = (await this.cityRepository.countBy({ id })) > 0;
    if (!existingCity) {
      throw new MissingResourceException('id', id);
    }

    await this.cityRepository.delete({ id });
  }

  async createAddressInCity(
    id: string,
    dto: AddressDto,
  ): Promise<AddressEntry> {
    const existingCity = await this.cityRepository.findOne({
      where: { id },
    });
    if (!existingCity) {
      throw new MissingResourceException('id', id);
    }

    const existingAddress = await this.addressRepository.findOne({
      where: { name: dto.name, number: dto.number },
      relations: ['cities'],
    });
    let savedEntity: AddressEntity;
    if (existingAddress) {
      const addressCityAlreadyAdded = existingAddress.cities.some(
        city => city.id === id,
      );
      if (addressCityAlreadyAdded) {
        throw new ExistingResourceException(
          'id',
          id,
          'This address already belongs in this city',
        );
      } else {
        existingAddress.cities = [...existingAddress.cities, existingCity];
        savedEntity = await this.addressRepository.save(existingAddress);
      }
    } else {
      const entity = new AddressEntity();
      Object.assign(entity, dto);
      entity.cities = [existingCity];
      savedEntity = await this.addressRepository.save(entity);
    }
    return {
      id: savedEntity.id,
      name: savedEntity.name,
      number: savedEntity.number,
    };
  }
}
