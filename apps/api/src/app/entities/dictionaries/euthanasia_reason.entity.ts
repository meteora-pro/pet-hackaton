import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";

@Entity({
  name: 'euthanasia_reasons'
})
export class EuthanasiaReasonEntity extends BaseDictionaryEntity {}
