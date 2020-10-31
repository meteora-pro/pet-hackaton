import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Column, Entity} from "typeorm";
import { BaseDictionary, PetKind } from '@pet-hackaton/types';
import {ApiProperty} from "@nestjs/swagger";
import { CommonService } from '../../services/common/common.service';

@Entity({
  name: 'wools',
  schema: 'dictionaries'
})
export class WoolEntity extends BaseDictionaryEntity implements BaseDictionary {
  @Column( {type: 'enum', enum: PetKind})
  @ApiProperty({enum: CommonService.enumToArray(PetKind), example: PetKind.dog})
  readonly type: PetKind;
}
