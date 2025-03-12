import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Message } from '../message.entity';

@Injectable()
export class MessageRepositoryService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(messageData: Partial<Message>): Promise<Message> {
    const message = this.messageRepo.create(messageData);
    return await this.messageRepo.save(message);
  }

  async findAll(chatRoomId: number): Promise<Message[]> {
    return await this.messageRepo.find({
      where: { chatRoom: { id: chatRoomId } },
      relations: ['sender'],
    });
  }

  async findById(messageId: string): Promise<Message | null> {
    return await this.messageRepo.findOne({ where: { id: messageId } });
  }

  async update(message: Message): Promise<Message> {
    return await this.messageRepo.save(message);
  }

  async deleteMessage(id: string): Promise<DeleteResult> {
    return this.messageRepo.delete(id); 
  }
}
