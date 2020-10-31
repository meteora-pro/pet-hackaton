import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";

@Entity({
  name: 'death_reasons'
})
export class DeathReasonEntity extends BaseDictionaryEntity {}
