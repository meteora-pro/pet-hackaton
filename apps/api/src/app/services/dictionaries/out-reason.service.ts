import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OutReasonEntity} from "../../entities/dictionaries/out-reason.entity";

@Injectable()
export class OutReasonService extends TypeOrmCrudService<OutReasonEntity>{
  constructor(@InjectRepository(OutReasonEntity) repository: Repository<OutReasonEntity>){
    super(repository);
  }
}
