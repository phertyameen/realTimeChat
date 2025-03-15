import { Injectable } from '@nestjs/common';
import { ChatRoom } from '../../chatroom.entity';
import { CreateChatRoomDto } from '../../DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from '../../DTOs/update-chat-room.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatRoomUseCase } from './create-chatroom.service';
import { FindChatRoomUseCase } from './find-chatroom.service';
import { UpdateChatRoomUseCase } from './update-chatroom.service';
import { DeleteChatRoomUseCase } from './delete-chatroom.service'; 
import { AddUserToChatRoomUseCase } from './add-user-to-chatroom.service';
import { RemoveUserFromChatRoomUseCase } from './remove-user-from-chatroom.service'; 

@Injectable()
@ApiTags('ChatRooms')
export class ChatRoomService {
  constructor(
    private readonly createChatRoomUseCase: CreateChatRoomUseCase,
    private readonly findChatRoomUseCase: FindChatRoomUseCase,
    private readonly updateChatRoomUseCase: UpdateChatRoomUseCase,
    private readonly deleteChatRoomUseCase: DeleteChatRoomUseCase,
    private readonly addUserToChatRoomUseCase: AddUserToChatRoomUseCase,
    private readonly removeUserFromChatRoomUseCase: RemoveUserFromChatRoomUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new chat room' })
  @ApiResponse({ status: 201, description: 'Chat room created successfully' })
  async create(createChatRoomDto: CreateChatRoomDto, currentUserId: number): Promise<ChatRoom> {
    return this.createChatRoomUseCase.execute(createChatRoomDto, currentUserId);
  }

  @ApiOperation({ summary: 'Get all chat rooms' })
  @ApiResponse({ status: 200, description: 'List of chat rooms retrieved successfully' })
  async findAll(): Promise<ChatRoom[]> {
    return this.findChatRoomUseCase.findAll();
  }

  @ApiOperation({ summary: 'Find a chat room by ID' })
  @ApiResponse({ status: 200, description: 'Chat room found' })
  @ApiResponse({ status: 404, description: 'Chat room not found' })
  async findOne(id: number): Promise<ChatRoom> {
    return this.findChatRoomUseCase.findOne(id);
  }

  @ApiOperation({ summary: 'Update a chat room' })
  @ApiResponse({ status: 200, description: 'Chat room updated successfully' })
  async update(id: number, updateChatRoomDto: UpdateChatRoomDto, currentUserId: number): Promise<ChatRoom> {
    return this.updateChatRoomUseCase.execute(id, updateChatRoomDto, currentUserId);
  }

  @ApiOperation({ summary: 'Delete a chat room' })
  @ApiResponse({ status: 200, description: 'Chat room deleted successfully' })
  async remove(id: number, userId: number): Promise<void> {
    return this.deleteChatRoomUseCase.execute(id, userId);
  }

  @ApiOperation({ summary: 'Add a user to the chat room' })
  @ApiResponse({ status: 200, description: 'User added to the chat room successfully' })
  async addUserToChatRoom(chatRoomId: number, userId: number, currentUserId: number): Promise<ChatRoom> {
    return this.addUserToChatRoomUseCase.execute(chatRoomId, userId, currentUserId);
  }

  @ApiOperation({ summary: 'Delete a user from a chat room' })
  @ApiResponse({ status: 200, description: 'User deleted from chat room successfully' })
  async removeUserFromChatRoom(chatRoomId: number, userId: number, currentUserId: number): Promise<ChatRoom> {
    return this.removeUserFromChatRoomUseCase.execute(chatRoomId, userId, currentUserId);
  }
}