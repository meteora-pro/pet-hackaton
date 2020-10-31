import { Controller, UseGuards } from '@nestjs/common';
import {BreedEntity} from "../../entities/dictionaries/breed.entity";
import {Crud, CrudController} from "@nestjsx/crud";
import {BreedService} from "../../services/dictionaries/breed.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../authentication/guards/access-token.guard';
import { Roles } from '../../common/decorators/method-decorators/roles.decorator';
import { Role } from '@pet-hackaton/types';

@ApiTags('Breed', 'dictionary')
@Crud({
  model: {
    type: BreedEntity
  }
})

@ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
// @Roles(Role.SHELTER_USER)
@Controller('breeds')
export class BreedController implements CrudController<BreedEntity>{
  constructor(public service: BreedService){}
}
