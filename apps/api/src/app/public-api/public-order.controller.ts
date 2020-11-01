import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import {OrderEntity} from "../entities/order.entity";
import {OrderService} from "../services/order.service";

@ApiTags('Order')
@Crud({
  model: {
    type: OrderEntity,
  },
  routes: {
    only: ['createOneBase'],
  },
})
@Controller('public/orders')
export class PublicOrderController implements CrudController<OrderEntity> {
  constructor(public service: OrderService) {}
}
