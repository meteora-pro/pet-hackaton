import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
  name: 'cat_breeds'
})
export class CatBreedEntity extends BaseDictionaryEntity {
  @ApiProperty()
  readonly type: PetKind = 'кошка';
}
