import {Module} from "@nestjs/common";
import {PublicPetController} from "./public-pet.controller";
import {PetService} from "../services/pet.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PetEntity} from "../entities/pet.entity";
import {PublicOrderController} from "./public-order.controller";
import {OrderService} from "../services/order.service";
import {OrderEntity} from "../entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, OrderEntity])],
  providers: [PetService, OrderService],
  controllers: [
    PublicPetController,
    PublicOrderController,
  ],
})
export class PublicApiModule { }
