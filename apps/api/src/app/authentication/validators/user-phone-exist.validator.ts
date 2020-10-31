import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@ValidatorConstraint({ name: 'UserPhoneAlreadyExist', async: true })
@Injectable()
export class UserPhoneExistValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserEntity)
        private userEntityRepository: Repository<UserEntity>,
    ) {}

    async validate(phone: string) {
        const userCount = await this.userEntityRepository.count({ phoneNumber: phone });
        return userCount === 0;
    }

    defaultMessage() {
        return 'Phone already exist';
    }
}
