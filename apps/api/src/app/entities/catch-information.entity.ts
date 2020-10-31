import { BaseEntity } from './base.entity';
import { CatchInformation } from '@pet-hackaton/types';
import { Column, Entity, OneToMany } from 'typeorm';
import { PetEntity } from './pet.entity';

@Entity({name: 'catch_informations'})
export class CatchInformationEntity extends BaseEntity implements CatchInformation {
  @Column()
  captureActId: string;

  @Column()
  captureAt: Date;

  @Column()
  catchingAddress: string;

  @Column()
  createAt: Date;

  @Column()
  district: string;

  @Column()
  orderId: string;

  @Column({nullable: true})
  videoUrl: string;

  @OneToMany(() => PetEntity, pet => pet.catchInformation)
  pets: PetEntity[];

}
