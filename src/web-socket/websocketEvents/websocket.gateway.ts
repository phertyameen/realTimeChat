/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { CreateMessageDto } from 'src/messages/dtos/create-message.dto';
import { MessageService } from 'src/messages/provider/message.service';

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
    client: Socket,
    payload: { message: CreateMessageDto; user: ActiveUserData },
  ) {
    try {
      const savedMessage = await this.messageService.create(
        payload.message,
        payload.user,
      );

      // Broadcast the new message to all clients
      this.server.emit('receiveMessage', savedMessage);
    } catch (error) {
      console.error('Message handling error:', error);
    }
  }
}
