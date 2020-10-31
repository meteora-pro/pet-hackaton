import { BaseEntity } from './base.entity';
import { OutReason, PetRegistrationHistory } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OutReasonEntity } from './dictionaries/out-reason.entity';
import { OrganizationEntity } from './organization.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'pet_registration_histories'})
export class PetRegistrationHistoryEntity extends BaseEntity implements PetRegistrationHistory {

  @ApiProperty()
  @Column()
  arrivedAct: string;

  @ApiProperty()
  @Column()
  arrivedAt: Date;

  @ApiProperty()
  @Column()
  outAct: string;

  @ApiProperty()
  @Column()
  outAt: Date;

  @ApiProperty()
  @ManyToOne(() => OutReasonEntity, out => out, {nullable: true})
  outReason: OutReasonEntity;
}
