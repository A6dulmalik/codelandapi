import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/users/providers/user.services';
import { SignInDto } from './dto/signin-auth.dto';
import { FindOneByEmail } from 'src/users/providers/find-one-by-email';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokenProviderTs } from './providers/refresh-token.provider.ts';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(SignInProvider)
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly signInProvider: SignInProvider,

    private readonly refreshTokenProvider: RefreshTokenProviderTs,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    return this.signInProvider.SignIn(signInDto);
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }
}
