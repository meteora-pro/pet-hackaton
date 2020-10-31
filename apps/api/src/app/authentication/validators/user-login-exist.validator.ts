import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@ValidatorConstraint({ name: 'UserLoginAlreadyExist', async: true })
@Injectable()
export class UserLoginExistValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserEntity)
        private userEntityRepository: Repository<UserEntity>,
    ) {}

    async validate(login: string) {
        const userCount = await this.userEntityRepository.count({ login });
        return userCount === 0;
    }

    defaultMessage() {
        return 'Login already exist';
    }
}
