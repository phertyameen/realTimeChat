import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';

@Injectable()
export class DeleteChatRoomUseCase {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async execute(id: number, userId: number): Promise<void> {
    // Ensure userId is required and properly converted to number
    const numericUserId = Number(userId);
    
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: Number(id) }
    });
    
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }

    // Always check owner permissions 
    if (chatRoom.ownerId !== numericUserId) {
      throw new ForbiddenException('You do not have permission to delete this chat room');
    }
    
    // First clear the users relationship to avoid foreign key constraints
    chatRoom.users = [];
    await this.chatRoomRepository.save(chatRoom);
    
    // Then remove the chat room
    await this.chatRoomRepository.remove(chatRoom);
  }
}