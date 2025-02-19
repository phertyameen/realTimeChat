import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';
import { Repository } from 'typeorm';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Chatroom service class
 */
@Injectable()
@ApiTags('Chat Rooms')
/**
 * Chatroom service class
 */
export class ChatRoomsService {
  constructor(
    /** Injecting chatroom repository */
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,

    /** Injecting user repository */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create method that takes in name, userIds, and type (private or group)
   * @param name - Name of the chatroom
   * @param userIds - List of user IDs
   * @param type - Type of chatroom (private or group)
   * @returns Created chatroom object
   */
  @ApiOperation({ summary: 'Create a chatroom' })
  @ApiResponse({ status: 201, description: 'Chatroom created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })

  /**create method */
  async create(name: string, userIds: string[], type: 'private' | 'group') {
    // const users = await this.userRepository.findByIds(userIds);
    // const chatRoom = this.chatRoomRepository.create({ name, users, type });
    // return this.chatRoomRepository.save(chatRoom);
  }

  /**
   * Find all chatrooms associated with a user
   * @param userId - User ID
   * @returns List of chatrooms
   */
  @ApiOperation({ summary: 'Get all chatrooms for a user' })
  @ApiResponse({ status: 200, description: 'List of chatrooms retrieved successfully' })
  /**Find all */
  async findAll(userId: string) {
    return this.chatRoomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  /**
   * Delete chatroom by ID
   * @param id - Chatroom ID
   * @returns Deletion result
   */
  @ApiOperation({ summary: 'Delete a chatroom' })
  @ApiResponse({ status: 200, description: 'Chatroom deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chatroom not found' })
  async delete(id: string) {
    return this.chatRoomRepository.delete(id);
  }
}
