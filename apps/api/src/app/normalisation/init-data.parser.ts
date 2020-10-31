import {PrefectureEntity} from '../entities/prefecture.entity';
import * as existShelters from '../migrations/initData/shelters.json';
import {OutReasonEntity} from "../entities/dictionaries/out-reason.entity";
import {Logger} from "@nestjs/common";
import {PetResponsibleOrganisationEntity} from "../entities/pet-responsible-organisation.entity";
import {UserEntity} from "../entities/user.entity";
import {Role} from "@pet-hackaton/types";
import {ShelterEntity} from "../entities/shelter.entity";
import {BreedEntity} from "../entities/dictionaries/breed.entity";
import {ColorEntity} from "../entities/dictionaries/color.entity";
import {WoolEntity} from "../entities/dictionaries/wool.entity";
import {EarEntity} from "../entities/dictionaries/ear.entity";
import {TailEntity} from "../entities/dictionaries/tail.entity";
import {CatchInformationEntity} from "../entities/catch-information.entity";
import {PetRegistrationHistoryEntity} from "../entities/pet-registration-history.entity";
import {PetEntity} from "../entities/pet.entity";
import {
  findDictionaryByValue,
  generatePhotoUrl,
  getCatchKey,
  parseBoolean,
  parseCatchInformation,
  parseDate,
  parseHealthCheck,
  parseOrganisation, parseParasites,
  parsePetKind,
  parseRegistrationHistory,
  parseSex,
  parseShelter,
  parseSize,
  parseUser, parseVactination
} from "./parsing.helpers";
import {QueryRunner} from "typeorm";
import {ParasiteMedicineTreatmentEntity} from "../entities/parasite-medicine-treatment.entity";
import {VacinationEntity} from "../entities/vacination.entity";


export class InitDataParser {
  static async parseXlsxJsonAndPutToDb(rawDataSet, queryRunner: QueryRunner) {
    try {
      rawDataSet.forEach(rawData => {
        Object.keys(rawData).forEach( key => {
          rawData[key?.trim()] = typeof rawData[key] === 'string' ? rawData[key].trim() : rawData[key];
        });
      });

      /** Причины выбытия */
      const allOutReasons = {};
      rawDataSet.forEach(rawData => {
        const outReasonAlias = rawData['причина выбытия']?.trim();
        if (!outReasonAlias) {
          return;
        }
        allOutReasons[outReasonAlias] = {
          value: outReasonAlias,
        } as OutReasonEntity;
      });
      const outReasonRepository = queryRunner.connection.getRepository(OutReasonEntity);
      try {
        await outReasonRepository.insert(Object.values(allOutReasons));
      } catch(e) {
        Logger.log(e);
      }

      const allOutReasonsSaved = await outReasonRepository.find();
      const allUsers: {[key: string]: UserEntity} = {};

      const departmentUserAlias = 'ДЖКХ';
      allUsers[departmentUserAlias] = parseUser(departmentUserAlias, Role.DEPARTMENT_USER);

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
        const organisationUserName = savedOrganisation.name;
        allUsers[organisationUserName] = parseUser(organisationUserName, Role.ORGANIZATION_USER);
        allUsers[organisationUserName].organization = savedOrganisation;
      });

      /** Префектуры */
      const prefectures: {[key: string]: PrefectureEntity} = {};
      rawDataSet.forEach( rawData => {
        const prefectureAlias = rawData['административный округ'];
        prefectures[prefectureAlias] = {
          name: prefectureAlias,
        } as PrefectureEntity;
      });
      const prefectureRepository = queryRunner.connection.getRepository(PrefectureEntity);
      await prefectureRepository.insert(Object.values(prefectures));
      const prefecturesWithIds = await prefectureRepository.find();
      prefecturesWithIds.forEach( prefecture => {
        prefectures[prefecture.name] = prefecture;

        const prefectureUserName = prefecture.name;
        allUsers[prefectureUserName] = parseUser(prefectureUserName, Role.PREFECTURE_USER);
        allUsers[prefectureUserName].prefecture = prefecture;
      });

      /** ЮЗЕРЫ */
      const shelterUsers = {};

      rawDataSet.forEach( rawData => {
        const shelterAlias = rawData['адрес приюта'];
        shelterUsers[shelterAlias] = shelterUsers[shelterAlias] || {};
        const headAlias = rawData['ф.и.о. руководителя приюта'];
        const alias = rawData['ф.и.о. ветеринарного врача'];
        const ownerAlias = rawData['ф.и.о. сотрудника по уходу за животным'];
        allUsers[headAlias] = parseUser(headAlias, Role.SHELTER_ADMIN);
        allUsers[alias] = parseUser(alias, Role.MEDICAL_USER);
        allUsers[ownerAlias] = parseUser(ownerAlias, Role.SHELTER_USER);

        shelterUsers[shelterAlias] = {
          ...shelterUsers[shelterAlias],
          [headAlias]: allUsers[headAlias],
          [alias]: allUsers[alias],
          [ownerAlias]: allUsers[ownerAlias],
        };
      });

      const userRepository = queryRunner.connection.getRepository(UserEntity);

      await userRepository.insert(Object.values(allUsers));
      const savedUsers = await userRepository.find();
      savedUsers.forEach( (user) => {
        allUsers[user.login] = user;
      });

      /** ПРИЮТЫ */
      const sheltersDictionary = existShelters.reduce((acc, shelter) => ({
        ...acc,
        [shelter.address]: shelter,
      }), {});
      const shelters: {[key: string]: ShelterEntity} = {};

      const shelterRepository = queryRunner.connection.getRepository(ShelterEntity);
      let shelterIndex = 0;
      rawDataSet.forEach( (rawData) => {
        const shelterAlias = rawData['адрес приюта'];
        if (!shelters[shelterAlias]) {
          shelterIndex++;
        }
        const existShelter = sheltersDictionary[shelterAlias];
        shelters[shelterAlias] = parseShelter(
          shelterAlias,
          shelterIndex,
          organisations[rawData['эксплуатирующая организация']],
          allUsers[rawData['ф.и.о. руководителя приюта']],
          existShelter?.phone,
          existShelter?.name,
        );
      });
      await shelterRepository.insert(Object.values(shelters));
      const allShelters = await shelterRepository.find();

      const needToSaveShelterUsers = [];
      allShelters.forEach( (shelter) => {
        shelters[shelter.address] = shelter;

        Object.keys(shelterUsers[shelter.address]).forEach( userKey => {
          const savedUser = allUsers[userKey];
          savedUser.shelter = shelter;
          needToSaveShelterUsers.push(savedUser);
        });
      });
      await userRepository.save(needToSaveShelterUsers);


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
      rawDataSet.forEach( rawData => {
        const registrationHistory = parseRegistrationHistory({
          arrivedAt: parseDate(rawData['дата поступления в приют']), // дата поступления в приют
          arrivedAct: rawData['акт №'], // акт приема №
          outAt: parseDate(rawData['дата выбытия из приюта']), // дата выбытия из приюта
          outReason: findDictionaryByValue(rawData['причина выбытия'], allOutReasonsSaved),
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
      const parasitesRepository = queryRunner.connection.getRepository(ParasiteMedicineTreatmentEntity);
      const vactinationsRepository = queryRunner.connection.getRepository(VacinationEntity);

      const healthChecks = [];
      const allParasites = [];
      const allVactinations = [];
      rawDataSet.forEach( (rawData, index) => {
        const pet = allSavedPets[index];
        /** Сведения о вакцинации */
        const parasites = parseParasites(rawData, pet);
        if (parasites.length) {
          allParasites.push(...parasites);
        }
        /** Сведения об обработке от экто- и эндопаразитов */
        const vactionations = parseVactination(rawData, pet);
        if (vactionations.length) {
          allVactinations.push(...vactionations);
        }
        /** Сведения о состоянии здоровья */
        const healthCheck = parseHealthCheck({
          pet,
          date: parseDate(rawData['дата осмотра']),
          anamnesis: rawData['анамнез'],
        });
        healthChecks.push(healthCheck);
      });
      await Promise.all([
        healthCheckRepository.insert(healthChecks),
        parasitesRepository.insert(allParasites),
        vactinationsRepository.insert(allVactinations),
      ]);
    } catch (e) {
      Logger.error(e.toString());
    }
  }
}
