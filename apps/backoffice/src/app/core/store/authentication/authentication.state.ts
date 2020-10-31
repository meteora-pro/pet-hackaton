import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AuthenticationInterface } from './authentication.interface';
import { CheckUserAuth, GetUserMe, Logout, SetAuthDataToLocalStorage, SignIn } from './authentication.actions';
import { Observable, of } from 'rxjs';
import { Token, Tokens, UserData } from '@pet-hackaton/types';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

export const STATE_KEY = 'auth';

type Ctx = StateContext<AuthenticationInterface>;

export const defaultState: AuthenticationInterface = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
};

@State<AuthenticationInterface>({
  name: STATE_KEY,
  defaults: defaultState,
})
@Injectable()
export class AuthenticationState {
  constructor(private http: HttpClient, private router: Router) {}
  apiUrl = environment.apiUrl;

  @Action(SignIn)
  public onSignIn(ctx: Ctx, action: SignIn): Observable<void> {
    return this.http
      .post<Tokens>(`${this.apiUrl}/auth/sign-in`, {
        login: action.username,
        password: action.password,
      })
      .pipe(
        tap((response) => {
          ctx.patchState({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
          ctx.dispatch(new SetAuthDataToLocalStorage(response.accessToken, response.refreshToken));
        }),
        switchMap((response) => ctx.dispatch(new GetUserMe()))
      );
  }

  @Action(SetAuthDataToLocalStorage)
  public onSetAuthDataToArchive(ctx: Ctx, action: SetAuthDataToLocalStorage): void {
    localStorage.setItem('access_token', JSON.stringify(action.accessToken));
    localStorage.setItem('refresh_token', JSON.stringify(action.refreshToken));
  }

  @Action(GetUserMe)
  public onGetUserMe(ctx: Ctx): Observable<void> {
    return this.http
      .get<UserData>(`${this.apiUrl}/user/me`)
      .pipe(map((response) => void ctx.patchState({ user: response })));
  }

  @Action(CheckUserAuth)
  public onCheckUserAuth(ctx: Ctx): Observable<void> | void {
    let accessToken;
    let refreshToken;
    try {
      accessToken = JSON.parse(localStorage.getItem('access_token'));
      refreshToken = JSON.parse(localStorage.getItem('refresh_token'));
    } catch (e) {
      console.error('Error while parse auth data from local storage', e);
    }
    if (accessToken && refreshToken) {
      ctx.patchState({accessToken, refreshToken});
      return ctx.dispatch(new GetUserMe);
    }
  }

  @Action(Logout)
  public onLogout(ctx: Ctx): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    ctx.setState(defaultState);
    this.router.navigate(['/auth/login']);
  }
}
