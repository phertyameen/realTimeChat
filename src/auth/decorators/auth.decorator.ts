import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constant';
import { authTypes } from '../enums/authTypes.enum';

/**main auth class retrieve active user data from the request */
export const Auth = (...authTypes: authTypes[]) => 
    SetMetadata(AUTH_TYPE_KEY, authTypes);