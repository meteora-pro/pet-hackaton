import {MigrationInterface, QueryRunner} from "typeorm";
import { PetKind, Role, Sex, Size } from '../../../../../libs/types/src';
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
    return (dictionary as BreedEntity[]).find( ({value, type}) => value?.trim() === searchValue?.trim() && searchType === type );
  }
  return dictionary.find( ({value, }) => value?.trim() === searchValue?.trim());
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

export function parseShelter(shelterAlias: string, index: number, organisation: PetResponsibleOrganisationEntity) {
  return {
    address: shelterAlias,
    index,
    organisation,
  } as ShelterEntity;
}

export function generatePhotoUrl(shelter: ShelterEntity, cardNumber: string) {
  return ``;
}

export class importDataSet1604131358759 implements MigrationInterface {
    name = 'importDataSet1604131358759';

    public async up(queryRunner: QueryRunner): Promise<void> {
      rawDataSet.forEach(rawData => {
        Object.keys(rawData).forEach( key => {
          rawData[key.trim()] = rawData[key];
        });
      });

      const allUsers: {[key: string]: UserEntity} = {};
      const shelters: {[key: string]: ShelterEntity} = {};
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


      const shelterRepository = queryRunner.connection.getRepository(ShelterEntity);
      let shelterIndex = 0;
      rawDataSet.forEach( (rawData) => {
        const shelterAlias = rawData['адрес приюта'];
        if (!shelters[shelterAlias]) {
          shelterIndex++;
        }
        shelters[shelterAlias] = parseShelter(shelterAlias, shelterIndex, organisations[rawData['эксплуатирующая организация']]);
      });
      await shelterRepository.insert(Object.values(shelters));
      const allShelters = await shelterRepository.find();
      allShelters.forEach( (shelter) => {
        shelters[shelter.address] = shelter;
      });

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

      const preparedDataSet = rawDataSet.map( rawData => {
        const shelterAlias = rawData['адрес приюта'];
        const shelter = shelters[shelterAlias];

        const cardNumber = rawData['карточка учета животного №'];
        const petKind = parsePetKind(rawData['вид']);
        const pet = {
           cardNumber,
           kind: petKind,
           age: rawData['возраст, год'],
           weight: rawData['вес, кг'],
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
           photos: [
             generatePhotoUrl(shelter, cardNumber + ''),
           ],

        } as PetEntity;

        return pet;
      });

      await queryRunner.connection
        .createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into(PetEntity)
        .values([])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
