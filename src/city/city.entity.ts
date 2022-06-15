import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from '@app/address/address.entity';

@Entity({ name: 'cities' })
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => AddressEntity, address => address.cities)
  @JoinTable({
    name: 'cities_addresses',
    joinColumn: { name: 'city_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'address_id', referencedColumnName: 'id' },
  })
  addresses: AddressEntity[];
}
