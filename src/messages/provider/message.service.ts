import { Injectable } from '@nestjs/common';
import { MessageFetchService } from '../provider/message-fetch.service';
import { MessageUpdateService } from '../provider/message-update.service';
import {MessageDeleteService} from '../provider/message-delete.service'
import {MessageCreateService} from '../provider/message-create.service'
import { CreateMessageDto } from '../dtos/create-message.dto';
import { UpdateMessageDto } from '../dtos/update-message.dto';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { Message } from '../message.entity';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageCreateService: MessageCreateService,
    private readonly messageFetchService: MessageFetchService,
    private readonly messageUpdateService: MessageUpdateService,
    private readonly messageDeleteService: MessageDeleteService,
  ) {}

  /**Create method */
  async create(
    createMessageDto: CreateMessageDto,
    user: ActiveUserData,
    file?: Express.Multer.File,
  ): Promise<Message> {
    return await this.messageCreateService.create(createMessageDto, user, file);
  }

  async findAll(chatRoomId: number): Promise<Message[]> {
    return await this.messageFetchService.findAll(chatRoomId);
  }

  async update(messageId: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    return await this.messageUpdateService.update(messageId, updateMessageDto);
  }

  async delete(messageId: string): Promise<void> {
    await this.messageDeleteService.delete(messageId);
  }
}
