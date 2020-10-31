import { BaseEntity } from './base.entity';
import { CatchInformation } from '@pet-hackaton/types';
import { Column, Entity, OneToMany } from 'typeorm';
import { PetEntity } from './pet.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'catch_informations'})
export class CatchInformationEntity extends BaseEntity implements CatchInformation {
  @ApiProperty()
  @Column()
  captureActId: string;

  @ApiProperty()
  @Column()
  captureAt: Date;

  @ApiProperty()
  @Column()
  catchingAddress: string;

  @ApiProperty()
  @Column()
  createAt: Date;

  @ApiProperty()
  @Column()
  district: string;

  @ApiProperty()
  @Column()
  orderId: string;

  @ApiProperty()
  @Column({nullable: true})
  videoUrl: string;

  @ApiProperty()
  @OneToMany(() => PetEntity, pet => pet.catchInformation)
  pets: PetEntity[];

}
