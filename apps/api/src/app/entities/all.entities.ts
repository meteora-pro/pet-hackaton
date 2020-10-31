import { UserEntity } from './user.entity';
import {allDictionaries} from "./dictionaries/all.dictionaries";
import { PetEntity } from './pet.entity';

export const allEntities = [
  UserEntity,
  PetEntity,
  ...allDictionaries,
];
