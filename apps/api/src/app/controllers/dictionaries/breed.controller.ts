import {Controller} from "@nestjs/common";
import {BreedEntity} from "../../entities/dictionaries/breed.entity";
import {Crud, CrudController} from "@nestjsx/crud";
import {BreedService} from "../../services/dictionaries/breed.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Breed', 'dictionary')
@Crud({
  model: {
    type: BreedEntity
  }
})
@Controller('breeds')
export class BreedController implements CrudController<BreedEntity>{
  constructor(public service: BreedService){}
}
