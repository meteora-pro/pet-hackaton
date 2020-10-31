import { BaseEntity } from './base.entity';
import { PetResponsibleOrganisation, Shelter, User } from '@pet-hackaton/types';
import {Column, Entity, ManyToOne} from 'typeorm';
import { UserEntity } from './user.entity';
import {ApiProperty} from "@nestjs/swagger";
import { PetResponsibleOrganisationEntity } from './pet-responsible-organisation.entity';

@Entity({name: 'shelters'})
export class ShelterEntity extends BaseEntity implements Shelter {

  @ApiProperty()
  @Column({ nullable: true })
  index: number;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, user => user)
  headName: UserEntity;


  @ApiProperty()
  @ManyToOne(() => PetResponsibleOrganisationEntity, organization => organization.shelters)
  organisation: PetResponsibleOrganisationEntity;
}
