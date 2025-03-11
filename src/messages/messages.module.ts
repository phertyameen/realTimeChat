import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './provider/message.service';
import { MessageController } from './messages.controller';
import { User } from '../users/user.entitly';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { CloudinaryService } from 'src/cloudinary-provider/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary-provider/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, ChatRoom]), CloudinaryModule],
  providers: [MessageService, CloudinaryService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
