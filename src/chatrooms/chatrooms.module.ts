import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chatroom.entity'; 
import { ChatRoomController } from './chatroom.controller';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service'; 
import { User } from '../users/user.entitly'; 

/**chatroom module */
@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom, User]),
  ],
  controllers: [ChatRoomController],
  providers: [ChatRoomService],
  exports: [ChatRoomService],
})
export class ChatModule {}