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
import {Logger} from "@nestjs/common";
import {hashUserPassword} from "../authentication/services/hash-password.utils";
import {inspect} from "util";
import {InitDataParser} from "../normalisation/init-data.parser";



export class importDataSet1604131358759 implements MigrationInterface {
    name = 'importDataSet1604131358759';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await InitDataParser.parseXlsxJsonAndPutToDb(rawDataSet, queryRunner)
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
