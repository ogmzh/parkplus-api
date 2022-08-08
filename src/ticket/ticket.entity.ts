import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from '@app/zone/zone.entity';
import { ParkingMachineEntity } from '../parkingMachine/parkingMachine.entity';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({ type: 'timestamptz', name: 'issued_at' })
  issuedAt: Date;

  @Column({ type: 'timestamptz', name: 'expires_at' })
  expiresAt: Date;

  @ManyToOne(() => ZoneEntity, zone => zone.tickets)
  @JoinColumn({ name: 'zone_id' })
  zone: ZoneEntity;

  @ManyToOne(() => ParkingMachineEntity, machine => machine.tickets)
  @JoinColumn({ name: 'parking_machine_id' })
  machine: ParkingMachineEntity;

  @BeforeInsert()
  setDate() {
    this.issuedAt = new Date();
  }
}
