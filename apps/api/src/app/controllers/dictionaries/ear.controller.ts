import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {EarEntity} from "../../entities/dictionaries/ear.entity";
import {EarService} from "../../services/dictionaries/ear.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Ear', 'dictionary')
@Crud({
  model: {
    type: EarEntity
  }
})
@Controller('ear')
export class EarController implements CrudController<EarEntity>{
  constructor(public service: EarService){}
}
