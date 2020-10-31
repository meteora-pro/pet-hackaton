import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {ApiTags} from "@nestjs/swagger";
import {OutReasonEntity} from "../../entities/dictionaries/out-reason.entity";
import {OutReasonService} from "../../services/dictionaries/out-reason.service";

@ApiTags('OutReason', 'dictionary')
@Crud({
  model: {
    type: OutReasonEntity
  }
})
@Controller('OutReasons')
export class OutReasonController implements CrudController<OutReasonEntity>{
  constructor(public service: OutReasonService){}
}
