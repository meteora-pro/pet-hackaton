import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategiesEnum } from '../constants/auth-strategies.enum';
import { from } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessTokenGuard extends AuthGuard(AuthStrategiesEnum.JWT_ACCESS_TOKEN_STRATEGY) {

  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return from(super.canActivate(context) as Promise<boolean>)
      .pipe(
        map((hasAccessByToken) => {
          if (!hasAccessByToken) {
            return false;
          }
          const classRoles = this.reflector.get<string[]>('roles', context.getClass()) || [];
          const methodRoles = this.reflector.get<string[]>('roles', context.getHandler()) || [];

          const request = context.switchToHttp().getRequest();
          const user = request.user;

          const hasClassRolesAccess = classRoles.includes(user.role);
          const hasMethodRolesAccess = methodRoles.includes(user.role);

          return hasClassRolesAccess || hasMethodRolesAccess;
        }),
      )
      .toPromise();
  }
}
