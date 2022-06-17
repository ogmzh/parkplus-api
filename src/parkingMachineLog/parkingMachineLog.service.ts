import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissingResourceException } from '../shared/errors/missingResource.exception';
import { ParkingMachineLogEntity } from './parkingMachineLog.entity';

@Injectable()
export class ParkingMachineLogService {
  constructor(
    @InjectRepository(ParkingMachineLogEntity)
    private readonly machineLogRepo: Repository<ParkingMachineLogEntity>,
  ) {}

  async delete(id: string): Promise<void> {
    const existing = (await this.machineLogRepo.countBy({ id })) > 0;
    if (!existing) {
      throw new MissingResourceException('id', id);
    }

    await this.machineLogRepo.delete({ id });
  }
}
