import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from '../../../chatrooms/chatroom.entity'; 

@Injectable()
export class FindChatRoomUseCase {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: Number(id) },
      relations: ['users', 'owner']
    });

    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }

    return chatRoom;
  }
}