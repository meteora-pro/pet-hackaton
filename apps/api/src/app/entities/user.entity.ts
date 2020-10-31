import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Shelter, User } from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity implements User {

  @Column({ type: 'enum', enum: Role, default: Role.shelterUser, nullable: true })
  role: Role;

  shelters: Shelter[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName?: string;
}
