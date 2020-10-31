import {Controller} from "@nestjs/common";
import {BreedEntity} from "../../entities/dictionaries/breed.entity";
import {Crud, CrudController} from "@nestjsx/crud";
import {BreedService} from "../../services/dictionaries/breed.service";

@Crud({
  model: {
    type: BreedEntity
  }
})
@Controller('breed')
export class BreedController implements CrudController<BreedEntity>{
  constructor(public service: BreedService){}
}
