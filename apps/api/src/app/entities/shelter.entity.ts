import { BaseEntity } from './base.entity';
import { PetResponsibleOrganisation, Shelter, User } from '@pet-hackaton/types';
import {Column, Entity, ManyToOne} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ShelterEntity extends BaseEntity implements Shelter {

  @Column()
  address: string;

  @ManyToOne(() => UserEntity, user => user.id)
  headName: UserEntity;


  organisation: PetResponsibleOrganisation;
}
