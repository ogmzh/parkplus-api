import { Body, Controller, Delete, Get, Post, UsePipes } from '@nestjs/common';
import { ParkingMachineLogDto } from '@app/parkingMachineLog/interfaces/parkingMachineLog.dto';
import { UuidParam } from '@app/shared/decorators/uuid.param';
import {
  ParkingMachineEntry,
  ParkingMachineResponse,
} from './interfaces/parkingMachine.interface';
import { ParkingMachineService } from './parkingMachine.service';
import {
  ParkingMachineLogEntry,
  ParkingMachineLogResponse,
} from '@app/parkingMachineLog/interfaces/parkingMachineLog.response';
import { ApiValidationPipe } from '../shared/pipes/apiValidation.pipe';

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

  @Get(':id/logs')
  async getLogs(@UuidParam() id: string): Promise<ParkingMachineLogResponse> {
    return await this.parkingMachineService.getLogs(id);
  }

  @Post(':id/logs')
  @UsePipes(new ApiValidationPipe())
  async createLog(
    @UuidParam() id: string,
    @Body('log') log: ParkingMachineLogDto,
  ): Promise<ParkingMachineLogEntry> {
    return await this.parkingMachineService.createLog(id, log);
  }
}
