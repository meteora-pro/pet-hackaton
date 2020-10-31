import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";

@Entity({
  name: 'cat_breeds'
})
export class CatBreedEntity extends BaseDictionaryEntity {
  readonly type: PetKind = 'кошка';
}
