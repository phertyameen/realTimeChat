import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './provider/message.service';
import { MessageController } from './messages.controller';
import { User } from '../users/user.entitly';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, ChatRoom])],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
