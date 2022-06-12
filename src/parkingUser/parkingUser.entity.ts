import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'parking_users' })
export class ParkingUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;
}
