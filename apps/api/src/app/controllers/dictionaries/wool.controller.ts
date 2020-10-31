import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {WoolEntity} from "../../entities/dictionaries/wool.entity";
import {WoolService} from "../../services/dictionaries/wool.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Wool', 'dictionary')
@Crud({
  model: {
    type: WoolEntity
  }
})
@Controller('wools')
export class WoolController implements CrudController<WoolEntity>{
  constructor(public service: WoolService){}
}
