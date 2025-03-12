import { Injectable } from '@nestjs/common';
import { MessageRepositoryService } from './message-repository.service';

@Injectable()
export class MessageDeleteService {
  constructor(private readonly messageRepo: MessageRepositoryService) {}

  async delete(messageId: string): Promise<void> {
    await this.messageRepo.delete(messageId);
  }
}
