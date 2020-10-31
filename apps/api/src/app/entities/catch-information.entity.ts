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

  @ApiProperty({ type: Date, format: 'date-time'})
  @Column()
  captureAt: Date;

  @ApiProperty({example: 'Волоколамское ш., д.69, стадион "Открытая арена"'})
  @Column()
  catchingAddress: string;

  @ApiProperty({ type: Date, format: 'date-time'})
  @Column()
  createAt: Date;

  @ApiProperty({example: 'Волоколамское ш.'})
  @Column()
  district: string;

  @ApiProperty({example: '128(1)'})
  @Column()
  orderId: string;

  @ApiProperty()
  @Column({nullable: true})
  videoUrl: string;

  @ApiProperty()
  @OneToMany(() => PetEntity, pet => pet.catchInformation)
  pets: PetEntity[];

}
