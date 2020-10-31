import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";

@Entity({
  name: 'cat_colors'
})
export class CatColorEntity extends BaseDictionaryEntity {
  readonly type: PetKind = 'кошка';
}
