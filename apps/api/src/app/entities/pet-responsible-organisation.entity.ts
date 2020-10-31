import { BaseEntity } from './base.entity';
import { PetResponsibleOrganisation } from '@pet-hackaton/types';
import { Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import {ApiProperty} from "@nestjs/swagger";

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

}
