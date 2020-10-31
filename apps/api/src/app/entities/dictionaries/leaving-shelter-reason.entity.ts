import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";

@Entity({
  name: 'leaving_shelter_reasons'
})
export class LeavingShelterReasonEntity extends BaseDictionaryEntity {}
