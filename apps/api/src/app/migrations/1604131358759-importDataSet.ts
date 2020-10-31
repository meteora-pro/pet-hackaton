import {MigrationInterface, QueryRunner} from "typeorm";
import * as rawDataSet from './data-set/parced-dataset.json';
import {InitDataParser} from "../normalisation/init-data.parser";

export class importDataSet1604131358759 implements MigrationInterface {
    name = 'importDataSet1604131358759';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await InitDataParser.parseXlsxJsonAndPutToDb(rawDataSet, queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
