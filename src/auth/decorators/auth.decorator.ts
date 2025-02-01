import { AUTH_TYPE_KEY } from '../constant/auth-constants';
import { AuthTypes } from '../enums/auth-types.enums';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authTypes: AuthTypes[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

// export const Auth = (...args: string[]) => SetMetadata('auth', args);
