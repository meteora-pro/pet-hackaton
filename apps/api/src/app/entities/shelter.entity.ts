import { BaseEntity } from './base.entity';
import { PetResponsibleOrganisation, Shelter, User } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PetResponsibleOrganisationEntity } from './pet-responsible-organisation.entity';
import { PrefectureEntity } from './prefecture.entity';

@Entity({ name: 'shelters' })
export class ShelterEntity extends BaseEntity implements Shelter {
  @ApiProperty()
  @Column({ nullable: true })
  index: number;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user)
  headName: UserEntity;

  @ApiProperty()
  @ManyToOne(() => PetResponsibleOrganisationEntity, (organization) => organization.shelters, { nullable: true })
  organisation: PetResponsibleOrganisationEntity;

  @ApiProperty()
  @ManyToOne(() => PrefectureEntity, (prefecture) => prefecture.shelters, { nullable: true })
  prefecture: PrefectureEntity;

  @ApiProperty()
  @OneToMany(() => UserEntity, (user) => user.shelter)
  users: UserEntity[];
}
