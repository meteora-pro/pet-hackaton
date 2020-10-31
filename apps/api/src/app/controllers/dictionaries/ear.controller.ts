import { Controller, UseGuards } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {EarEntity} from "../../entities/dictionaries/ear.entity";
import {EarService} from "../../services/dictionaries/ear.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';

@ApiTags('Ear', 'dictionary')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: EarEntity
  }
})
@Controller('ears')
export class EarController implements CrudController<EarEntity>{
  constructor(public service: EarService){}
}
