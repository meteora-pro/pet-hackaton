import {Injectable} from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt'
import {PassportStrategy} from "@nestjs/passport";
import { UserEntity } from '../../entities/user.entity';
import { AuthStrategiesEnum } from '../constants/auth-strategies.enum';
import { AppConfig } from '../../app.config';
import { UserService } from '../services/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, AuthStrategiesEnum.JWT_ACCESS_TOKEN_STRATEGY) {
    constructor(private appConfig: AppConfig, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: appConfig.accessTokenSecret,
        });
    }

    async validate(request, payload: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        return this.userService.getUserData(payload.id);
    }

}
