import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategiesEnum } from '../constants/auth-strategies.enum';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(AuthStrategiesEnum.JWT_REFRESH_TOKEN_STRATEGY) {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
     handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
