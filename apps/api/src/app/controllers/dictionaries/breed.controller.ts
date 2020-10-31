import { Controller, UseGuards } from '@nestjs/common';
import {BreedEntity} from "../../entities/dictionaries/breed.entity";
import {Crud, CrudController} from "@nestjsx/crud";
import {BreedService} from "../../services/dictionaries/breed.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';

@ApiTags('Breed', 'dictionary')
@Crud({
  model: {
    type: BreedEntity
  }
})

@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('breeds')
export class BreedController implements CrudController<BreedEntity>{
  constructor(public service: BreedService){}
}
