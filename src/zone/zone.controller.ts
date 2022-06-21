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
import { RequestBodyZoneDto, ZoneDto } from './interfaces/zone.dto';
import { ZoneEntry } from './interfaces/zone.response';
import { ZoneService } from './zone.service';
import {
  RequestBodyTicketDto,
  TicketDto,
} from '@app/ticket/interfaces/ticket.dto';
import {
  TicketEntry,
  TicketResponse,
} from '@app/ticket/interfaces/ticket.response';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('zones')
@Controller('zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @ApiOperation({
    summary: 'Returns a zone entry by id.',
  })
  @ApiResponse({
    status: 200,
    type: ZoneEntry,
  })
  @Get(':id')
  async getSingle(@UuidParam() id: string): Promise<ZoneEntry> {
    return await this.zoneService.getById(id);
  }

  @ApiOperation({
    summary: 'Updates a zone',
  })
  @ApiResponse({
    status: 200,
    type: ZoneEntry,
  })
  @ApiBody({ description: 'zone dto', type: RequestBodyZoneDto })
  @Put()
  @UsePipes(new ApiValidationPipe())
  async updateZone(
    @UuidParam() id: string,
    @Body('zone') dto: ZoneDto,
  ): Promise<ZoneEntry> {
    return await this.zoneService.updateZone(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a zone by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async deleteSingle(@UuidParam() id: string): Promise<void> {
    return await this.zoneService.delete(id);
  }

  @ApiOperation({ summary: 'Create a ticket in zone' })
  @ApiResponse({
    status: 200,
    description: 'Created ticket',
    type: TicketEntry,
  })
  @ApiBody({
    description: 'ticket dto',
    type: RequestBodyTicketDto,
  })
  @Post(':id/tickets')
  @UsePipes(new ApiValidationPipe())
  async createParkingTicket(
    @UuidParam() id: string,
    @Body('ticket') dto: TicketDto,
  ): Promise<TicketEntry> {
    return await this.zoneService.createTicket(id, dto);
  }

  @ApiOperation({
    summary: 'Returns active parking tickets for zone.',
  })
  @ApiResponse({
    status: 200,
    type: TicketResponse,
  })
  @Get(':id/active-tickets')
  async getActiveTickets(@UuidParam() id: string): Promise<TicketResponse> {
    return await this.zoneService.getActiveTickets(id);
  }
}
