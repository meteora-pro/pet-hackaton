import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import {PetKind} from "@pet-hackaton/types";

@Entity({
  name: 'dog_breeds'
})
export class DogBreedEntity extends BaseDictionaryEntity {
  readonly type: PetKind = 'собака';
}
