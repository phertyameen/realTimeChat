import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { ChatRoomType } from 'src/chatrooms/enums/chatroomType'; 
import { FindChatRoomUseCase } from './find-chatroom.service';

@Injectable()
export class RemoveUserFromChatRoomUseCase {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    private findChatRoomUseCase: FindChatRoomUseCase
  ) {}

  async execute(chatRoomId: number, userId: number, currentUserId: number): Promise<ChatRoom> {
    const chatRoom = await this.findChatRoomUseCase.findOne(chatRoomId);
    
    // Check if current user is the owner
    if (chatRoom.ownerId !== currentUserId) {
      throw new ForbiddenException('Only the chat room owner can remove users');
    }

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
