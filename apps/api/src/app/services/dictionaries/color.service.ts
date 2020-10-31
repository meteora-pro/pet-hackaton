import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ColorEntity} from "../../entities/dictionaries/color.entity";

@Injectable()
export class ColorService extends TypeOrmCrudService<ColorEntity>{
  constructor(@InjectRepository(ColorEntity) repository: Repository<ColorEntity>){
    super(repository);
  }
}
