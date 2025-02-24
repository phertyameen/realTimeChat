// src/chatrooms/providers/chatrooms/chatrooms.service.ts
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
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

  async create(createChatRoomDto: CreateChatRoomDto, currentUserId: number): Promise<ChatRoom> {
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

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      relations: ['users'],
    });
  }

// Method for finding a chat room by ID
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

// Method for updating a chat room
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

  // Update other fields
  if (updateChatRoomDto.name) chatRoom.name = updateChatRoomDto.name;
  if (updateChatRoomDto.type) chatRoom.type = updateChatRoomDto.type;

  return this.chatRoomRepository.save(chatRoom);
}

async remove(id: number, userId?: number): Promise<void> {
  const chatRoom = await this.chatRoomRepository.findOne({
    where: { id: Number(id) }
  });
  
  if (!chatRoom) {
    throw new NotFoundException(`Chat room with ID ${id} not found`);
  }

  // Check owner permissions if userId is provided
  if (userId && chatRoom.ownerId && chatRoom.ownerId !== userId) {
    throw new ForbiddenException('You do not have permission to delete this chat room');
  }
  
  // Remove the chat room
  await this.chatRoomRepository.remove(chatRoom);
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

// Method for removing a user from a chat room
async removeUserFromChatRoom(chatRoomId: number, userId: number): Promise<ChatRoom> {
  const chatRoom = await this.findOne(chatRoomId);

  if (chatRoom.type === ChatRoomType.PRIVATE) {
    throw new BadRequestException('Cannot remove users from private chat rooms');
  }

  // Check if user is the owner
  if (chatRoom.ownerId === userId) {
    throw new BadRequestException('Cannot remove the owner from the chat room');
  }

  const initialUserCount = chatRoom.users.length;
  chatRoom.users = chatRoom.users.filter(user => user.id !== userId);

  if (chatRoom.users.length === initialUserCount) {
    throw new NotFoundException(`User with ID ${userId} not found in chat room ${chatRoomId}`);
  }

  return this.chatRoomRepository.save(chatRoom);
}
}