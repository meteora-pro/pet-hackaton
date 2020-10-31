import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokensDto } from '../dto/tokens.dto';
import { AppConfig } from '../../app.config';

@Injectable()
export class JwtSignService {
  constructor(private appConfig: AppConfig) {}

  public signAccessToken(payload: object): TokensDto {
    const accessToken = jwt.sign(
      payload,
      this.appConfig.accessTokenSecret,
      {
        expiresIn: this.appConfig.accessTokenExpires
      }
    );
    return JwtSignService.prepareTokenResponse(accessToken);
  }

  public signRefreshToken(payload: object): TokensDto {
    const refreshToken = jwt.sign(
      payload,
      this.appConfig.refreshTokenSecret,
      {
        expiresIn: this.appConfig.refreshTokenExpires,
      }
    );
    return JwtSignService.prepareTokenResponse(refreshToken);
  }

  private static prepareTokenResponse(token: string): TokensDto {
    const decoded = jwt.decode(token, { json: true });
    return {
      token: token,
      iat: new Date(decoded.iat * 1000).toISOString(),
      exp: new Date(decoded.exp * 1000).toISOString(),
    };
  }
}
