import { BaseEntity } from './base.entity';
import { PetResponsibleOrganisation } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import {ApiProperty} from "@nestjs/swagger";
import { ShelterEntity } from './shelter.entity';

@Entity({name: 'pet_responsible_organisations'})
export class PetResponsibleOrganisationEntity extends BaseEntity implements PetResponsibleOrganisation {

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, user => user)
  headUser: UserEntity;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(() => ShelterEntity, shelter => shelter.organisation)
  shelters: ShelterEntity[];

}
