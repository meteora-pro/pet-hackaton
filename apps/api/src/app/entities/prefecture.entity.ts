import { BaseEntity } from './base.entity';
import {  Prefecture, } from '@pet-hackaton/types';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import {ApiProperty} from "@nestjs/swagger";
import { ShelterEntity } from './shelter.entity';

@Entity({name: 'prefectures'})
export class PrefecturesEntity extends BaseEntity implements Prefecture  {

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty({type: UserEntity})
  @ManyToOne(() => UserEntity, user => user, {nullable: true})
  headName: UserEntity;

  @ApiProperty({type: [UserEntity], isArray: true})
  @OneToMany(() => UserEntity, user => user.prefecture)
  users: UserEntity[]


  @ApiProperty({type: [ShelterEntity], isArray: true})
  @OneToMany(() => ShelterEntity, shelter => shelter.prefecture)
  shelters: ShelterEntity[]

}
