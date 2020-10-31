import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1604125399018 implements MigrationInterface {
    name = 'initMigration1604125399018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "breeds_type_enum" AS ENUM('cat', 'dog')`);
        await queryRunner.query(`CREATE TABLE "breeds" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "type" "breeds_type_enum" NOT NULL, CONSTRAINT "PK_e89f6e1fbb29d28623b4feb2b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "colors_type_enum" AS ENUM('cat', 'dog')`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "type" "colors_type_enum" NOT NULL, CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ears" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_83d88234555fa89060dbfcbc30c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tails" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_8457d12533990b5b3cf2f59c462" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "wools_type_enum" AS ENUM('cat', 'dog')`);
        await queryRunner.query(`CREATE TABLE "wools" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "type" "wools_type_enum" NOT NULL, CONSTRAINT "PK_e4d47b9b2966607906d8595eeb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "users_role_enum" DEFAULT '2', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trustees" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying, "contactData" character varying NOT NULL, "middleName" character varying, "petId" integer, CONSTRAINT "PK_70fbff549690ba822befbed5fd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "pets_kind_enum" AS ENUM('cat', 'dog')`);
        await queryRunner.query(`CREATE TYPE "pets_sex_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "cardNumber" character varying, "kind" "pets_kind_enum", "age" integer, "weight" integer, "name" character varying, "sex" "pets_sex_enum", "breed" character varying, "color" character varying, "wool" character varying, "ears" character varying, "tail" character varying, "size" character varying, "signs" character varying, "place" integer, "photos" text array DEFAULT '{}'::text[], "character" character varying, "labelId" integer, "sterilizationAt" character varying, "sterilizationPlace" character varying, "isSocializated" boolean NOT NULL DEFAULT false, "veterinarianId" integer, "organizationId" integer, "petCareTakerNameId" integer, CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shelters" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying NOT NULL, "headNameId" integer, CONSTRAINT "PK_91ad96be54ee26203d624b96f5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trustees" ADD CONSTRAINT "FK_71c0b685e5eaf61e3c99f07b605" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_c185151b04e3177beed43d15d9c" FOREIGN KEY ("veterinarianId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_b974293da184fa9d69ac9fb4bda" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_0439ccba26b63d5320536802a79" FOREIGN KEY ("petCareTakerNameId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shelters" ADD CONSTRAINT "FK_4e9cec0aad9b6add62541396fd1" FOREIGN KEY ("headNameId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shelters" DROP CONSTRAINT "FK_4e9cec0aad9b6add62541396fd1"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_0439ccba26b63d5320536802a79"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_b974293da184fa9d69ac9fb4bda"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_c185151b04e3177beed43d15d9c"`);
        await queryRunner.query(`ALTER TABLE "trustees" DROP CONSTRAINT "FK_71c0b685e5eaf61e3c99f07b605"`);
        await queryRunner.query(`DROP TABLE "shelters"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TYPE "pets_sex_enum"`);
        await queryRunner.query(`DROP TYPE "pets_kind_enum"`);
        await queryRunner.query(`DROP TABLE "trustees"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "wools"`);
        await queryRunner.query(`DROP TYPE "wools_type_enum"`);
        await queryRunner.query(`DROP TABLE "tails"`);
        await queryRunner.query(`DROP TABLE "ears"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TYPE "colors_type_enum"`);
        await queryRunner.query(`DROP TABLE "breeds"`);
        await queryRunner.query(`DROP TYPE "breeds_type_enum"`);
    }

}
