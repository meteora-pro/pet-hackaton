import { Expose } from 'class-transformer';
import { Role } from '@pet-hackaton/types';
import { PermissionsEnum } from '../constants/permissions.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDataResponseDto {
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
  birthDate: Date;

  @ApiProperty()
  @Expose()
  photoUrl: string;

  @ApiProperty()
  @Expose()
  phone: string;

  @ApiProperty()
  @Expose()
  permissions: PermissionsEnum[] = [];
}
