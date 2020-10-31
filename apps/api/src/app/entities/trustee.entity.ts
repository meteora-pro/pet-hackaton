import { BaseEntity } from './base.entity';
import { Trustee } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PetEntity } from './pet.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'trustees'})
export class TrusteeEntity extends BaseEntity implements Trustee {
  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column({nullable: true})
  lastName: string;

  @ApiProperty()
  @Column()
  contactData: string;

  @ApiProperty()
  @Column({nullable: true})
  middleName?: string;

  @ApiProperty()
  @ManyToOne(() => PetEntity, pet => pet.trustee)
  pet: PetEntity

}
