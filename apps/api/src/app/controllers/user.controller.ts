import { Controller, UseGuards } from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {UserEntity} from "../entities/user.entity";
import {UserService} from "../services/user.service";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../authentication/guards/access-token.guard';

@ApiTags('User', 'entity')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: UserEntity
  }
})
@Controller('users')
export class UserController implements CrudController<UserEntity>{
  constructor(public service: UserService){}
}
