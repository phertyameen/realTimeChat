import { Injectable } from '@nestjs/common';
import { MessageRepositoryService } from './message-repository.service';
import { Message } from '../message.entity';

@Injectable()
export class MessageFetchService {
  constructor(private readonly messageRepo: MessageRepositoryService) {}

  async findAll(chatRoomId: number): Promise<Message[]> {
    return await this.messageRepo.findAll(chatRoomId);
  }
}
