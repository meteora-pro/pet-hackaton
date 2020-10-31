import { BaseEntity } from './base.entity';
import { Trustee } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PetEntity } from './pet.entity';

@Entity({name: 'trustees'})
export class TrusteeEntity extends BaseEntity implements Trustee {
  @Column()
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  contactData: string;


  @Column({nullable: true})
  middleName?: string;

  @ManyToOne(() => PetEntity, pet => pet.trustee)
  pet: PetEntity

}
