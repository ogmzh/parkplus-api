import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingMachineLogDto } from '@app/parkingMachineLog/interfaces/parkingMachineLog.dto';
import {
  ParkingMachineLogEntry,
  ParkingMachineLogResponse,
} from '@app/parkingMachineLog/interfaces/parkingMachineLog.response';
import { ParkingMachineLogEntity } from '@app/parkingMachineLog/parkingMachineLog.entity';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import {
  ParkingMachineEntry,
  ParkingMachineResponse,
} from './interfaces/parkingMachine.interface';
import { ParkingMachineEntity } from './parkingMachine.entity';
import { formatISO } from 'date-fns';

@Injectable()
export class ParkingMachineService {
  constructor(
    @InjectRepository(ParkingMachineEntity)
    private readonly parkingMachineRepository: Repository<ParkingMachineEntity>,
    @InjectRepository(ParkingMachineLogEntity)
    private readonly parkingMachineLogRepository: Repository<ParkingMachineLogEntity>,
  ) {}

  async getAll(): Promise<ParkingMachineResponse> {
    const [data, count] = await this.parkingMachineRepository.findAndCount();
    return {
      data: data.map(entry => prepareParkingMachineResponseEntry(entry)),
      count,
    };
  }

  async getById(id: string): Promise<ParkingMachineEntry> {
    const entity = await this.parkingMachineRepository.findOne({
      where: { id },
      relations: ['zone', 'client', 'logs'],
    });
    if (!entity) {
      throw new MissingResourceException('id', id);
    }
    return prepareParkingMachineResponseEntry(entity);
  }

  async deleteMachine(id: string): Promise<void> {
    const existingMachine =
      (await this.parkingMachineRepository.countBy({ id })) > 0;
    if (!existingMachine) {
      throw new MissingResourceException('id', id);
    }

    await this.parkingMachineRepository.delete({ id });
  }

  async createLog(
    id: string,
    log: ParkingMachineLogDto,
  ): Promise<ParkingMachineLogEntry> {
    const existingMachine = await this.parkingMachineRepository.findOneBy({
      id,
    });
    if (!existingMachine) {
      throw new MissingResourceException('id', id);
    }
    const logEntity = new ParkingMachineLogEntity();
    Object.assign(logEntity, log);
    logEntity.machine = existingMachine;
    const savedEntity = await this.parkingMachineLogRepository.save(logEntity);
    return {
      id: savedEntity.id,
      takenAt: formatISO(savedEntity.takenAt),
      temperature: savedEntity.temperature,
      machine: prepareParkingMachineResponseEntry(existingMachine),
    };
  }

  async getLogs(id: string): Promise<ParkingMachineLogResponse> {
    const existingMachine =
      (await this.parkingMachineRepository.countBy({ id })) > 0;
    if (!existingMachine) {
      throw new MissingResourceException('id', id);
    }

    const [data, count] = await this.parkingMachineLogRepository.findAndCount({
      where: { machine: { id } },
      order: { takenAt: 'DESC' },
    });

    return {
      count,
      data: data.map(log => ({
        id: log.id,
        temperature: log.temperature,
        takenAt: formatISO(log.takenAt),
      })),
    };
  }
}
const prepareParkingMachineResponseEntry = (
  entry: ParkingMachineEntity,
): ParkingMachineEntry => {
  return {
    id: entry.id,
    zone: entry.zone,
    client: entry.client,
    logs: entry.logs.map(logEntry => ({
      id: logEntry.id,
      temperature: logEntry.temperature,
      takenAt: formatISO(logEntry.takenAt),
    })),
  };
};
