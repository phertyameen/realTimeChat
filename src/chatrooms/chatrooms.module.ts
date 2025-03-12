/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity'; 
import { ChatRoomController } from './chatroom.controller';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service'; 
import { User } from '../users/user.entitly'; 
import { CreateChatRoomUseCase } from './providers/chatrooms/create-chatroom.service';
import { FindChatRoomUseCase } from './providers/chatrooms/find-chatroom.service';
import { UpdateChatRoomUseCase } from './providers/chatrooms/update-chatroom.service';
import { DeleteChatRoomUseCase } from './providers/chatrooms/delete-chatroom.service';
import { AddUserToChatRoomUseCase } from './providers/chatrooms/add-user-to-chatroom.service';
import { RemoveUserFromChatRoomUseCase } from './providers/chatrooms/remove-user-from-chatroom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom, User]),
  ],
  controllers: [ChatRoomController],
  providers: [
    ChatRoomService,
    CreateChatRoomUseCase,
    FindChatRoomUseCase,
    UpdateChatRoomUseCase,
    DeleteChatRoomUseCase,
    AddUserToChatRoomUseCase,
    RemoveUserFromChatRoomUseCase,
  ],
  exports: [ChatRoomService],
})
export class ChatModule {}