import {Module} from "@nestjs/common";
import {PublicPetController} from "./public-pet.controller";
import {PetService} from "../services/pet.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PetEntity} from "../entities/pet.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  providers: [PetService],
  controllers: [PublicPetController],
})
export class PublicApiModule { }
