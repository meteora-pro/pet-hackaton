import { UserEntity } from './user.entity';
import {allDictionaries} from "./dictionaries/all.dictionaries";
import { PetEntity } from './pet.entity';
import {ShelterEntity} from "./shelter.entity";
import { OrganizationEntity } from './organization.entity';
import { TrusteeEntity } from './trustee.entity';

export const allEntities = [
  UserEntity,
  ShelterEntity,
  PetEntity,
  UserEntity,
  OrganizationEntity,
  TrusteeEntity,
  ...allDictionaries,
];
