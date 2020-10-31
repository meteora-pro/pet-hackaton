import { Token } from '@pet-hackaton/types';

export class GetUserMe {
  public static type = '[Auth] Get user me';
}

export class SignIn {
  constructor(public username: string, public password: string) {}
  public static type = '[Auth] Sign-in';
}

export class CheckUserAuth {
  public static type = '[Auth] Check user auth';
}

export class SetAuthDataToLocalStorage {
  constructor(public accessToken: Token, public refreshToken: Token) { }
  public static type = '[Auth] Set auth data to local storage';
}

export class Logout {
  public static type = '[Auth] Logout';

}
