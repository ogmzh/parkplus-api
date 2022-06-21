import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidParam } from '../shared/decorators/uuid.param';
import { TicketEntry } from './interfaces/ticket.response';
import { TicketService } from './ticket.service';

@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Returns the ticket entry by id' })
  @ApiResponse({ status: 200, type: TicketEntry })
  @Get(':id')
  async getById(@UuidParam() id: string): Promise<TicketEntry> {
    return await this.ticketService.getById(id);
  }

  @ApiOperation({
    summary: 'Delete a ticket by id',
  })
  @ApiResponse({
    status: 200,
    description: 'void',
  })
  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.ticketService.delete(id);
  }
}
