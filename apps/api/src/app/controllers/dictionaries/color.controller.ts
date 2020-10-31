import {Controller} from "@nestjs/common";
import {Crud, CrudController} from "@nestjsx/crud";
import {ColorEntity} from "../../entities/dictionaries/color.entity";
import {ColorService} from "../../services/dictionaries/color.service";

@Crud({
  model: {
    type: ColorEntity
  }
})
@Controller('color')
export class ColorController implements CrudController<ColorEntity>{
  constructor(public service: ColorService){}
}
