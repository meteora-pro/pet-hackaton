import { BaseEntity } from './base.entity';
import { OutReason, PetRegistrationHistory } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OutReasonEntity } from './dictionaries/out-reason.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'pet_registration_histories'})
export class PetRegistrationHistoryEntity extends BaseEntity implements PetRegistrationHistory {

  @ApiProperty()
  @Column({ nullable: true })
  arrivedAct: string;

  @ApiProperty()
  @Column({ nullable: true })
  arrivedAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  outAct: string;

  @ApiProperty()
  @Column({ nullable: true })
  outAt: Date;

  @ApiProperty({type: OutReasonEntity})
  @ManyToOne(() => OutReasonEntity, out => out.histories, {nullable: true})
  outReason: OutReasonEntity;
}
