import { BaseEntity } from './base.entity';
import { ParasiteMedicineTreatment } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PetEntity } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'parasite_medicine_treatments'})
export class ParasiteMedicineTreatmentEntity extends BaseEntity implements ParasiteMedicineTreatment {

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  medicineDose: string;

  @ApiProperty()
  @Column()
  medicineName: string;

  @ApiProperty()
  @ManyToOne(() => PetEntity, pet => pet.parasiteTreatments)
  pet: PetEntity

}
