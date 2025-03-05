
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from '../../chatroom.entity';
import { CreateChatRoomDto } from '../../DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from '../../DTOs/update-chat-room.dto';
import { User } from 'src/users/user.entitly';
import { ChatRoomType } from '../../enums/chatroomType';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


/**
 * Service responsible for handling chat room operations.
 */
@Injectable()
@ApiTags('ChatRooms')
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new chat room.
   * @param createChatRoomDto Data transfer object containing chat room details.
   * @param currentUserId ID of the current user.
   * @returns The created chat room.
   */
  @ApiOperation({ summary: 'Create a new chat room' })
  @ApiResponse({ status: 201, description: 'Chat room created successfully' })
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

  /**
   * Retrieves all chat rooms.
   * @returns List of chat rooms.
   */
  @ApiOperation({ summary: 'Get all chat rooms' })
  @ApiResponse({ status: 200, description: 'List of chat rooms retrieved successfully' })
  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      relations: ['users'],
    });
  }

/** Method for finding a chat room by ID*/
/**
   * Finds a chat room by ID.
   * @param id Chat room ID.
   * @returns The found chat room.
   */
@ApiOperation({ summary: 'Find a chat room by ID' })
@ApiResponse({ status: 200, description: 'Chat room found' })
@ApiResponse({ status: 404, description: 'Chat room not found' })
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
/**
   * Updates a chat room.
   * @param id Chat room ID.
   * @param updateChatRoomDto DTO containing updated data.
   * @returns The updated chat room.
   */
@ApiOperation({ summary: 'Update a chat room' })
@ApiResponse({ status: 200, description: 'Chat room updated successfully' })
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


/**
   * Deletes a chat room.
   * @param id Chat room ID.
   * @param userId Optional user ID for permission checks.
   */
@ApiOperation({ summary: 'Delete a chat room' })
@ApiResponse({ status: 200, description: 'Chat room deleted successfully' })
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

  /**
   * Add a user to the chat room.
   * @param id user ID.
   * @returns The found chat room.
   */
@ApiOperation({ summary: 'Find a user in the chat room by ID' })
@ApiResponse({ status: 200, description: 'User added to the chat room successfully' })

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

/**
   * Deletes a user from chat room.
   * @param id Chat room ID.
   * @param userId Optional user ID for permission checks.
   */
@ApiOperation({ summary: 'Delete a user from a chat room' })
@ApiResponse({ status: 200, description: 'user deleted from Chat room successfully' })
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