import { Module } from '@nestjs/common';
import { MessageModule } from 'src/messages/messages.module';
import { WebsocketGateway } from './websocketEvents/websocket.gateway';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardGuard } from 'src/auth/guard/auth-guard/auth-guard.guard';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/authConfig/jwt.config';

/**web socket module */
@Module({
  imports: [
    MessageModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    WebsocketGateway,
    {
      provide: APP_GUARD,
      useClass: AuthGuardGuard,
    },
    AccessTokenGuard,
  ],
  exports: [WebsocketGateway],
})

/**websocket class */
export class WebSocketModule {}
