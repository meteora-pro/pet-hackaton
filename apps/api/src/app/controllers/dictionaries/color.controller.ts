import { Controller, UseGuards } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {ColorEntity} from "../../entities/dictionaries/color.entity";
import {ColorService} from "../../services/dictionaries/color.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';

@ApiTags('Color', 'dictionary')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: ColorEntity
  }
})
@Controller('colors')
export class ColorController implements CrudController<ColorEntity>{
  constructor(public service: ColorService){}
}
