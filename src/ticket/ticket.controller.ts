import { Controller, Delete, Get } from '@nestjs/common';
import { UuidParam } from '../shared/decorators/uuid.param';
import { TicketEntry } from './interfaces/ticket.response';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':id')
  async getById(@UuidParam() id: string): Promise<TicketEntry> {
    return await this.ticketService.getById(id);
  }

  @Delete(':id')
  async deleteById(@UuidParam() id: string): Promise<void> {
    return await this.ticketService.delete(id);
  }
}
