import { UserEntity } from './user.entity';
import {allDictionaries} from "./dictionaries/all.dictionaries";
import { PetEntity } from './pet.entity';
import {ShelterEntity} from "./shelter.entity";
import { TrusteeEntity } from './trustee.entity';
import { PhysicalPersonEntity } from './physical-person.entity';
import { PassportInfoEntity } from './passport-Info.entity';
import { CatchInformationEntity } from './catch-information.entity';
import { PetRegistrationHistoryEntity } from './pet-registration-history.entity';
import { ParasiteMedicineTreatmentEntity } from './parasite-medicine-treatment.entity';
import { HealthStatusEntity } from './health-status.entity';
import { VacinationEntity } from './vacination.entity';
import { PetResponsibleOrganisationEntity } from './pet-responsible-organisation.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PrefecturesEntity } from './prefecture.entity';

export const allEntities = [
  UserEntity,
  ShelterEntity,
  PetEntity,
  UserEntity,
  TrusteeEntity,
  PhysicalPersonEntity,
  PassportInfoEntity,
  CatchInformationEntity,
  PetRegistrationHistoryEntity,
  ParasiteMedicineTreatmentEntity,
  HealthStatusEntity,
  VacinationEntity,
  PetResponsibleOrganisationEntity,
  RefreshTokenEntity,
  PrefecturesEntity,
  ...allDictionaries,
];
