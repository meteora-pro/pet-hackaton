import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {TailEntity} from "../../entities/dictionaries/tail.entity";

@Injectable()
export class TailsService extends TypeOrmCrudService<TailEntity>{
  constructor(@InjectRepository(TailEntity) repository: Repository<TailEntity>){
    super(repository);
  }
}
