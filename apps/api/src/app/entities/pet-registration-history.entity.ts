import { BaseEntity } from './base.entity';
import { OutReason, PetRegistrationHistory } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OutReasonEntity } from './dictionaries/out-reason.entity';
import { OrganizationEntity } from './organization.entity';

@Entity({name: 'pet_registration_histories'})
export class PetRegistrationHistoryEntity extends BaseEntity implements PetRegistrationHistory {

  @Column()
  arrivedAct: string;

  @Column()
  arrivedAt: Date;

  @Column()
  outAct: string;

  @Column()
  outAt: Date;

  @ManyToOne(() => OutReasonEntity, out => out, {nullable: true})
  outReason: OutReasonEntity;
}
