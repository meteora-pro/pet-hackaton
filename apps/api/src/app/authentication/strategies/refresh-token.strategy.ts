import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { LocalSignService } from '../services/local-sign.service';
import { UserEntity } from '../../entities/user.entity';
import { AuthStrategiesEnum } from '../constants/auth-strategies.enum';
import { AppConfig } from '../../app.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, AuthStrategiesEnum.JWT_REFRESH_TOKEN_STRATEGY) {
    constructor(private appConfig: AppConfig, private localSignService: LocalSignService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: appConfig.refreshTokenSecret,
        });
    }

    async validate(request): Promise<Partial<UserEntity>> {
        return this.localSignService.getUserByRefreshToken(request.body.refreshToken);
    }
}
