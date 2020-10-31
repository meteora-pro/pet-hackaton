import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";

@Entity({
  name: 'tails'
})
export class TailEntity extends BaseDictionaryEntity {
}
