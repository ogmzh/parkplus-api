import { ConflictingResourceException } from '@app/shared/errors/existingResource.exception';
import { MissingResourceException } from '@app/shared/errors/missingResource.exception';
import { TicketDto } from '@app/ticket/interfaces/ticket.dto';
import {
  TicketEntry,
  TicketResponse,
} from '@app/ticket/interfaces/ticket.response';
import { TicketEntity } from '@app/ticket/ticket.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { add, formatISO } from 'date-fns';
import { MoreThan, Repository } from 'typeorm';
import { ZoneDto } from './interfaces/zone.dto';
import { ZoneEntry } from './interfaces/zone.response';
import { ZoneEntity } from './zone.entity';

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
    const zone = await this.zoneRepository.findOne({
      where: { id },
      relations: ['machines'],
    });

    if (!zone) {
      throw new MissingResourceException('id', id, 'non existing zone');
    }

    if (!zone.machines.some(machine => machine.id === dto.parkingMachineId)) {
      throw new MissingResourceException(
        'parkingMachineId',
        dto.parkingMachineId,
        'non existing parking machine',
      );
    }

    const [activeTickets, numberOfActiveTickets] =
      await this.ticketRepository.findAndCountBy({
        zone: { id: zone.id },
        expiresAt: MoreThan(new Date()),
      });

    const activeTicket = activeTickets.find(
      ticket => ticket.licensePlate === dto.licensePlate,
    );

    if (activeTicket) {
      throw new ConflictingResourceException(
        'licensePlate',
        dto.licensePlate,
        'Non expired ticket for license plate',
      );
    }

    if (numberOfActiveTickets >= zone.maxParkingSpots) {
      throw new ConflictingResourceException(
        'licensePlate',
        dto.licensePlate,
        'No free spots available in zone',
      );
    }

    const newTicket = new TicketEntity();
    newTicket.expiresAt = add(new Date(), { hours: 1 });
    newTicket.zone = zone;
    newTicket.licensePlate = dto.licensePlate;
    newTicket.machine = zone.machines.find(
      machine => machine.id === dto.parkingMachineId,
    );

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
      relations: ['zone', 'machine'],
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
      machineId: entity.machine.id,
    };
  }
}
