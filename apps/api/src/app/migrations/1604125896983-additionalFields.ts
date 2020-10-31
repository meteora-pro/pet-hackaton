import {MigrationInterface, QueryRunner} from "typeorm";

export class additionalFields1604125896983 implements MigrationInterface {
    name = 'additionalFields1604125896983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "physical_persons" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "contacts" text array DEFAULT '{}'::text[], "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying NOT NULL, "passportId" integer, CONSTRAINT "REL_06456da90ced4b3c7b10be5815" UNIQUE ("passportId"), CONSTRAINT "PK_517e739eaa3ed892e208a6c7a6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passports" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "number" character varying NOT NULL, "place" character varying NOT NULL, "registrationAddress" character varying NOT NULL, "serialNumber" character varying NOT NULL, CONSTRAINT "PK_815eb61bea28dbd88b1a6b9207b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pets" ADD "phisycalId" integer`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "photos" SET DEFAULT '{}'::text[]`);
        await queryRunner.query(`ALTER TABLE "physical_persons" ADD CONSTRAINT "FK_06456da90ced4b3c7b10be58154" FOREIGN KEY ("passportId") REFERENCES "passports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_4622d5cbe62d8151bbba9744af6" FOREIGN KEY ("phisycalId") REFERENCES "physical_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_4622d5cbe62d8151bbba9744af6"`);
        await queryRunner.query(`ALTER TABLE "physical_persons" DROP CONSTRAINT "FK_06456da90ced4b3c7b10be58154"`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "photos" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "phisycalId"`);
        await queryRunner.query(`DROP TABLE "passports"`);
        await queryRunner.query(`DROP TABLE "physical_persons"`);
    }

}
