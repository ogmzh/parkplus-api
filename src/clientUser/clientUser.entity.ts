import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from '@app/client/client.entity';

@Entity({ name: 'client_users' })
export class ClientUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => ClientEntity, employee => employee.employees)
  @JoinColumn({ name: 'employee_id' })
  employee: ClientEntity;
}
