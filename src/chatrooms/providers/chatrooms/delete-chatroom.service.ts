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

  async execute(id: number, userId?: number): Promise<void> {
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
}