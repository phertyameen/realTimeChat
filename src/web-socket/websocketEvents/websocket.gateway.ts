import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { MessageType } from 'src/messages/enum/message-type ';
import { MessageService } from 'src/messages/provider/message.service';

/**
 * WebSocket gateway handling real-time message exchanges.
 */
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
    payload: {
      text?: string;
      fileUrl?: string;
      chatRoomId: number;
      user: ActiveUserData;
    },
  ) {
    console.log('Received message:', payload);

    // Save the message to the database
    const savedMessage = await this.messageService.create(
      {
        content: payload.text, // ✅ Correct property name
        chatRoomId: payload.chatRoomId,
        messageType: MessageType.FILE,
      },
      payload.user,
      undefined,
    );

    // Emit the saved message to all connected clients
    this.server.emit('receiveMessage', savedMessage);
  }
}
