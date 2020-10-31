import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Shelter, User } from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';

@Entity()
export class UserEntity extends BaseEntity implements User {

  @Column({ type: 'enum', enum: Role, default: null, nullable: true })
  role: Role;

  shelters: Shelter[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName?: string;
}
