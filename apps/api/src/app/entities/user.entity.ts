import { Column, Entity, OneToMany } from 'typeorm';
import { Role, User } from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';
import {ApiProperty} from "@nestjs/swagger";
import { Exclude } from 'class-transformer';
import { RefreshTokenEntity } from '../authentication/entity/refresh-token.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity implements User {

  @ApiProperty()
  @Column({ unique: true })
  login: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  email?: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true })
  phoneNumber?: string;

  @ApiProperty()
  @Column({ nullable: true })
  alias: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstName?: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.SHELTER_USER })
  role: Role;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  photoUrl?: string;

  @ApiProperty()
  @OneToMany(
    (type) => RefreshTokenEntity,
    (tokens) => tokens.user,
  )
  tokens: RefreshTokenEntity[];
}
