import {MigrationInterface, QueryRunner} from "typeorm";
import {BreedEntity} from "../entities/dictionaries/breed.entity";

import {PetKind} from "@pet-hackaton/types";
import * as catBreeds from './initData/cats.json';
import * as dogBreeds from './initData/dogs.json';

import * as catColors from './initData/cat-colors.json';
import * as dogColors from './initData/dog-colors.json';

import * as catWools from './initData/cat-wool.json';
import * as dogWools from './initData/dog-wool.json';


import * as ears from './initData/ears.json';
import * as tails from './initData/tails.json';

import {ColorEntity} from "../entities/dictionaries/color.entity";
import {WoolEntity} from "../entities/dictionaries/wool.entity";
import {TailEntity} from "../entities/dictionaries/tail.entity";
import {EarEntity} from "../entities/dictionaries/ear.entity";

export class initDictinaries1604126232650 implements MigrationInterface {
    name = 'initDictinaries1604126232650'

    public async up(queryRunner: QueryRunner): Promise<void> {
      const breeds = [
        ...(catBreeds as BreedEntity[]).map( ({id, value}) => ({id, value, type: PetKind.cat }) as BreedEntity),
        ...dogBreeds.map( ({id, value}) => ({id, value, type: PetKind.dog }) as BreedEntity),
      ];
      await queryRunner.connection
          .createQueryBuilder()
          .createQueryBuilder()
          .insert()
          .into(BreedEntity)
          .values(breeds)
          .execute();

      const colors = [
        ...catColors.map( ({id, value}) => ({id, value, type: PetKind.cat }) as ColorEntity),
        ...dogColors.map( ({id, value}) => ({id, value, type: PetKind.dog }) as ColorEntity),
      ];
      await queryRunner.connection
        .createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into(ColorEntity)
        .values(colors)
        .execute();

      const wools = [
        ...catWools.map( ({id, value}) => ({id, value, type: PetKind.cat }) as WoolEntity),
        ...dogWools.map( ({id, value}) => ({id, value, type: PetKind.dog }) as WoolEntity),
      ];
      await queryRunner.connection
        .createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into(WoolEntity)
        .values(wools)
        .execute();

      await queryRunner.connection
        .createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into(TailEntity)
        .values(tails)
        .execute();

      await queryRunner.connection
        .createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into(EarEntity)
        .values(ears)
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
