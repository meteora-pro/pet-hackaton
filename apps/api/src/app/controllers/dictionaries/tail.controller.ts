import { Controller, UseGuards } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {TailEntity} from "../../entities/dictionaries/tail.entity";
import {TailService} from "../../services/dictionaries/tail.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';

@ApiTags('Tail', 'dictionary')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: TailEntity
  }
})
@Controller('tails')
export class TailController implements CrudController<TailEntity>{
  constructor(public service: TailService){}
}
