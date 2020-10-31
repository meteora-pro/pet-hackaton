import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@ValidatorConstraint({ name: 'UserEmailAlreadyExist', async: true })
@Injectable()
export class UserEmailExistValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserEntity)
        private userEntityRepository: Repository<UserEntity>,
    ) {}

    async validate(email: string) {
        const userCount = await this.userEntityRepository.count({ email });
        return userCount === 0;
    }

    defaultMessage() {
        return 'Email already exist';
    }
}
