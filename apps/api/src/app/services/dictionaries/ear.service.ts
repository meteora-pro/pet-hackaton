import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {EarEntity} from "../../entities/dictionaries/ear.entity";

@Injectable()
export class EarService extends TypeOrmCrudService<EarEntity>{
  constructor(@InjectRepository(EarEntity) repository: Repository<EarEntity>){
    super(repository);
  }
}
