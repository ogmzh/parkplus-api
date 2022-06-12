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

@Entity({ name: 'parking_machines' })
export class ParkingMachineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ZoneEntity, zone => zone.machines)
  @JoinColumn({ name: 'zone_id' })
  zone: ZoneEntity;

  @ManyToOne(() => ClientEntity, client => client.machines)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @OneToMany(() => ParkingMachineLogEntity, log => log.machine)
  logs: ParkingMachineLogEntity[];
}
