import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Column, Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
  name: 'breeds'
})
export class BreedEntity extends BaseDictionaryEntity {
  @Column( {type: 'string', enum: PetKind})
  @ApiProperty()
  readonly type: PetKind;
}
