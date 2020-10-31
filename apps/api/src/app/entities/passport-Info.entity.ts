import { BaseEntity } from './base.entity';
import { PassportInfo } from '@pet-hackaton/types';
import { Column, Entity, OneToOne } from 'typeorm';
import { PhysicalPersonEntity } from './physical-person.entity';

@Entity({name: 'passports'})
export class PassportInfoEntity extends BaseEntity implements PassportInfo {

  @Column()
  date: Date;

  @Column()
  number: string;

  @Column()
  place: string;

  @Column()
  registrationAddress: string;

  @Column()
  serialNumber: string;

  @OneToOne(() => PhysicalPersonEntity, person => person.passport)
  physicalPerson: PassportInfoEntity


}
