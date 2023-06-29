import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authorized_users')
export class Authorized_usersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roles: string;

  @Column({ default: false })
  hascrudaccess: boolean;

  @Column({ default: false })
  hasiraccess: boolean;
}
