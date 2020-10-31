import {MigrationInterface, QueryRunner} from "typeorm";
import { OutReasonCause, PetKind, Role, Sex, Size } from '../../../../../libs/types/src';
import { BaseDictionaryEntity } from '../entities/dictionaries/base.dictionary.entity';
import { BreedEntity } from '../entities/dictionaries/breed.entity';
import { ColorEntity } from '../entities/dictionaries/color.entity';
import { EarEntity } from '../entities/dictionaries/ear.entity';
import { TailEntity } from '../entities/dictionaries/tail.entity';
import { WoolEntity } from '../entities/dictionaries/wool.entity';
import { PetResponsibleOrganisationEntity } from '../entities/pet-responsible-organisation.entity';
import {PetEntity} from "../entities/pet.entity";
import { ShelterEntity } from '../entities/shelter.entity';
import { UserEntity } from '../entities/user.entity';
import * as rawDataSet from './data-set/parced-dataset.json';
import {existPhotos} from "./data-set/exists-photos";
import { CatchInformationEntity } from '../entities/catch-information.entity';
import { PetRegistrationHistoryEntity } from '../entities/pet-registration-history.entity';
import { OutReasonEntity } from '../entities/dictionaries/out-reason.entity';
import { ParasiteMedicineTreatmentEntity } from '../entities/parasite-medicine-treatment.entity';
import { VacinationEntity } from '../entities/vacination.entity';
import { HealthStatusEntity } from '../entities/health-status.entity';

export function parseSex(input: 'женский' | 'мужской' | string): Sex {
  switch(input.trim()) {
    case 'женский': return Sex.female;
    case 'мужской': return Sex.male;
    default: return null;
  }
}

export function parseSize(input: 'средний' | string): Size {
  switch(input.trim()) {
    case 'крупный': return Size.big;
    case 'средний': return Size.medium;
    case 'малый': return Size.small;
    default: return null;
  }
}

export function parsePetKind(input: 'собака' | 'кошка' | string): PetKind {
  switch(input.trim()) {
    case 'кошка': return PetKind.cat;
    case 'собака': return PetKind.dog;
    default: return null;
  }
}
export function findDictionaryByValue(searchValue: string, dictionary: BaseDictionaryEntity[], searchType?: PetKind): BaseDictionaryEntity {
  if (searchType) {
    return (dictionary as BreedEntity[]).find( ({value, type}) => value?.trim()?.toLocaleLowerCase() === searchValue?.trim()?.toLocaleLowerCase() && searchType === type );
  }
  return dictionary.find( ({value, }) => value?.trim()?.toLocaleLowerCase() === searchValue?.trim()?.toLocaleLowerCase());
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
  return {
    alias: userAlias,
    firstName: '',
    lastName: userAlias,
    password: userAlias,
    login: userAlias,
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
  ) {
  return {
    address: shelterAlias,
    index,
    organisation,
    headName,
  } as ShelterEntity;
}

export function generatePhotoUrl(shelter: ShelterEntity, cardNumber: string): string[] {
  const photoKey = `${shelter.index}. ${shelter.address}/${cardNumber}.jpg`;
  if (existPhotos.indexOf(photoKey) < 0) {
    return [];
  }
  return [`https://cdn.dev.meteora.pro/meteora-dev/hackaton/${encodeURIComponent(photoKey)}`];
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

export function parseParasites() {
  return {} as ParasiteMedicineTreatmentEntity;
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

export class importDataSet1604131358759 implements MigrationInterface {
    name = 'importDataSet1604131358759';

    public async up(queryRunner: QueryRunner): Promise<void> {
      rawDataSet.forEach(rawData => {
        Object.keys(rawData).forEach( key => {
          rawData[key.trim()] = rawData[key];
        });
      });

      /** Причины выбытия */
      const allOutReasons = {};
      rawDataSet.forEach(rawData => {
        const outReasonAlias = rawData['причина выбытия'];
        allOutReasons[outReasonAlias] = {
          value: outReasonAlias,
        };
      });
      const outReasonRepository = queryRunner.connection.getRepository(OutReasonEntity);
      await outReasonRepository.insert(Object.values(allOutReasons));
      const allOutReasonsSaved = await outReasonRepository.find();


      /** Организации */
      const organisations: {[key: string]: PetResponsibleOrganisationEntity} = {};
      rawDataSet.forEach( rawData => {
        const organisationAlias = rawData['эксплуатирующая организация'];
        organisations[organisationAlias] = parseOrganisation(organisationAlias);
      });
      const organisationRepository = queryRunner.connection.getRepository(PetResponsibleOrganisationEntity);
      await organisationRepository.insert(Object.values(organisations));
      const allOrganisations = await organisationRepository.find();

      allOrganisations.forEach( (savedOrganisation) => {
        organisations[savedOrganisation.name] = savedOrganisation;
      });

      /** ЮЗЕРЫ */
      const allUsers: {[key: string]: UserEntity} = {};
      rawDataSet.forEach( rawData => {
        const headAlias = rawData['ф.и.о. руководителя приюта'];
        allUsers[headAlias] = parseUser(headAlias, Role.SHELTER_ADMIN);
        const alias = rawData['ф.и.о. ветеринарного врача'];
        allUsers[alias] = parseUser(alias, Role.SHELTER_USER);
        const owserAlias = rawData['ф.и.о. сотрудника по уходу за животным'];
        allUsers[owserAlias] = parseUser(owserAlias, Role.SHELTER_USER);
      });


      const userRepository = queryRunner.connection.getRepository(UserEntity);

      await userRepository.insert(Object.values(allUsers));
      const savedUsers = await userRepository.find();
      savedUsers.forEach( (user) => {
        allUsers[user.login] = user;
      });

      /** ПРИЮТЫ */
      const shelters: {[key: string]: ShelterEntity} = {};
      const shelterRepository = queryRunner.connection.getRepository(ShelterEntity);
      let shelterIndex = 0;
      rawDataSet.forEach( (rawData) => {
        const shelterAlias = rawData['адрес приюта'];
        if (!shelters[shelterAlias]) {
          shelterIndex++;
        }
        shelters[shelterAlias] = parseShelter(
          shelterAlias,
          shelterIndex,
          organisations[rawData['эксплуатирующая организация']],
          allUsers[rawData['ф.и.о. руководителя приюта']],
        );
      });
      await shelterRepository.insert(Object.values(shelters));
      const allShelters = await shelterRepository.find();
      allShelters.forEach( (shelter) => {
        shelters[shelter.address] = shelter;
      });


      /** Справочники */
      const breedRepository = queryRunner.connection.getRepository(BreedEntity);
      const colorRepository = queryRunner.connection.getRepository(ColorEntity);
      const woolRepository = queryRunner.connection.getRepository(WoolEntity);
      const earRepository = queryRunner.connection.getRepository(EarEntity);
      const tailRepository = queryRunner.connection.getRepository(TailEntity);

      const [breeds, colors, wools, ears, tails] = await Promise.all([
        breedRepository.find(),
        colorRepository.find(),
        woolRepository.find(),
        earRepository.find(),
        tailRepository.find(),
      ]);


      /** Акты отлова */

      const catchMap: {[key: string]: CatchInformationEntity} = {};
      rawDataSet.forEach( (rawData) => {
        const catchInformation = parseCatchInformation({
          orderId: rawData['заказ-наряд / акт о поступлении животного №'],
          captureActId: rawData['акт отлова №'],
          captureAt: parseDate(rawData['заказ-наряд дата/ акт о поступлении животного, дата']),
          district: rawData['административный округ'],
          catchingAddress: rawData['адрес места отлова'],
        });
        const catchKey = getCatchKey(catchInformation);
        catchMap[catchKey] = catchInformation;

      });
      const catchRepository = queryRunner.connection.getRepository(CatchInformationEntity);
      await catchRepository.insert(Object.values(catchMap));
      const allCatchDocuments = await catchRepository.find();
      allCatchDocuments.forEach( (catchDoc) => {
        const catchKey = getCatchKey(catchDoc);
        catchMap[catchKey] = catchDoc;
      });

      /** Итсория регистрации */

      const registrationHistories = [];
      rawDataSet.forEach( (rawData, index) => {
        const registrationHistory = parseRegistrationHistory({
          arrivedAt: parseDate(rawData['дата поступления в приют']), // дата поступления в приют
          arrivedAct: rawData['акт №'], // акт приема №
          outAt: parseDate(rawData['дата выбытия из приюта']), // дата выбытия из приюта
          outReason: findDictionaryByValue(rawData['причина выбытия'], allOutReasonsSaved), // причина выбытия
          outAct: rawData['акт/договор №'], // № акта/договора выбытия
        });
        registrationHistories.push(registrationHistory);
      });
      const registrationHistoryRepository = queryRunner.connection.getRepository(PetRegistrationHistoryEntity);
      await registrationHistoryRepository.insert(registrationHistories);
      const savedRegistrationHistories = await registrationHistoryRepository.find({order: { id: 'ASC' }});

      /** Питомцы */

      const preparedDataSet = rawDataSet.map( (rawData, index) => {

        const shelterAlias = rawData['адрес приюта'];
        const shelter = shelters[shelterAlias];

        const cardNumber = rawData['карточка учета животного №'];
        const petKind = parsePetKind(rawData['вид']);

        const catchKey = getCatchKey(parseCatchInformation({
          orderId: rawData['заказ-наряд / акт о поступлении животного №'],
          captureActId: rawData['акт отлова №'],
          captureAt: parseDate(rawData['заказ-наряд дата/ акт о поступлении животного, дата']),
          district: rawData['административный округ'],
          catchingAddress: rawData['адрес места отлова'],
        }));
        const catchInformation = catchMap[catchKey];
        const registrationHistory = savedRegistrationHistories[index];
        const pet = {
           cardNumber,
           kind: petKind,
           age: rawData['возраст, год'],
           weight: parseFloat((rawData['вес, кг'] + '').replace(',', '.')),
           name: rawData['кличка'],
           sex: parseSex(rawData['пол']),
           breed: findDictionaryByValue(rawData['порода'], breeds, petKind),
           color: findDictionaryByValue(rawData['окрас'], colors, petKind),
           wool: findDictionaryByValue(rawData['шерсть'], wools, petKind),
           ears: findDictionaryByValue(rawData['уши'], ears),
           tail: findDictionaryByValue(rawData['хвост'], tails),
           size: parseSize(rawData['размер']),
           signs: rawData['особые приметы'],
           place: rawData['Вольер №'] + '',
           labelId: rawData['идентификационная метка'] + '',
           sterilizationAt: rawData['дата стерилизации'],
           isSocializated: parseBoolean(rawData['Социализировано (да/нет)']),
           shelter,
           photos: generatePhotoUrl(shelter, cardNumber + ''),
           veterinarian: allUsers[rawData['ф.и.о. ветеринарного врача']],
           organization: organisations[rawData['эксплуатирующая организация']],
           catchInformation,
           registrationHistory,
           petCareTaker: allUsers[rawData['ф.и.о. сотрудника по уходу за животным']],
        } as PetEntity;

        return pet;
      });

      await queryRunner.connection
        .createQueryBuilder()
        .insert()
        .into(PetEntity)
        .values(preparedDataSet)
        .execute();

      const petRepository = queryRunner.connection.getRepository(PetEntity);
      const allSavedPets = await petRepository.find({ order: { id: 'ASC' }});

      const healthCheckRepository = queryRunner.connection.getRepository(PetEntity);

      const healthChecks = [];
      const parasites = [];
      const vactinations = [];
      rawDataSet.forEach( (rawData, index) => {
        const pet = allSavedPets[index];
        /** Сведения о вакцинации */
        /** Сведения об обработке от экто- и эндопаразитов */


        /** Сведения о состоянии здоровья */
        const healthCheck = parseHealthCheck({
          pet,
          date: parseDate(rawData['дата осмотра']),
          anamnesis: rawData['анамнез'],
        });
        healthChecks.push(healthCheck);
      });

      await registrationHistoryRepository.insert(healthChecks);
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
