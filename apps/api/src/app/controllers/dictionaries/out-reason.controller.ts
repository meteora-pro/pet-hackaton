import { Controller, UseGuards } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {OutReasonEntity} from "../../entities/dictionaries/out-reason.entity";
import {OutReasonService} from "../../services/dictionaries/out-reason.service";
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';

@ApiTags('OutReason', 'dictionary')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: OutReasonEntity
  }
})
@Controller('OutReasons')
export class OutReasonController implements CrudController<OutReasonEntity>{
  constructor(public service: OutReasonService){}
}
