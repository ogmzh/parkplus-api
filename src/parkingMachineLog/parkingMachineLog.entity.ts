import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingMachineEntity } from '@app/parkingMachine/parkingMachine.entity';

@Entity({ name: 'parking_machine_logs' })
export class ParkingMachineLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', name: 'taken_at' })
  takenAt: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  temperature: number;

  @ManyToOne(() => ParkingMachineEntity, machine => machine.logs)
  @JoinColumn({ name: 'machine_id' })
  machine: ParkingMachineEntity;

  @BeforeInsert()
  private setDate() {
    this.takenAt = new Date();
  }
}
