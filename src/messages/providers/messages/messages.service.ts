import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/messages/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messageRepo: Repository<Message>) {}

  async sendMessage(chatRoomId: string, senderId: string, text: string) {
    // const message = this.messageRepo.create({ chatRoom: { id: chatRoomId }, sender: { id: senderId }, text });
    // return this.messageRepo.save(message);
  }

  async getMessages(chatRoomId: string) {
    return this.messageRepo.find({ where: { chatRoom: { id: chatRoomId } }, relations: ['sender'] });
  }
}