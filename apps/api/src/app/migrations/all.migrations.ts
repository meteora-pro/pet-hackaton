import {initMigration1604125399018} from "./1604125399018-initMigration";
import {additionalFields1604125896983} from "./1604125896983-additionalFields";
import {initDictinaries1604126232650} from "./1604126232650-initDictinaries";
import { changeSchema1604129007164 } from './1604129007164-change-schema';

export const allMigrations = [
  initMigration1604125399018,
  additionalFields1604125896983,
  initDictinaries1604126232650,
  changeSchema1604129007164
];
