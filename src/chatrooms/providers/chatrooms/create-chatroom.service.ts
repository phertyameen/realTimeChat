import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from '../../chatroom.entity';
import { User } from '../../../users/user.entitly';
import { CreateChatRoomDto } from '../../DTOs/create-chat-room.dto';

@Injectable()
export class CreateChatRoomUseCase {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(createChatRoomDto: CreateChatRoomDto, currentUserId: number): Promise<ChatRoom> {
    // Find users
    const users = await this.userRepository.findByIds(
      createChatRoomDto.userIds.map(id => Number(id))
    );
    
    if (users.length !== createChatRoomDto.userIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    // Make sure the current user is one of the chat participants
    if (!createChatRoomDto.userIds.includes(currentUserId)) {
      // Add the current user to the chat members if not already included
      const currentUser = await this.userRepository.findOne({ where: { id: currentUserId } });
      if (currentUser) {
        users.push(currentUser);
      }
    }

    // Create new chat room
    const chatRoom = this.chatRoomRepository.create({
      name: createChatRoomDto.name,
      type: createChatRoomDto.type,
      users: users,
      ownerId: currentUserId
    });

    return await this.chatRoomRepository.save(chatRoom);
  }
}