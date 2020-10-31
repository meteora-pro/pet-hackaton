import { BaseEntity } from './base.entity';
import { Vacination } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PetEntity } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'vacinations'})
export class VacinationEntity extends BaseEntity implements Vacination {

  @ApiProperty()
  @Column()
  date: Date;


  @ApiProperty()
  @Column()
  serialNumber: string;


  @ApiProperty()
  @Column()
  vacineName: string;


  @ApiProperty()
  @ManyToOne(() => PetEntity, pet => pet.vacinations)
  pet: PetEntity;

}
