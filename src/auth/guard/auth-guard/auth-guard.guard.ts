import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { authTypes } from 'src/auth/enums/authTypes.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constant';
import { ApiTags } from '@nestjs/swagger';

/**
 * AuthGuard class implementing CanActivate
 */
@ApiTags('Auth')
@Injectable()
export class AuthGuardGuard implements CanActivate {
  /**
   * Injecting default AuthType
   */
  private static readonly defaultAuthType = authTypes.Bearer;

  /**
   * Injecting default AuthTypeGuardMap
   */
  private readonly authTypeGuardMap: Record<
    authTypes,
    CanActivate | CanActivate[]
  > = {
    [authTypes.Bearer]: this.accessTokenGuard,
    [authTypes.None]: { canActivate: () => true },
  };

  constructor(
    /**
     * Injecting reflector
     */
    private readonly reflector: Reflector,

    /**
     * Injecting Access Token Guard
     */
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  /**
   * CanActivate method to get authTypes from the reflector
   * @param context - Execution context
   * @returns A boolean indicating whether the request is authorized
   * @throws UnauthorizedException if access is denied
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get authTypes from the reflector
    const authTypes =
      this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [AuthGuardGuard.defaultAuthType];

    // Get array of guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]);

    // Loop through the guards and execute the canActivate method
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });

      if (canActivate) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
