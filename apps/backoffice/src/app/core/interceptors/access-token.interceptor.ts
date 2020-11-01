import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { Token } from '@pet-hackaton/types';
import { AuthenticationSelectors } from '../store/authentication/authentication.selectors';
import { catchError } from 'rxjs/operators';
import { Logout } from '../store/authentication/authentication.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store, private snackBar: MatSnackBar) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: Token = this.store.selectSnapshot(AuthenticationSelectors.getAccessToken);
    if (!accessToken) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken.token}`,
      },
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 401 || error.status === 403) {
          return this.store.dispatch(new Logout());
        } else {

          this.showErrorNotification();
          return of(error);
        }
      })
    );
  }

  private showErrorNotification() {
  this.snackBar.open('Произошла ошибка при запросе данных', 'Ок', {
      duration: 500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
