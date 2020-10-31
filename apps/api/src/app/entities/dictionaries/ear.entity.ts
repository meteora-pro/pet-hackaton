import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import { BaseDictionary } from '@pet-hackaton/types';

@Entity({
  name: 'ears'
})
export class EarEntity extends BaseDictionaryEntity implements BaseDictionary {
}
