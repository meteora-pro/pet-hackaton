import { Controller, UseGuards } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {WoolEntity} from "../../entities/dictionaries/wool.entity";
import {WoolService} from "../../services/dictionaries/wool.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';

@ApiTags('Wool', 'dictionary')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: WoolEntity
  }
})
@Controller('wools')
export class WoolController implements CrudController<WoolEntity>{
  constructor(public service: WoolService){}
}
