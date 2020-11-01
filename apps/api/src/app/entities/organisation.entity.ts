import { BaseEntity } from './base.entity';
import { NewPetOwnerOrganisation } from '@pet-hackaton/types';
import { Column, Entity } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'new_pet_owner_organizations'})
export class NewPetOwnerOrganizationEntity extends BaseEntity implements NewPetOwnerOrganisation {

  @ApiProperty()
  @Column({ nullable: true })
  address?: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({nullable: true})
  phoneNumber?: string;
}
