import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from '@app/zone/zone.entity';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  number: string;

  @ManyToOne(() => ZoneEntity, zone => zone.addresses)
  @JoinColumn({ name: 'zone_id' })
  zone: ZoneEntity;
}
