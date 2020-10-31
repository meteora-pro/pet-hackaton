import {MigrationInterface, QueryRunner} from "typeorm";
import {PetEntity} from "../entities/pet.entity";
import * as rawDataSet from './data-set/parced-dataset.json';

export class importDataSet1604131358759 implements MigrationInterface {
    name = 'importDataSet1604131358759'

    public async up(queryRunner: QueryRunner): Promise<void> {
      const preparedDataSet = rawDataSet.map( rawData => {
        const pet = {
           name: rawData['кличка'],

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
