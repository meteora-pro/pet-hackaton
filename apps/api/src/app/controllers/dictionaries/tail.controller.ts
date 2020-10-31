import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {TailEntity} from "../../entities/dictionaries/tail.entity";
import {TailService} from "../../services/dictionaries/tail.service";

@Crud({
  model: {
    type: TailEntity
  }
})
@Controller('tails')
export class TailController implements CrudController<TailEntity>{
  constructor(public service: TailService){}
}
