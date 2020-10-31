import {ExecutionContext, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategiesEnum } from '../constants/auth-strategies.enum';

@Injectable()
export class AccessTokenGuard extends AuthGuard(AuthStrategiesEnum.JWT_ACCESS_TOKEN_STRATEGY) {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
}
