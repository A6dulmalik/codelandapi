import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensProviderTs } from './generate-tokens.provider.ts';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/providers/user.services';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class RefreshTokenProviderTs {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokenProvider: GenerateTokensProviderTs,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      //validate jwt token using jwtService
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      //Get the user form the database
      const user = await this.userService.findOneById(sub);

      //Generater tokens
      return await this.generateTokenProvider.GenerateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
