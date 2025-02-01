import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthTypes } from 'src/auth/enums/auth-types.enums';
import { access } from 'fs';
import { AUTH_TYPE_KEY } from 'src/auth/constant/auth-constants';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  private static readonly defaultAuthType = AuthTypes.Bearer;
  private readonly AuthTypeGuardMap: Record<AuthTypes, CanActivate> = {
    [AuthTypes.Bearer]: this.accessTokenGuard,
    [AuthTypes.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,

    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(this.AuthTypeGuardMap);
    // Get all auth types from reflection
    const authTypes =
      this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthTokenGuard.defaultAuthType;
    // Arrays of Guards
    return true;
  }
}
