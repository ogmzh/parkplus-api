import { AddressEntity } from '@app/address/address.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
