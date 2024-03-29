import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from '@app/client/client.entity';
import { ParkingMachineLogEntity } from '@app/parkingMachineLog/parkingMachineLog.entity';
import { ZoneEntity } from '@app/zone/zone.entity';
import { TicketEntity } from '../ticket/ticket.entity';

@Entity({ name: 'parking_machines' })
export class ParkingMachineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ZoneEntity, zone => zone.machines, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'zone_id' })
  zone: ZoneEntity;

  @ManyToOne(() => ClientEntity, client => client.machines, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @OneToMany(() => ParkingMachineLogEntity, log => log.machine)
  logs: ParkingMachineLogEntity[];

  @OneToMany(() => TicketEntity, ticket => ticket.machine)
  tickets: TicketEntity[];
}
