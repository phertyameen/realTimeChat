import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepositoryService } from './message-repository.service';
import { UpdateMessageDto } from '../dtos/update-message.dto';
import { Message } from '../message.entity';

@Injectable()
export class MessageUpdateService {
  constructor(private readonly messageRepo: MessageRepositoryService) {}

  async update(messageId: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.messageRepo.findById(messageId);
    if (!message) throw new NotFoundException('Message not found');

    message.text = updateMessageDto.text;
    return await this.messageRepo.update(message);
  }
}
