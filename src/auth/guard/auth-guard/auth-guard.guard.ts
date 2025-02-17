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
  
  @Injectable()
  export class AuthGuardGuard implements CanActivate {
  
    private static readonly defaultAuthType = authTypes.Bearer;
  
    private readonly authTypeGuardMap: Record<
      authTypes,
      CanActivate | CanActivate[]
    > = {
      [authTypes.Bearer]: this.accessTokenGuard,
      [authTypes.None]: { canActivate: () => true },
    };
  
    constructor(
      private readonly reflector: Reflector,
      private readonly accessTokenGuard: AccessTokenGuard,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // get authTypes from the reflector
      const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ])  ?? [AuthGuardGuard.defaultAuthType];
      // console.log('show all types', authTypes);
  
      // get array of guards
      const guards = authTypes.map((type) => this.authTypeGuardMap[type])
      // const guards = authTypes
      //   .map((type) => {
      //     const guard = this.authTypeGuardMap[type];
      //     return Array.isArray(guard) ? guard : [guard]; // Normalize to an array
      //   })
      //   .flat();
  
      // loop through the guard and fire the can activate method
      for (const instance of guards) {
        // console.log("instance of", instance)
        const canActivate = await Promise.resolve(
          instance.canActivate(context),
        ).catch((err) => {
          error: err;
        });
        // console.log(canActivate)
  
        if (canActivate) {
          return true;
        }
      }
      throw new UnauthorizedException();
    }
  }