import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Token } from '@pet-hackaton/types';
import { AuthenticationSelectors } from '../store/authentication/authentication.selectors';
import { catchError } from 'rxjs/operators';
import { Logout } from '../store/authentication/authentication.actions';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken: Token = this.store.selectSnapshot(AuthenticationSelectors.getAccessToken);
    if (!accessToken) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken.token}`
      }
    });
    return next.handle(request).pipe(catchError(() => this.store.dispatch(new Logout)));
  }
}
