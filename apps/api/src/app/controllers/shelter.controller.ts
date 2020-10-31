import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {ShelterEntity} from "../entities/shelter.entity";
import {ShelterService} from "../services/shelter.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Shelter', 'entity')
@Crud({
  model: {
    type: ShelterEntity
  }
})
@Controller('Shelter')
export class ShelterController implements CrudController<ShelterEntity>{
  constructor(public service: ShelterService){}
}
