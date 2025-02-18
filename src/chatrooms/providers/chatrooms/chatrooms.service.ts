import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from '../../../chatrooms/chatroom.entity'; 
import { CreateChatRoomDto } from '../../../chatrooms/DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from '../../../chatrooms/DTOs/update-chat-room.dto';
import { User } from '../../../users/user.entitly'; 
import { ChatRoomType } from 'src/chatrooms/enums/chatroomType';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  async create(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    const users = await this.userRepository.findByIds(createChatRoomDto.userIds);
    
    if (users.length !== createChatRoomDto.userIds.length) {
      throw new BadRequestException('One or more users not found');
    }

    if (createChatRoomDto.type === ChatRoomType.PRIVATE && users.length !== 2) {
      throw new BadRequestException('Private chat rooms must have exactly 2 users');
    }

    const chatRoom = this.chatRoomRepository.create({
      ...createChatRoomDto,
      users,
    });

    return this.chatRoomRepository.save(chatRoom);
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }

    return chatRoom;
  }

  async update(id: string, updateChatRoomDto: UpdateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = await this.findOne(id);
    
    if (updateChatRoomDto.userIds) {
      const users = await this.userRepository.findByIds(updateChatRoomDto.userIds);
      
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

  async remove(id: string): Promise<void> {
    const result = await this.chatRoomRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
  }

  async addUserToChatRoom(chatRoomId: string, userId: string): Promise<ChatRoom> {
    const chatRoom = await this.findOne(chatRoomId);
    const user = await this.userRepository.findOne({ where: { id: Number(userId) }});

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (chatRoom.type === ChatRoomType.PRIVATE) {
      throw new BadRequestException('Cannot add users to private chat rooms');
    }

    chatRoom.users.push(user);
    return this.chatRoomRepository.save(chatRoom);
  }

  async removeUserFromChatRoom(chatRoomId: string, userId: string): Promise<ChatRoom> {
    const chatRoom = await this.findOne(chatRoomId);

    if (chatRoom.type === ChatRoomType.PRIVATE) {
      throw new BadRequestException('Cannot remove users from private chat rooms');
    }

    chatRoom.users = chatRoom.users.filter(user => user.id !== Number(userId));
    return this.chatRoomRepository.save(chatRoom);
  }
}