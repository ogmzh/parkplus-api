import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatISO } from 'date-fns';
import { Repository } from 'typeorm';
import { MissingResourceException } from '../shared/errors/missingResource.exception';
import { TicketEntry } from './interfaces/ticket.response';
import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async getById(id: string): Promise<TicketEntry> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['zone'],
    });
    if (!ticket) {
      throw new MissingResourceException('id', id);
    }

    return {
      id: ticket.id,
      expiresAt: formatISO(ticket.expiresAt),
      issuedAt: formatISO(ticket.issuedAt),
      licensePlate: ticket.licensePlate,
      zone: ticket.zone,
    };
  }

  async delete(id: string): Promise<void> {
    const existingTicket = await this.ticketRepository.countBy({ id });
    if (!existingTicket) {
      throw new MissingResourceException('id', id);
    }

    await this.ticketRepository.delete({ id });
  }
}
