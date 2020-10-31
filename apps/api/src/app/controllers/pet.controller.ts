import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {PetEntity} from "../entities/pet.entity";
import {PetService} from "../services/pet.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Pet', 'entity')
@Crud({
  model: {
    type: PetEntity
  }
})
@Controller('Pet')
export class PetController implements CrudController<PetEntity>{
  constructor(public service: PetService){}
}
