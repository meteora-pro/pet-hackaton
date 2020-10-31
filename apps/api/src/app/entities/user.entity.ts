import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Shelter, User } from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity implements User {

  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.shelterUser, nullable: true })
  role: Role;

  shelters: Shelter[];

  @ApiProperty()
  @Column()
  alias: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ nullable: true })
  middleName?: string;
}
