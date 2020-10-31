import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
  name: 'dog_wools'
})
export class DogWoolEntity extends BaseDictionaryEntity {
  @ApiProperty()
  readonly type: PetKind = 'собака';
}
