import { Injectable, BadRequestException } from '@nestjs/common';
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

  async execute(id: number, updateChatRoomDto: UpdateChatRoomDto): Promise<ChatRoom> {
    const chatRoom = await this.findChatRoomUseCase.findOne(id);
    
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
}