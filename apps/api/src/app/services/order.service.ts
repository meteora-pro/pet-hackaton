import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OrderEntity} from "../entities/order.entity";

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity>{
  constructor(@InjectRepository(OrderEntity) repository: Repository<OrderEntity>){
    super(repository);
  }
}
