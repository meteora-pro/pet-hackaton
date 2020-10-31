import {PetKind, Role, Sex, Size} from "@pet-hackaton/types";
import {BaseDictionaryEntity} from "../entities/dictionaries/base.dictionary.entity";
import {BreedEntity} from "../entities/dictionaries/breed.entity";
import {Logger} from "@nestjs/common";
import {hashUserPassword} from "../authentication/services/hash-password.utils";
import {UserEntity} from "../entities/user.entity";
import {PetResponsibleOrganisationEntity} from "../entities/pet-responsible-organisation.entity";
import {ShelterEntity} from "../entities/shelter.entity";
import {existPhotos} from "../migrations/data-set/exists-photos";
import {CatchInformationEntity} from "../entities/catch-information.entity";
import {PetRegistrationHistoryEntity} from "../entities/pet-registration-history.entity";
import {ParasiteMedicineTreatmentEntity} from "../entities/parasite-medicine-treatment.entity";
import {VacinationEntity} from "../entities/vacination.entity";
import {HealthStatusEntity} from "../entities/health-status.entity";

export function parseSex(input: 'женский' | 'мужской' | string): Sex {
  switch(input?.trim()) {
    case 'женский': return Sex.female;
    case 'мужской': return Sex.male;
    default: return null;
  }
}

export function parseSize(input: 'средний' | string): Size {
  switch(input?.trim()) {
    case 'крупный': return Size.big;
    case 'средний': return Size.medium;
    case 'малый': return Size.small;
    default: return null;
  }
}

export function parsePetKind(input: 'собака' | 'кошка' | string): PetKind {
  switch(input?.trim()) {
    case 'кошка': return PetKind.cat;
    case 'собака': return PetKind.dog;
    default: return null;
  }
}
export function findDictionaryByValue(searchValue: string, dictionary: BaseDictionaryEntity[], searchType?: PetKind): BaseDictionaryEntity {
  if (!searchType) {
    return null;
  }
  try {
    if (searchType) {
      return (dictionary as BreedEntity[]).find( ({value, type}) => value?.trim()?.toLocaleLowerCase() === searchValue?.trim()?.toLocaleLowerCase() && searchType === type );
    }
    return dictionary.find( ({value, }) => value?.trim()?.toLocaleLowerCase() === searchValue?.trim()?.toLocaleLowerCase());

  } catch (e) {
    Logger.log(e);
    return null;
  }
}

export function parseBoolean(input: string): boolean {
  switch(input?.trim()?.toLowerCase()) {
    case 'да': return true;
    case 'нет': return false;
    default: return null;
  }
}

export function parseDate(date: string): Date {
  return new Date(Date.parse('3/18/2020'));
}

export function parseUser(userAlias: string, role: Role) {
  const { passwordHash, salt } = hashUserPassword('123123');
  return {
    alias: userAlias,
    firstName: '',
    lastName: userAlias,
    password: passwordHash,
    salt,
    login: userAlias.replace('/ /g', '_'),
    role,
  } as UserEntity;
}

export function parseOrganisation(organisationAlias: string) {
  return {
    address: '',
    name: organisationAlias,
  } as PetResponsibleOrganisationEntity;
}

export function parseShelter(shelterAlias: string,
                             index: number,
                             organisation: PetResponsibleOrganisationEntity,
                             headName: UserEntity,
                             phone: string,
                             name: string,
) {
  return {
    address: shelterAlias,
    index,
    organisation,
    phone,
    name,
    headName,
  } as ShelterEntity;
}

export function generatePhotoUrl(shelter: ShelterEntity, cardNumber: string): string[] {
  const photoKey = `${shelter.index}. ${shelter.address}/${cardNumber}.jpg`;
  if (existPhotos.indexOf(photoKey) < 0) {
    return [];
  }
  const basePath = process.env.BASE_PHOTO_URL || 'https://cdn.dev.meteora.pro/meteora-dev/hackaton/';
  return [`${basePath}${encodeURIComponent(photoKey)}`];
}

export function parseCatchInformation({
                                        captureActId,
                                        orderId,
                                        captureAt,
                                        district,
                                        catchingAddress,
                                      }) {
  return {
    captureActId, // акт отлова №
    orderId, // заказ-наряд / акт о поступлении животного №
    captureAt, // заказ-наряд дата/ акт о поступлении животного, дата
    district, // административный округ
    catchingAddress, // адрес места отлова
  } as CatchInformationEntity;
}

export function getCatchKey({
                              captureActId,
                              orderId,
                              captureAt,
                              district,
                              catchingAddress,
                            }: CatchInformationEntity) {
  return [
    captureActId,
    orderId,
    captureAt,
    district,
    catchingAddress,
  ].join(',');
}

export function parseRegistrationHistory({
                                           arrivedAt,
                                           arrivedAct,
                                           outAt,
                                           outReason,
                                           outAct,
                                         }) {
  return {
    arrivedAt, // дата поступления в приют
    arrivedAct, // акт приема №
    outAt, // дата выбытия из приюта
    outReason, // причина выбытия
    outAct, // № акта/договора выбытия
  } as PetRegistrationHistoryEntity;
}

export function createRegistrationHistoryMapKey({
                                                  arrivedAt,
                                                  arrivedAct,
                                                  outAt,
                                                  outReason,
                                                  outAct,
                                                }) {
  return [
    arrivedAt,
    arrivedAct,
    outAt,
    outReason,
    outAct,
  ].join(',');
}

export function parseParasites(rawData, pet) {
  const dates = (rawData['дата'] || '').trim().split(/\n|\s/g).filter(v => !!v.trim());
  const names = (rawData['название препарата'] || '').trim().split(/\n|[\s\n]{2,}/g).filter(v => !!v.trim());
  const doses = ((rawData['доза'] + '') || '').trim().split(/\n|\s{3,}/g);
  if (dates.length != names.length || doses.length != names.length) {
    Logger.log(`|${dates}|${names}|${doses}|${pet.labelId}`);
  }
  return dates.map( (date, index) => {
    return {
      date: parseDate(date),
      medicineName: names[index],
      medicineDose: doses[index],
      pet,
    } as ParasiteMedicineTreatmentEntity;
  });
}

export function parseVactination() {
  return {} as VacinationEntity;
}

export function parseHealthCheck({
   pet,
   date,
   anamnesis,
 }) {
  return {
    date,
    anamnesis,
    weight: pet.weight,
    pet,
  } as HealthStatusEntity;
}
