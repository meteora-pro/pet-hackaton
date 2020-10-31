import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserDataResponseDto } from '../dto/user-data-response.dto';
import { UserEntity } from '../../entities/user.entity';
import { Role } from '@pet-hackaton/types';
import { ShelterEntity } from '../../entities/shelter.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(ShelterEntity) private sheltersRepository: Repository<ShelterEntity>
  ) {}

  public async getUserData(id: number): Promise<UserDataResponseDto> {
    const user = await this.userEntityRepository.findOne(id, {
      relations: ['shelter', 'organization', 'organization.shelters', 'prefecture', 'prefecture.shelters'],
    });
    const allowedShelters = await this.resolveShelters(user);
    const responseDto = plainToClass(UserDataResponseDto, user, { excludeExtraneousValues: true });
    responseDto.allowedShelters = allowedShelters;

    return responseDto;
  }

  private async resolveShelters(user: UserEntity): Promise<number[]> {
    switch (user.role) {
      case Role.SUPER_ADMIN:
      case Role.DEPARTMENT_USER: {
        return (await this.sheltersRepository.find()).map(entity => entity.id);
      }
      case Role.ORGANIZATION_USER: {
        return user.organization.shelters.map(entity => entity.id);
      }
      case Role.SHELTER_USER:
        return [user.shelter.id];
      case Role.PREFECTURE_USER:
      case Role.SHELTER_ADMIN:
      case Role.MEDICAL_USER:
        return user.prefecture.shelters.map(entity => entity.id);
    }
    return [];
  }
}
