import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Column, Entity} from "typeorm";
import { BaseDictionary, PetKind } from '@pet-hackaton/types';
import {ApiProperty} from "@nestjs/swagger";

@Entity({
  name: 'wools'
})
export class WoolEntity extends BaseDictionaryEntity implements BaseDictionary {
  @Column( {type: 'enum', enum: PetKind})
  @ApiProperty()
  readonly type: PetKind;
}
