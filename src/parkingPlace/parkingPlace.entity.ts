import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from '@app/zone/zone.entity';

@Entity({ name: 'parking_places' })
export class ParkingPlaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', name: 'is_taken' })
  isTaken: boolean;

  @ManyToOne(() => ZoneEntity, zone => zone.parkingPlaces)
  @JoinColumn({ name: 'zone_id' })
  zone: ZoneEntity;
}
