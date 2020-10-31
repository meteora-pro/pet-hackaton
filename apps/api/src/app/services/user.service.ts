import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity>{
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>){
    super(repository);
  }
}
