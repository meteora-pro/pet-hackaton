import { Controller, UseGuards } from '@nestjs/common';
import {BreedEntity} from "../../entities/dictionaries/breed.entity";
import {Crud, CrudController} from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';
import { PrefectureEntity } from '../../entities/prefecture.entity';
import { PrefectureService } from '../../services/dictionaries/prefecture.service';

@ApiTags('Prefecture', 'dictionary')
@Crud({
  model: {
    type: BreedEntity
  }
})

@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('prefecture')
export class PrefectureController implements CrudController<PrefectureEntity>{
  constructor(public service: PrefectureService){}
}
