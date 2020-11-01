import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Role, User } from '@pet-hackaton/types';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PrefectureEntity } from './prefecture.entity';
import { PetResponsibleOrganisationEntity } from './pet-responsible-organisation.entity';
import { ShelterEntity } from './shelter.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements User {
  @Column({ unique: true })
  login: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @ApiProperty()
  @Column({ nullable: true })
  alias: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstName?: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: Role, default: Role.SHELTER_USER })
  role: Role;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @OneToMany(() => RefreshTokenEntity, (tokens) => tokens.user)
  tokens: RefreshTokenEntity[];

  @ManyToOne(() => PrefectureEntity, (prefecture) => prefecture.users)
  prefecture: PrefectureEntity;

  @ManyToOne(() => PetResponsibleOrganisationEntity, (organization) => organization.users)
  organization: PetResponsibleOrganisationEntity;

  @ManyToOne(() => ShelterEntity, (shelter) => shelter.users)
  shelter: ShelterEntity;
}
