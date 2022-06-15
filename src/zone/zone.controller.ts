import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import { Body, Controller, Delete, Get, Put, UsePipes } from '@nestjs/common';
import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ZoneDto } from './interfaces/zone.dto';
import { ZoneEntry } from './interfaces/zone.response';
import { ZoneService } from './zone.service';

@Controller('zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get(':id')
  async getSingle(@UuidParam() id: string): Promise<ZoneEntry> {
    return await this.zoneService.getById(id);
  }

  @Put()
  @UsePipes(new ApiValidationPipe())
  async createZone(
    @UuidParam() id: string,
    @Body('zone') dto: ZoneDto,
  ): Promise<ZoneEntry> {
    return await this.zoneService.updateZone(id, dto);
  }

  @Delete(':id')
  async deleteSingle(@UuidParam() id: string): Promise<void> {
    return await this.zoneService.delete(id);
  }
}
