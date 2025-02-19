// src/chatrooms/providers/chatrooms/chatrooms.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from '../../chatroom.entity';
import { CreateChatRoomDto } from '../../DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from '../../DTOs/update-chat-room.dto';
import { User } from 'src/users/user.entitly';
import { ChatRoomType } from '../../enums/chatroomType';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    // Find users by their numeric IDs
    const users = await this.userRepository.findByIds(
      createChatRoomDto.userIds.map(id => Number(id))
    );
    
    if (users.length !== createChatRoomDto.userIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    // Create new chat room
    const chatRoom = this.chatRoomRepository.create({
      name: createChatRoomDto.name,
      type: createChatRoomDto.type || ChatRoomType.GROUP,
      users: users
    });

    return await this.chatRoomRepository.save(chatRoom);
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: Number(id) },
      relations: ['users'],
    });

    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }

    return chatRoom;
  }

  async update(id: number, updateChatRoomDto: UpdateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = await this.findOne(id);
    
    if (updateChatRoomDto.userIds) {
      const users = await this.userRepository.findByIds(
        updateChatRoomDto.userIds.map(id => Number(id))
      );
      
      if (users.length !== updateChatRoomDto.userIds.length) {
        throw new BadRequestException('One or more users not found');
      }

      if (chatRoom.type === ChatRoomType.PRIVATE && users.length !== 2) {
        throw new BadRequestException('Private chat rooms must have exactly 2 users');
      }

      chatRoom.users = users;
    }

    Object.assign(chatRoom, updateChatRoomDto);
    return this.chatRoomRepository.save(chatRoom);
  }

  async remove(id: number): Promise<void> {
    const result = await this.chatRoomRepository.delete(Number(id));
    
    if (result.affected === 0) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
  }

  async addUserToChatRoom(chatRoomId: number, userId: number): Promise<ChatRoom> {
    const chatRoom = await this.findOne(chatRoomId);
    const user = await this.userRepository.findOne({ 
      where: { id: Number(userId) }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (chatRoom.type === ChatRoomType.PRIVATE) {
      throw new BadRequestException('Cannot add users to private chat rooms');
    }

    chatRoom.users.push(user);
    return this.chatRoomRepository.save(chatRoom);
  }

  async removeUserFromChatRoom(chatRoomId: number, userId: number): Promise<ChatRoom> {
    const chatRoom = await this.findOne(chatRoomId);

    if (chatRoom.type === ChatRoomType.PRIVATE) {
      throw new BadRequestException('Cannot remove users from private chat rooms');
    }

    chatRoom.users = chatRoom.users.filter(user => user.id !== Number(userId));
    return this.chatRoomRepository.save(chatRoom);
  }
}