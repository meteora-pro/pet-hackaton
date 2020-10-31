import { AuthenticationState } from './authentication.state';
import { AuthenticationInterface } from './authentication.interface';
import { Token, UserData } from '@pet-hackaton/types';
import { Selector } from '@ngxs/store';

export class AuthenticationSelectors {

  @Selector([AuthenticationState])
  public static getAccessToken(state: AuthenticationInterface): Token {
    return state.accessToken;
  }

  @Selector([AuthenticationState])
  public static isSignedIn(state: AuthenticationInterface): boolean {
    return !!state.user;
  }

  @Selector([AuthenticationState])
  public static currentUser(state: AuthenticationInterface): UserData {
    return state.user
  }

}
