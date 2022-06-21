import { Controller, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidParam } from '../shared/decorators/uuid.param';
import { ParkingMachineLogService } from './parkingMachineLog.service';

@ApiTags('machine-logs')
@Controller('machine-logs')
export class ParkingMachineLogController {
  constructor(
    private readonly parkingMachineLogService: ParkingMachineLogService,
  ) {}

  @ApiOperation({
    summary: 'Delete a log by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.parkingMachineLogService.delete(id);
  }
}
