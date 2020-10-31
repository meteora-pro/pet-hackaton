import { Module } from '@nestjs/common';
import { BaseAuthController } from './controllers/base-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';
import {PermissionsService} from './services/permissions.service';
import { UserService } from './services/user.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { JwtSignService } from './services/jwt-sign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entity/refresh-token.entity';
import { LocalSignService } from './services/local-sign.service';
import { UserLoginExistValidator } from './validators/user-login-exist.validator';
import { UserNotFoundValidator } from './validators/user-not-found-validator.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { UserEmailExistValidator } from './validators/user-email-exist.validator';
import { UserPhoneExistValidator } from './validators/user-phone-exist.validator';
import { UserEntity } from '../entities/user.entity';
import { AuthStrategiesEnum } from './constants/auth-strategies.enum';
import { AppConfigModule } from '../app-config.module';

@Module({
    imports: [
        AppConfigModule,
        TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
        PassportModule.register({
            session: false,
            defaultStrategy: [
                AuthStrategiesEnum.JWT_ACCESS_TOKEN_STRATEGY,
                AuthStrategiesEnum.JWT_REFRESH_TOKEN_STRATEGY,
            ],
        }),
    ],
    controllers: [BaseAuthController, UserController],
    providers: [
        AccessTokenStrategy,
        RefreshTokenStrategy,
        UserService,
        JwtSignService,
        LocalSignService,
        UserLoginExistValidator,
        UserEmailExistValidator,
        UserPhoneExistValidator,
        UserNotFoundValidator,
        RefreshTokenGuard,
        PermissionsService,
    ],
})
export class AuthenticationModule {}
