import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClientUserEntity } from '@app/clientUser/clientUser.entity';
import { ZoneEntity } from '@app/zone/zone.entity';
import { ParkingMachineEntity } from '@app/parkingMachine/parkingMachine.entity';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ClientUserEntity, user => user.employee)
  employees: ClientUserEntity[];

  @OneToMany(() => ZoneEntity, zone => zone.client)
  zones: ZoneEntity[];

  @OneToMany(() => ParkingMachineEntity, machine => machine.client)
  machines: ParkingMachineEntity[];
}
