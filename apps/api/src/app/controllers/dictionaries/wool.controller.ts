import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {WoolEntity} from "../../entities/dictionaries/wool.entity";
import {WoolService} from "../../services/dictionaries/wool.service";

@Crud({
  model: {
    type: WoolEntity
  }
})
@Controller('cat-Wool')
export class WoolController implements CrudController<WoolEntity>{
  constructor(public service: WoolService){}
}
