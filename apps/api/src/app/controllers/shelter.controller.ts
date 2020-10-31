import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import {ShelterEntity} from "../entities/shelter.entity";
import {ShelterService} from "../services/shelter.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDataResponseDto } from '../authentication/dto/user-data-response.dto';
import { AccessTokenGuard } from '../authentication/guards/access-token.guard';

@ApiBearerAuth()
@ApiTags('Shelter', 'entity')
// @UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: ShelterEntity
  }
})
@CrudAuth({
  property: 'user',
  filter: (user: UserDataResponseDto) => {
    if (!user) {
      return null;
    }
    if (user.allowedShelters.length) {
      return {id: {$in: user.allowedShelters}};
    }
    return {id: -1};
  },
})
@Controller('shelters')
export class ShelterController implements CrudController<ShelterEntity>{
  constructor(public service: ShelterService){}
}
