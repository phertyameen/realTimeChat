import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

/**
 * @class WebSocketGuardGuard
 * @description A guard to validate WebSocket connections based on authentication tokens.
 */
@Injectable()
export class WebSocketGuardGuard implements CanActivate {
  /**
   * Determines whether the WebSocket request can proceed.
   *
   * @param {ExecutionContext} context - The execution context of the request.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Whether the request is allowed.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    const { authurisation } = client.handshake.headers;

    Logger.log({ authurisation }, 'i have the auth');
    return false;
  }

  /**
   * Validates the authentication token from the WebSocket handshake headers.
   *
   * @param {Socket} client - The WebSocket client.
   * @returns {any} The decoded payload of the token.
   */
  static validateToken(client: Socket): any {
    const { authorisation } = client.handshake.headers;
    Logger.log({ authorisation });

    const token = Array.isArray(authorisation) ? authorisation[0].split(' ')[1] : authorisation.split(' ')[1];
    
    const payload = verify(token, 'secret');
    return payload;
  }
}
