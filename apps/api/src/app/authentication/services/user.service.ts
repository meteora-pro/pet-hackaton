import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserDataResponseDto } from '../dto/user-data-response.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userEntityRepository: Repository<UserEntity>,
    ) {}

    public async getUserData(id: number): Promise<UserDataResponseDto> {
        const user = await this.userEntityRepository.findOne(id);
        const userDataResponseDto = plainToClass(UserDataResponseDto, user, { excludeExtraneousValues: true });
        return userDataResponseDto;
    }
}
