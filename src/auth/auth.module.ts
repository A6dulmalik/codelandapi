import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProviderTs } from './providers/generate-tokens.provider.ts';
import { RefreshTokenProviderTs } from './providers/refresh-token.provider.ts';
import { AccessTokenGuard } from './guard/access-token/access-token.guard';
import { AuthTokenGuard } from './guard/authentication/auth-token.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
    GenerateTokensProviderTs,
    RefreshTokenProviderTs,
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
