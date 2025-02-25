import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from 'socket.io'
import { Message } from 'src/messages/message.entity';
import { ServerToClientEvents } from '../interfaces/websockets-message.interface';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuardGuard } from 'src/auth/guard/auth-guard/auth-guard.guard';
import { Socket } from 'dgram';
// import { WebSocketGuardGuard } from 'src/auth/guard/web-socket-guard/web-socket-guard.guard';
import { SocketAuthMiddleware } from 'src/auth/middlewares/web-socket.middleware';


@WebSocketGateway({namespace: 'realtimeChat'},)
// @UseGuards(WebSocketGuardGuard)
export class WebsocketGateway {
  // guard protect this endpoint
  //it wont be able to connect due to guard in app which was removed
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  // when application start up
  // afterinit(client:Socket) {
  //   client.use(SocketAuthMiddleware() as any) 
  //   Logger.log('afterinit')

  // }


  // handleConnection(client:Socket) {
  //   client.handshake.headers.authorization

  // }

  @WebSocketServer()
  server:Server<any, ServerToClientEvents >


  sendMessage (message:Message) {
    this.server.emit('newMessage', message)

  }

}

 