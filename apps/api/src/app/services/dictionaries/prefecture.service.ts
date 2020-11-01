import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrefectureEntity } from '../../entities/prefecture.entity';

@Injectable()
export class PrefectureService extends TypeOrmCrudService<PrefectureEntity>{
  constructor(@InjectRepository(PrefectureEntity) repository: Repository<PrefectureEntity>){
    super(repository);
  }
}
