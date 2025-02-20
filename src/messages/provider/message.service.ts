import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../message.entity';
import { ChatRoom } from '../../chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
    @InjectRepository(ChatRoom) private chatRoomsRepo: Repository<ChatRoom>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  //  Create a new message and SAVE it in DB
  async create(chatRoomId: string, senderId: string, text: string): Promise<Message> {
    // 1️ Find the chat room
    const chatRoom = await this.chatRoomsRepo.findOne({ where: { id: chatRoomId as any } });
    if (!chatRoom) {
      throw new NotFoundException('Chat room not found');
    }

    // 2️ Find the sender
    const sender = await this.usersRepo.findOne({ where: { id: senderId as any } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    // 3️ Create and save the message in the DB
    const message = this.messagesRepo.create({ chatRoom, sender, text });
    return await this.messagesRepo.save(message);
  }

  //  Find all messages in a chat room
  async findAll(chatRoomId: string): Promise<Message[]> {
    return await this.messagesRepo.find({ where: { chatRoom: { id: chatRoomId as any} }, relations: ['sender'] });
  }

  //  Delete a message
  async delete(messageId: string): Promise<void> {
    const result = await this.messagesRepo.delete(messageId);
    if (result.affected === 0) {
      throw new NotFoundException('Message not found');
    }
  }

  //  Update a message text
  async update(messageId: string, newText: string): Promise<Message> {
    const message = await this.messagesRepo.findOne({ where: { id: messageId } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.text = newText;
    return await this.messagesRepo.save(message);
  }
}
