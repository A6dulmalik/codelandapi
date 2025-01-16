import { enumTypes } from '../enums/auth-types.enums';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authTypes: enumTypes[]) => SetMetadata('authType', authTypes);

// export const Auth = (...args: string[]) => SetMetadata('auth', args);