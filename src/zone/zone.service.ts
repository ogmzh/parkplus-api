import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissingResourceException } from '../shared/errors/missingResource.exception';
import { ZoneDto } from './interfaces/zone.dto';
import { ZoneEntry } from './interfaces/zone.response';
import { ZoneEntity } from './zone.entity';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(ZoneEntity)
    private readonly zoneRepository: Repository<ZoneEntity>,
  ) {}

  async updateZone(id: string, dto: ZoneDto): Promise<ZoneEntry> {
    const zone = await this.zoneRepository.findOneBy({ id });
    if (!zone) {
      throw new MissingResourceException('id', id);
    }
    Object.assign(zone, dto);
    return await this.zoneRepository.save(zone);
  }

  async getById(id: string): Promise<ZoneEntry> {
    const zone = await this.zoneRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!zone) {
      throw new MissingResourceException('id', id);
    }
    return zone;
  }

  async delete(id: string): Promise<void> {
    const existing = (await this.zoneRepository.countBy({ id })) > 0;
    if (!existing) {
      throw new MissingResourceException('id', id);
    }

    await this.zoneRepository.delete({ id });
    return;
  }
}
