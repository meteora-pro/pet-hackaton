import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";

@Entity({
  name: 'ears'
})
export class EarsEntity extends BaseDictionaryEntity {
}
