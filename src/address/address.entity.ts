import { ZoneEntity } from '@app/zone/zone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from '../city/city.entity';

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

  @ManyToMany(() => CityEntity, city => city.addresses)
  cities: CityEntity[];
}
