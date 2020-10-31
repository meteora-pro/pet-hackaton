import {BaseDictionaryEntity} from "./base.dictionary.entity";
import {Entity} from "typeorm";
import { BaseDictionary } from '@pet-hackaton/types';

@Entity({
  name: 'tails'
})
export class TailEntity extends BaseDictionaryEntity implements BaseDictionary {
}
