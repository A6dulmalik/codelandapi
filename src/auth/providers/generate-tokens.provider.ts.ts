import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class GenerateTokensProviderTs {
  constructor(
    //JWT config injection
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    //jwt service injection
    private readonly jwtService: JwtService,
  ) {}

  public async SignToken<T>(userID: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userID,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );

    // return { accessToken };
  }

  public async GenerateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      //generate access token
      this.SignToken(user.id, this.jwtConfiguration.ttl, {
        email: user.email,
      }),

      //generate refresh token
      this.SignToken(user.id, this.jwtConfiguration.Rttl),
    ]);

    return { accessToken, refreshToken };
  }
}
