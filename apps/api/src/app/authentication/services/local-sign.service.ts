import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SignInRequestDto } from '../dto/sign-in-request.dto';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { JwtSignService } from './jwt-sign.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { SignUpRequestDto } from '../dto/sign-up-request.dto';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenRequestDto } from '../dto/refresh-token-request.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class LocalSignService {
  constructor(
    private accessTokenService: JwtSignService,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenEntityRepository: Repository<RefreshTokenEntity>,
  ) {}

  public async getUserByRefreshToken(token: string): Promise<Partial<UserEntity>> {
    const tokenEntity = await this.refreshTokenEntityRepository.findOne({ token }, { relations: ['user'] });
    return tokenEntity && tokenEntity.user;
  }

  public async signIn(signInBodyDto: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userEntityRepository.findOne({
      where: [
        {
          login: signInBodyDto.login,
        },
        {
          email: signInBodyDto.login,
        },
        {
          phoneNumber: signInBodyDto.login,
        },
      ],
    });
    const isPasswordValid = await bcrypt.compare(signInBodyDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(['User not found or incorrect password']);
    }

    const prepareData = await this.prepareTokenData(user);

    await this.removeOldTokens(prepareData.refreshToken.token, user.id);
    return await this.prepareTokenData(user);
  }

  public async signUp(signUpBodyDto: SignUpRequestDto): Promise<SignInResponseDto> {
    const passwordHash = await bcrypt.hash(signUpBodyDto.password, 10);
    const newUser = await this.userEntityRepository.save({
      ...signUpBodyDto,
      password: passwordHash,
    });
    return await this.prepareTokenData(newUser);
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenRequestDto,
    user: UserEntity
  ): Promise<SignInResponseDto> {
    await this.removeOldTokens(refreshTokenDto.refreshToken, user.id);
    return this.prepareTokenData(user);
  }

  private async removeOldTokens(token: string, userId: number): Promise<void> {
    try {
      return void await this.refreshTokenEntityRepository
        .createQueryBuilder()
        .delete()
        .where('token = :token', { token })
        .orWhere(
          new Brackets((qb) => {
            qb.where('"userId"  = :userId', { userId }).andWhere('exp <= NOW()');
          })
        ).execute();
    } catch (e) {
      Logger.error(`Error while delete old refresh token for user.id ${userId}`, e);
    }
  }

  private async prepareTokenData(user: UserEntity): Promise<SignInResponseDto> {
    const tokenUserData = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    const accessTokenData = this.accessTokenService.signAccessToken(tokenUserData);
    const refreshTokenData = this.accessTokenService.signRefreshToken(tokenUserData);
    await this.refreshTokenEntityRepository.save({
      ...refreshTokenData,
      user: user
    });
    return {
      accessToken: accessTokenData,
      refreshToken: refreshTokenData,
    };
  }
}
