import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenProviderTs } from './providers/refresh-token.provider.ts';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly refreshTokenProvider: RefreshTokenProviderTs,
  ) {}

  @Post('signin')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  public async SignIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto);
  }

  @Post('refreshToken')
  public RefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
