import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/messages/message.entity';
import { Repository } from 'typeorm';

/**Message service class */
@Injectable()
export class MessagesService {
  constructor(
    /**injecting message repo */
    @InjectRepository(Message) private messageRepo: Repository<Message>) {}

  /**method for sending message takes in chatroom id, sender id  and text as parameter */
  async sendMessage(chatRoomId: string, senderId: string, text: string) {
    // const message = this.messageRepo.create({ chatRoom: { id: chatRoomId }, sender: { id: senderId }, text });
    // return this.messageRepo.save(message);
  }

  /**get messages method */
  async getMessages(chatRoomId: string) {
    return this.messageRepo.find({ where: { chatRoom: { id: chatRoomId } }, relations: ['sender'] });
  }
}