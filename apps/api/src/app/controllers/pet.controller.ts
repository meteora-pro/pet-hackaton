import { Controller, Logger } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {PetEntity} from "../entities/pet.entity";
import {PetService} from "../services/pet.service";
import {ApiTags} from "@nestjs/swagger";
import { CommonService } from '../services/common/common.service';
import { PetKind } from '@pet-hackaton/types';

@ApiTags('Pet', 'entity')
@Crud({
  model: {
    type: PetEntity
  },
  query: {
    join: {
      shelter: {
        eager: true,
      },
      breed: {
        eager: true,
      },
      color: {
        eager: true,
      },
      wool: {
        eager: true,
      },
      ears: {
        eager: true,
      },
      tail: {
        eager: true,
      },
      size: {
        eager: true,
      },
      veterinarian: {
        eager: true,
      },
      organization: {
        eager: true,
      },
      trustee: {
        eager: true,
      },
      physical: {
        eager: true,
      },
      petCareTaker: {
        eager: true,
      },
      catchInformation: {
        eager: true,
      },
      registrationHistory: {
        eager: true,
      },
      parasiteTreatments: {
        eager: true,
      },
      vacinations: {
        eager: true,
      },
      healthchecks: {
        eager: true,
      },
    },
  }
})
@Controller('pets')
export class PetController implements CrudController<PetEntity>{
  constructor(public service: PetService){}
}
