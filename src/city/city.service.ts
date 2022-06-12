import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '@app/address/address.entity';
import { CityEntity } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async test() {
    const city = new CityEntity();
    city.name = 'Doboj';
    const add1 = new AddressEntity();
    add1.name = 'Cara Dušana';
    add1.number = '2';
    const add2 = new AddressEntity();
    add2.name = 'Kralja Aleksandra';

    await this.addressRepository.save([add1, add2]);
    city.addresses = [add1, add2];
    return await this.cityRepository.save(city);
  }
}
