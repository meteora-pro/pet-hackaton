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
  }
})
@Controller('pets')
export class PetController implements CrudController<PetEntity>{
  constructor(public service: PetService){}
}
