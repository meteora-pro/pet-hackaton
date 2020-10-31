import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";

@Entity({
  name: 'dog_colors'
})
export class DogColorEntity extends BaseDictionaryEntity {
  readonly type: PetKind = 'собака';
}
