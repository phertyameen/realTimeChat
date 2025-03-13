import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
// import { MailerModule } from '@nestjs-modules/mailer';
import { PaginationModule } from './common/pagination.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './users/user.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuardGuard } from './auth/guard/auth-guard/auth-guard.guard';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import { ChatModule } from './chatrooms/chatrooms.module';
import { MessageModule } from './messages/messages.module';
import { WebSocketModule } from './web-socket/web-socket.module';
import { WebsocketGateway } from './web-socket/websocketEvents/websocket.gateway';
import { PaginationProvider } from './common/pagination/Provider/pagination.provider';
import jwtConfig from './auth/authConfig/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        blog: configService.get('database.blog'),
        synchronize: configService.get('database.synchronize'),
        autoLoadEntities: configService.get('database.autoload'),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    AuthModule,
    UserModule,
    PaginationModule,
    ChatModule,
    MessageModule,
    ChatModule,
    WebSocketModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    AppService,
    WebsocketGateway,
    PaginationProvider,
    {
      provide: APP_GUARD,
      useClass: AuthGuardGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataResponseInterceptor
    // },
    AccessTokenGuard,
  ],
})
export class AppModule {}
