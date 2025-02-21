import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WebSocketGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    const { authurisation } = client.handshake.headers;

    Logger.log({authurisation}, 'i have the auth')
    return false;
  }

  static validateToken(client: Socket) {
    const {authorisation} = client.handshake.headers
    Logger.log({authorisation})

    const token = Array.isArray(authorisation) ? authorisation[0].split(' ')[1] : authorisation.split(' ')[1];

    const payload = verify(token, 'secret')

    return payload
  }
}
