import { ApiValidationPipe } from '@app/shared/pipes/apiValidation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UuidParam } from '@app/shared/decorators/uuid.param';
import { ZoneDto } from './interfaces/zone.dto';
import { ZoneEntry } from './interfaces/zone.response';
import { ZoneService } from './zone.service';
import { TicketDto } from '../ticket/interfaces/ticket.dto';
import {
  TicketEntry,
  TicketResponse,
} from '../ticket/interfaces/ticket.response';

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

  @Post(':id/tickets')
  @UsePipes(new ApiValidationPipe())
  async createParkingTicket(
    @UuidParam() id: string,
    @Body('ticket') dto: TicketDto,
  ): Promise<TicketEntry> {
    return await this.zoneService.createTicket(id, dto);
  }

  @Get(':id/active-tickets')
  async getActiveTickets(@UuidParam() id: string): Promise<TicketResponse> {
    return await this.zoneService.getActiveTickets(id);
  }
}
