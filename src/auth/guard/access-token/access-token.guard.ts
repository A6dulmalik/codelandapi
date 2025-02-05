import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constant/auth-constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    //jwt service injection to access and validate the generated token
    private readonly jwtService: JwtService,

    //JWT config injection
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Extract the request from the execution context
    const request = context.switchToHttp().getRequest();

    // Extract the token from the request header
    const token = this.extractRequestFromHeader(request);

    // Validate the token
    if (!token) {
      throw new UnauthorizedException('token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractRequestFromHeader(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
