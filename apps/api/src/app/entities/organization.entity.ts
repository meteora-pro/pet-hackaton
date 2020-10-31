import { BaseEntity } from './base.entity';
import { Organization } from '@pet-hackaton/types';
import { Column, Entity } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'organizations'})
export class OrganizationEntity extends BaseEntity implements Organization {

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  phoneNumber: string;
}
