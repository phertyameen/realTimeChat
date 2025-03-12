import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';
import { ChatRoomType } from 'src/chatrooms/enums/chatroomType';
import { FindChatRoomUseCase } from './find-chatroom.service';

@Injectable()
export class AddUserToChatRoomUseCase {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private findChatRoomUseCase: FindChatRoomUseCase
  ) {}

  async execute(chatRoomId: number, userId: number): Promise<ChatRoom> {
    const chatRoom = await this.findChatRoomUseCase.findOne(chatRoomId);
    const user = await this.userRepository.findOne({ 
      where: { id: Number(userId) }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (chatRoom.type === ChatRoomType.PRIVATE) {
      throw new BadRequestException('Cannot add users to private chat rooms');
    }

    // Check if user is already in the chat room
    const userExists = chatRoom.users.some(u => u.id === userId);
    if (userExists) {
      throw new BadRequestException(`User with ID ${userId} is already in chat room ${chatRoomId}`);
    }

    chatRoom.users.push(user);
    return this.chatRoomRepository.save(chatRoom);
  }
}