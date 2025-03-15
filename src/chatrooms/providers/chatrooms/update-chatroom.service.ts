import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/chatrooms/chatroom.entity'; 
import { User } from 'src/users/user.entitly'; 
import { UpdateChatRoomDto } from 'src/chatrooms/DTOs/update-chat-room.dto';
import { ChatRoomType } from 'src/chatrooms/enums/chatroomType'; 
import { FindChatRoomUseCase } from './find-chatroom.service'; 

@Injectable()
export class UpdateChatRoomUseCase {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private findChatRoomUseCase: FindChatRoomUseCase
  ) {}

  async execute(id: number, updateChatRoomDto: UpdateChatRoomDto, currentUserId: number): Promise<ChatRoom> {
    const chatRoom = await this.findChatRoomUseCase.findOne(id);
    
    // Check if the current user is the owner
    if (chatRoom.ownerId !== currentUserId) {
      throw new ForbiddenException('Only the chat room owner can update this chat room');
    }
    
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

      // Ensure the owner remains in the chat room
      if (!updateChatRoomDto.userIds.includes(currentUserId)) {
        throw new BadRequestException('The owner cannot be removed from the chat room');
      }

      chatRoom.users = users;
    }

    // Update other fields
    if (updateChatRoomDto.name) chatRoom.name = updateChatRoomDto.name;
    if (updateChatRoomDto.type) chatRoom.type = updateChatRoomDto.type;

    return this.chatRoomRepository.save(chatRoom);
  }
}