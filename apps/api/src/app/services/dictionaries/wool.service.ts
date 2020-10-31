import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {WoolEntity} from "../../entities/dictionaries/wool.entity";

@Injectable()
export class WoolService extends TypeOrmCrudService<WoolEntity>{
  constructor(@InjectRepository(WoolEntity) repository: Repository<WoolEntity>){
    super(repository);
  }
}
