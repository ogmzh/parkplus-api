import { Controller, Delete, Get } from '@nestjs/common';
import { UuidParam } from '../shared/decorators/uuid.param';
import {
  ParkingMachineEntry,
  ParkingMachineResponse,
} from './interfaces/parkingMachine.interface';
import { ParkingMachineService } from './parkingMachine.service';

@Controller('machines')
export class ParkingMachineController {
  constructor(private readonly parkingMachineService: ParkingMachineService) {}

  @Get()
  async getAll(): Promise<ParkingMachineResponse> {
    return await this.parkingMachineService.getAll();
  }

  @Get(':id')
  async getById(@UuidParam() id: string): Promise<ParkingMachineEntry> {
    return await this.parkingMachineService.getById(id);
  }

  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.parkingMachineService.deleteMachine(id);
  }
}
