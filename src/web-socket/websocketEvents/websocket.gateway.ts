import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketGuardGuard } from 'src/auth/guard/web-socket-guard/web-socket-guard.guard';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { MessageType } from 'src/messages/enum/message-type ';
import { MessageService } from 'src/messages/provider/message.service';

/**
 * WebSocket gateway handling real-time message exchanges.
 */
@UseGuards(WebSocketGuardGuard)
@WebSocketGateway({ cors: true })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  /**websocket server instance */
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}
  /**
   * Handles a new client connection.
   * @param client The connected client socket.
   */
  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  /**
   * Handles client disconnection.
   * @param client The disconnected client socket.
   */
  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  /**
   * Handles an incoming message from a client.
   * @param client The client socket sending the message.
   * @param payload The message payload containing text, file URL, chat room ID, and user details.
   */
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    payload: {
      text?: string;
      fileUrl?: string;
      chatRoomId: number;
      user: ActiveUserData;
    },
    data: unknown
  ): Promise<WsResponse<unknown>> {
    // // Emit an echo message before processing
    // const echoMessage = 'some message received';
    // console.log('Emitting message:', echoMessage);
    // client.emit('messageEcho', echoMessage);

    // Save the message to the database
    const savedMessage = await this.messageService.create(
      {
        text: payload.text,
        fileUrl: payload.fileUrl,
        chatRoomId: payload.chatRoomId,
        messageType: MessageType.FILE,
      },
      payload.user,
    );
    
    console.log('saved message:', savedMessage);
    // Emit the saved message to all connected clients
    
    client.emit('sendMessage', { name: 'Nest' }, savedMessage);
    const event = 'message acknoledged'
    return {event, data}
  }
}
