import { IsEmail, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { UserLoginExistValidator } from '../validators/user-login-exist.validator';
import { UserEmailExistValidator } from '../validators/user-email-exist.validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {

  @ApiProperty()
  @IsString()
  @Validate(UserLoginExistValidator)
  @MinLength(3)
  login: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @Validate(UserEmailExistValidator)
  email?: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;


  @ApiProperty()
  @IsString()
  @MinLength(5)
  password: string;
}
