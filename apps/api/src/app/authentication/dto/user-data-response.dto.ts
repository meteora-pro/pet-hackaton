import { Expose } from 'class-transformer';
import { Role, UserData } from '@pet-hackaton/types';
import { ApiProperty } from '@nestjs/swagger';
import { PrefectureEntity } from '../../entities/prefecture.entity';
import { PetResponsibleOrganisationEntity } from '../../entities/pet-responsible-organisation.entity';
import { ShelterEntity } from '../../entities/shelter.entity';

export class UserDataResponseDto implements UserData {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  login: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: Role;

  @ApiProperty()
  @Expose()
  allowedShelters: number[];

  @ApiProperty()
  @Expose()
  shelter?: ShelterEntity;

  @ApiProperty()
  @Expose()
  organization?: PetResponsibleOrganisationEntity;

  @ApiProperty()
  @Expose()
  prefecture?: PrefectureEntity;

}
