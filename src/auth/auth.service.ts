import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/users/providers/user.services';
import { SignInDto } from './dto/signin-auth.dto';
import { FindOneByEmail } from 'src/users/providers/find-one-by-email';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SignInProvider)
    private readonly userService: UserService,
    
    private readonly signInProvider: SignInProvider
  ) {}

  public async SignIn(signInDto: SignInDto) {
    return this.signInProvider.SignIn(signInDto)
  }

}

