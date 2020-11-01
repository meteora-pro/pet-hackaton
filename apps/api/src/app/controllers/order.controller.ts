import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDataResponseDto } from '../authentication/dto/user-data-response.dto';
import { AccessTokenGuard } from '../authentication/guards/access-token.guard';
import {OrderEntity} from "../entities/order.entity";
import {OrderService} from "../services/order.service";

@ApiBearerAuth()
@ApiTags('Order', 'entity')
@UseGuards(AccessTokenGuard)
@Crud({
  model: {
    type: OrderEntity
  },
  query: {
    join: {
      pet: {
        eager: true,
      },
      'pet.shelter': {
        eager: true,
      },
    },
  }
})
@CrudAuth({
  property: 'user',
  filter: (user: UserDataResponseDto) => {
    if (!user) {
      return null;
    }
    if (user.allowedShelters.length) {
      return {'pet.shelter.id': {$in: user.allowedShelters}};
    }
    return {'pet.shelter.id': -1};
  },
})
@Controller('orders')
export class OrderController implements CrudController<OrderEntity>{
  constructor(public service: OrderService){}
}
