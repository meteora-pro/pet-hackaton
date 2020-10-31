import { PrefecturesEntity } from '../entities/prefecture.entity';
import * as rawDataSet from "../migrations/data-set/parced-dataset.json";
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
  generatePhotoUrl, getCatchKey,
  parseBoolean, parseCatchInformation, parseDate, parseHealthCheck,
  parseOrganisation, parsePetKind,
  parseRegistrationHistory, parseSex, parseShelter,
  parseSize,
  parseUser
} from "./parsing.helpers";
import {QueryRunner} from "typeorm";


export class InitDataParser {
  static async parseXlsxJsonAndPutToDb(rawDataSet, queryRunner: QueryRunner) {
    try {
      rawDataSet.forEach(rawData => {
        Object.keys(rawData).forEach( key => {
          rawData[key?.trim()] = rawData[key];
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

      /** Префектуры */
      const prefectures: {[key: string]: PrefecturesEntity} = {};
      rawDataSet.forEach( rawData => {
        const prefectureAlias = rawData['административный округ'];
        const prefectures = {
          name: prefectureAlias,
        } as PrefecturesEntity;
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

      await healthCheckRepository.insert(healthChecks);
    } catch (e) {
      Logger.log(e);
    }
  }
}