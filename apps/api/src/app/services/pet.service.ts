import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PetEntity} from "../entities/pet.entity";

@Injectable()
export class PetService extends TypeOrmCrudService<PetEntity>{
  constructor(@InjectRepository(PetEntity) repository: Repository<PetEntity>){
    super(repository);
  }
}
