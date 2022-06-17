import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from '@app/client/client.entity';
import { AddressEntity } from '@app/address/address.entity';
import { ParkingPlaceEntity } from '@app/parkingPlace/parkingPlace.entity';
import { TicketEntity } from '@app/ticket/ticket.entity';
import { ParkingMachineEntity } from '@app/parkingMachine/parkingMachine.entity';

@Entity({ name: 'zones' })
export class ZoneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({ name: 'max_park_duration' })
  maxParkDuration: number;

  @Column({ name: 'park_time_start', type: 'time' })
  parkTimeStart: string;

  @Column({ name: 'park_time_end', type: 'time' })
  parkTimeEnd: string;

  // TODO discuss timeWeekend & timeHoliday

  @ManyToOne(() => ClientEntity, client => client.zones, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @OneToMany(() => AddressEntity, address => address.zone)
  addresses: AddressEntity[];

  @OneToMany(() => ParkingPlaceEntity, parkingPlace => parkingPlace.zone)
  parkingPlaces: ParkingPlaceEntity[];

  @OneToMany(() => TicketEntity, ticket => ticket.zone)
  tickets: TicketEntity[];

  @OneToMany(() => ParkingMachineEntity, machine => machine.zone)
  machines: ParkingMachineEntity[];
}
