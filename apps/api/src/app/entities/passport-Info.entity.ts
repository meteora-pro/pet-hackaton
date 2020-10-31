import { BaseEntity } from './base.entity';
import { PassportInfo } from '@pet-hackaton/types';
import { Column, Entity, OneToOne } from 'typeorm';
import { PhysicalPersonEntity } from './physical-person.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'passports'})
export class PassportInfoEntity extends BaseEntity implements PassportInfo {

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  number: string;

  @ApiProperty()
  @Column()
  place: string;

  @ApiProperty()
  @Column()
  registrationAddress: string;

  @ApiProperty()
  @Column()
  serialNumber: string;

  @ApiProperty()
  @OneToOne(() => PhysicalPersonEntity, person => person.passport)
  physicalPerson: PassportInfoEntity


}
