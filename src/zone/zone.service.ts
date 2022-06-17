import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { ZoneDto } from './interfaces/zone.dto';
import { ZoneEntry } from './interfaces/zone.response';
import { ZoneEntity } from './zone.entity';
import { TicketDto } from '@app/ticket/interfaces/ticket.dto';
import { TicketEntity } from '@app/ticket/ticket.entity';
import {
  TicketEntry,
  TicketResponse,
} from '@app/ticket/interfaces/ticket.response';
import { formatISO } from 'date-fns';
import { ExistingResourceException } from '@app/shared/errors/existingResource.exception';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(ZoneEntity)
    private readonly zoneRepository: Repository<ZoneEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async updateZone(id: string, dto: ZoneDto): Promise<ZoneEntry> {
    const zone = await this.zoneRepository.findOneBy({ id });
    if (!zone) {
      throw new MissingResourceException('id', id);
    }
    Object.assign(zone, dto);
    return await this.zoneRepository.save(zone);
  }

  async getById(id: string): Promise<ZoneEntry> {
    const zone = await this.zoneRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!zone) {
      throw new MissingResourceException('id', id);
    }
    return zone;
  }

  async delete(id: string): Promise<void> {
    const existing = (await this.zoneRepository.countBy({ id })) > 0;
    if (!existing) {
      throw new MissingResourceException('id', id);
    }

    await this.zoneRepository.delete({ id });
  }

  async createTicket(id: string, dto: TicketDto): Promise<TicketEntry> {
    const zone = await this.zoneRepository.findOneBy({ id });
    if (!zone) {
      throw new MissingResourceException('id', id, 'non existing zone');
    }

    const activeTicket =
      (await this.ticketRepository.countBy({
        licensePlate: dto.licensePlate,
        expiresAt: MoreThan(new Date()),
      })) > 0;

    if (activeTicket) {
      throw new ExistingResourceException(
        'licensePlate',
        dto.licensePlate,
        'Non expired ticket for license plate',
      );
    }

    const newTicket = new TicketEntity();
    newTicket.expiresAt = new Date(dto.expiresAt);
    newTicket.zone = zone;
    newTicket.licensePlate = dto.licensePlate;

    const entity = await this.ticketRepository.save(newTicket);
    return this.buildTicketResponse(entity);
  }

  async getActiveTickets(id: string): Promise<TicketResponse> {
    const existingZone = await this.zoneRepository.findOneBy({ id });
    if (!existingZone) {
      throw new MissingResourceException('id', id, 'non existing zone');
    }

    const [tickets, count] = await this.ticketRepository.findAndCount({
      where: {
        zone: { id },
        expiresAt: MoreThan(new Date()),
      },
      relations: ['zone'],
    });

    return {
      count,
      data: tickets.map(ticket => this.buildTicketResponse(ticket)),
    };
  }

  private buildTicketResponse(entity: TicketEntity): TicketEntry {
    return {
      id: entity.id,
      expiresAt: formatISO(entity.expiresAt),
      issuedAt: formatISO(entity.issuedAt),
      licensePlate: entity.licensePlate,
      zone: entity.zone,
    };
  }
}
