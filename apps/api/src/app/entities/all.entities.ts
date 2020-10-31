import { UserEntity } from './user.entity';
import {allDictionaries} from "./dictionaries/all.dictionaries";

export const allEntities = [
  UserEntity,
  ...allDictionaries,
];
