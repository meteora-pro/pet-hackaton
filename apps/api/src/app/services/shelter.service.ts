import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ShelterEntity} from "../entities/shelter.entity";

@Injectable()
export class ShelterService extends TypeOrmCrudService<ShelterEntity>{
  constructor(@InjectRepository(ShelterEntity) repository: Repository<ShelterEntity>){
    super(repository);
  }
}
