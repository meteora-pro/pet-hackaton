import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import { BaseDictionary } from '@pet-hackaton/types';

@Entity({
  name: 'ears',
  schema: 'dictionaries'
})
export class EarEntity extends BaseDictionaryEntity implements BaseDictionary {
}
