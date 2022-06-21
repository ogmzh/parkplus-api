import { Body, Controller, Delete, Get, Post, UsePipes } from '@nestjs/common';
import {
  ParkingMachineLogDto,
  RequestBodyParkingMachineLogDto,
} from '@app/parkingMachineLog/interfaces/parkingMachineLog.dto';
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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('machines')
@Controller('machines')
export class ParkingMachineController {
  constructor(private readonly parkingMachineService: ParkingMachineService) {}

  @ApiOperation({ summary: 'Returns all machines (probably will get deleted)' })
  @ApiResponse({ status: 200, type: ParkingMachineResponse })
  @Get()
  async getAll(): Promise<ParkingMachineResponse> {
    return await this.parkingMachineService.getAll();
  }

  @ApiOperation({ summary: 'Returns a parking machine by id' })
  @ApiResponse({ status: 200, type: ParkingMachineEntry })
  @Get(':id')
  async getById(@UuidParam() id: string): Promise<ParkingMachineEntry> {
    return await this.parkingMachineService.getById(id);
  }

  @ApiOperation({
    summary: 'Delete a machine by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.parkingMachineService.deleteMachine(id);
  }

  @ApiOperation({
    summary: 'Returns all logs for a machine ordered by taken_at date',
  })
  @ApiResponse({ status: 200, type: ParkingMachineLogResponse })
  @Get(':id/logs')
  async getLogs(@UuidParam() id: string): Promise<ParkingMachineLogResponse> {
    return await this.parkingMachineService.getLogs(id);
  }

  @ApiOperation({ summary: 'Creates a new log for the parking machine' })
  @ApiResponse({ status: 200, type: ParkingMachineLogEntry })
  @ApiBody({ description: 'log dto', type: RequestBodyParkingMachineLogDto })
  @Post(':id/logs')
  @UsePipes(new ApiValidationPipe())
  async createLog(
    @UuidParam() id: string,
    @Body('log') log: ParkingMachineLogDto,
  ): Promise<ParkingMachineLogEntry> {
    return await this.parkingMachineService.createLog(id, log);
  }
}
