import { Controller, Delete } from '@nestjs/common';
import { UuidParam } from '../shared/decorators/uuid.param';
import { ParkingMachineLogService } from './parkingMachineLog.service';

@Controller('machine-logs')
export class ParkingMachineLogController {
  constructor(
    private readonly parkingMachineLogService: ParkingMachineLogService,
  ) {}

  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.parkingMachineLogService.delete(id);
  }
}
