import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Column, Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
  name: 'colors'
})
export class ColorEntity extends BaseDictionaryEntity {
  @Column( {type: 'enum', enum: PetKind})
  @ApiProperty()
  readonly type: PetKind;
}
