import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissingResourceException } from '../shared/errors/missingResource.exception';
import {
  ParkingMachineEntry,
  ParkingMachineResponse,
} from './interfaces/parkingMachine.interface';
import { ParkingMachineEntity } from './parkingMachine.entity';

@Injectable()
export class ParkingMachineService {
  constructor(
    @InjectRepository(ParkingMachineEntity)
    private readonly parkingMachineRepository: Repository<ParkingMachineEntity>,
  ) {}

  async getAll(): Promise<ParkingMachineResponse> {
    const [data, count] = await this.parkingMachineRepository.findAndCount();
    return { data, count };
  }

  async getById(id: string): Promise<ParkingMachineEntry> {
    const entity = await this.parkingMachineRepository.findOne({
      where: { id },
      relations: ['zone', 'client'],
    });
    if (!entity) {
      throw new MissingResourceException('id', id);
    }
    return entity;
  }

  async deleteMachine(id: string): Promise<void> {
    const existingMachine =
      (await this.parkingMachineRepository.countBy({ id })) > 0;
    if (!existingMachine) {
      throw new MissingResourceException('id', id);
    }

    await this.parkingMachineRepository.delete({ id });
    return;
  }
}
