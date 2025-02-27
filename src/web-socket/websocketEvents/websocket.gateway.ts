/**websocket to handle file upload */

import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { MessageService } from './message.service';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { MessageType } from 'src/messages/enum/message-type ';
import { MessageService } from 'src/messages/provider/message.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { text?: string; fileUrl?: string; chatRoomId: string; user: ActiveUserData }) {
    console.log('Received message:', payload);

    // Save the message to the database
    const savedMessage = await this.messageService.create(
      { text: payload.text, chatRoomId: payload.chatRoomId, messageType: MessageType.FILE },
      payload.user,
      undefined,
    );

    // Emit the saved message to all connected clients
    this.server.emit('receiveMessage', savedMessage);
  }
}