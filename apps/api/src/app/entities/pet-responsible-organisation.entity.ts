import { BaseEntity } from './base.entity';
import { PetResponsibleOrganisation } from '@pet-hackaton/types';
import { Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

export class PetResponsibleOrganisationEntity extends BaseEntity implements PetResponsibleOrganisation {

  @Column()
  address: string;

  @ManyToOne(() => UserEntity, user => user)
  headUser: UserEntity;

  @Column()
  name: string;

}
