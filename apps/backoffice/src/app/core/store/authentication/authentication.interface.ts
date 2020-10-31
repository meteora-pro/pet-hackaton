import { Token, UserData } from '@pet-hackaton/types';

export interface AuthenticationInterface {
  accessToken: Token;
  refreshToken: Token;
  user: UserData;
}
