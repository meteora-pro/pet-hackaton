import { BaseEntity } from './base.entity';
import { Anamnesis, HealthStatus } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PetEntity } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity({name: 'health_statuses'})
export class HealthStatusEntity extends BaseEntity implements HealthStatus {

  @ApiProperty()
  @Column()
  anamnesis: string;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  weight: number;

  @ApiProperty()
  @ManyToOne(() => PetEntity, pet => pet.vacinations)
  pet: PetEntity;

}
