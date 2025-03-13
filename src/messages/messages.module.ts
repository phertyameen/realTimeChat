import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './provider/message.service';
import { MessageController } from './messages.controller';
import { User } from '../users/user.entitly';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { CloudinaryService } from 'src/cloudinary-provider/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary-provider/cloudinary.module';
import { MessageFetchService } from './provider/message-fetch.service';
import { MessageUpdateService } from './provider/message-update.service';
import { MessageDeleteService } from './provider/message-delete.service';
import { MessageCreateService } from './provider/message-create.service';
import { MessageRepositoryService } from './provider/message-repository.service';
import { FileUploadService } from './provider/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, ChatRoom]), CloudinaryModule],
  providers: [MessageService,
            CloudinaryService,
            MessageFetchService,
            MessageUpdateService,
            MessageDeleteService,
            MessageCreateService,
            MessageRepositoryService,
            FileUploadService],
  controllers: [MessageController],
  exports: [MessageService, FileUploadService],
})
export class MessageModule {}
