import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@ValidatorConstraint({ name: 'UserNotFound', async: true })
@Injectable()
export class UserNotFoundValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(UserEntity)
        private userEntityRepository: Repository<UserEntity>,
    ) {}

    async validate(login: string) {
        const userCount = await this.userEntityRepository.count({
            where: [
                {
                    login: login,
                },
                {
                    email: login,
                },
                {
                    phoneNumber: login,
                },
            ],
        });
        return userCount > 0;
    }

    defaultMessage() {
        return 'User not found or incorrect password';
    }
}
