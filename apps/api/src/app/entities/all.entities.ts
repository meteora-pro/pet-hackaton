import { UserEntity } from './user.entity';
import {allDictionaries} from "./dictionaries/all.dictionaries";
import { PetEntity } from './pet.entity';
import {ShelterEntity} from "./shelter.entity";
import { OrganizationEntity } from './organization.entity';
import { TrusteeEntity } from './trustee.entity';
import { PhysicalPersonEntity } from './physical-person.entity';
import { PassportInfoEntity } from './passport-Info.entity';

export const allEntities = [
  UserEntity,
  ShelterEntity,
  PetEntity,
  UserEntity,
  OrganizationEntity,
  TrusteeEntity,
  PhysicalPersonEntity,
  PassportInfoEntity,
  ...allDictionaries,
];
