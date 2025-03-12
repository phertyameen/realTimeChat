import { Injectable } from '@nestjs/common';
import { MessageRepositoryService } from './message-repository.service';
import { FileUploadService } from './file-upload.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { Message } from '../message.entity';

@Injectable()
export class MessageCreateService {
  constructor(
    private readonly messageRepo: MessageRepositoryService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    user: ActiveUserData,
    file?: Express.Multer.File,
  ): Promise<Message> {
    const fileUrl = await this.fileUploadService.upload(file);
    return await this.messageRepo.create({
      chatRoom: { id: createMessageDto.chatRoomId } as any, 
      sender: { id: user.sub } as any, 
      text: createMessageDto.text,
      fileUrl,
    });
  }
}
