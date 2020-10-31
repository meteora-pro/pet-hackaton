import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";

@Entity({
  name: 'cat_wools'
})
export class CatWoolEntity extends BaseDictionaryEntity {
  readonly type: PetKind = 'кошка';
}
