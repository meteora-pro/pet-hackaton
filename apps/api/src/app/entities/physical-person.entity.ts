import { BaseEntity } from './base.entity';
import { PhysicalPerson } from '@pet-hackaton/types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PassportInfoEntity } from './passport-Info.entity';

@Entity({name: 'physical_persons'})
export class PhysicalPersonEntity extends BaseEntity implements PhysicalPerson {
  @Column('text', { array: true, nullable: true, default: '{}' })
  contacts: string[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName?: string;

  @OneToOne(() => PassportInfoEntity, passport => passport.physicalPerson)
  @JoinColumn()
  passport: PassportInfoEntity;

}
