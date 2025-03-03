import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from 'src/messages/provider/message.service';
  import { CreateMessageDto } from 'src/messages/dto/message.dto';
  
  @WebSocketGateway({ cors: { origin: '*' } }) // Allows requests from any origin
  export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private readonly messageService: MessageService) {}
  
    private activeUsers = new Set<string>(); // Store connected users
  
    // Triggered when a client connects
    handleConnection(@ConnectedSocket() client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    // Triggered when a client disconnects
    handleDisconnect(@ConnectedSocket() client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    // Listen for new messages from clients
    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() createMessageDto: CreateMessageDto) {
      const message = await this.messageService.create(createMessageDto);
  
      // Emit the new message to all connected clients in the same chat room
      this.server.to(createMessageDto.chatRoomId).emit('receiveMessage', message);
      return message;
    }
  
    // Join a chat room
    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() chatRoomId: string, @ConnectedSocket() client: Socket) {
      client.join(chatRoomId);
      console.log(`Client ${client.id} joined room ${chatRoomId}`);
    }
  
    // Leave a chat room
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() chatRoomId: string, @ConnectedSocket() client: Socket) {
      client.leave(chatRoomId);
      console.log(`Client ${client.id} left room ${chatRoomId}`);
    }
  }
  