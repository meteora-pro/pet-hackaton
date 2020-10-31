import { BaseEntity } from './base.entity';
import { Organization } from '@pet-hackaton/types';
import { Column, Entity } from 'typeorm';

@Entity({name: 'organizations'})
export class OrganizationEntity extends BaseEntity implements Organization {

  @Column()
  address: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;
}
