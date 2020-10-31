import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BreedEntity} from "../../entities/dictionaries/breed.entity";

@Injectable()
export class BreedService extends TypeOrmCrudService<BreedEntity>{
  constructor(@InjectRepository(BreedEntity) repository: Repository<BreedEntity>){
    super(repository);
  }
}
