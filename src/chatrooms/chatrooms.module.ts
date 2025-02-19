import { Module } from '@nestjs/common';
import { ChatRoomsService } from './providers/chatrooms/chatrooms.service';
import { ChatRoomsController } from './chatroom.controller';

/**chatroom module */
@Module({
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService]
})
export class ChatroomsModule {}
