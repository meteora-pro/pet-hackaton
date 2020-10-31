import { BaseEntity } from './base.entity';
import { PhysicalPerson } from '@pet-hackaton/types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PassportInfoEntity } from './passport-Info.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'physical_persons'})
export class PhysicalPersonEntity extends BaseEntity implements PhysicalPerson {
  @ApiProperty()
  @Column('text', { array: true, nullable: true, default: '{}' })
  contacts: string[];

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  middleName?: string;

  @ApiProperty()
  @OneToOne(() => PassportInfoEntity, passport => passport.physicalPerson)
  @JoinColumn()
  passport: PassportInfoEntity;

}
