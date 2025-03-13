import { Injectable } from '@nestjs/common';
import { MessageRepositoryService } from './message-repository.service';

@Injectable()
export class MessageDeleteService {
  constructor(private readonly messageRepo: MessageRepositoryService) {}

  async delete(id: string): Promise<boolean> {
    const result = await this.messageRepo.deleteMessage(id); 
    return result?.affected > 0; 
  }
}
