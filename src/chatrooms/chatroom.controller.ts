import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service';
import { CreateChatRoomDto } from './DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from './DTOs/update-chat-room.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * Controller for managing chat rooms.
 */
@ApiTags('Chat Rooms')
@Controller('chat-rooms')
// @UseGuards(JwtAuthGuard)
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  /**
   * Create a new chat room.
   */
  @ApiOperation({ summary: 'Create a chat room' })
  @ApiBody({ type: CreateChatRoomDto })
  @ApiResponse({ status: 201, description: 'Chat room successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomService.create(createChatRoomDto);
  }

  /**
   * Retrieve all chat rooms.
   */
  @ApiOperation({ summary: 'Retrieve all chat rooms' })
  @ApiResponse({ status: 200, description: 'List of chat rooms.' })
  @Get()
  findAll() {
    return this.chatRoomService.findAll();
  }

  /**
   * Retrieve a specific chat room by ID.
   */
  @ApiOperation({ summary: 'Retrieve a chat room by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chat room found.' })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomService.findOne(id);
  }

  /**
   * Update an existing chat room.
   */
  @ApiOperation({ summary: 'Update a chat room' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateChatRoomDto })
  @ApiResponse({ status: 200, description: 'Chat room updated successfully.' })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatRoomDto: UpdateChatRoomDto
  ) {
    return this.chatRoomService.update(id, updateChatRoomDto);
  }

  /**
   * Delete a chat room.
   */
  @ApiOperation({ summary: 'Delete a chat room' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chat room deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomService.remove(id);
  }

  /**
   * Add a user to a chat room.
   */
  @ApiOperation({ summary: 'Add a user to a chat room' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'User added successfully.' })
  @ApiResponse({ status: 404, description: 'Chat room or user not found.' })
  @Post(':id/users/:userId')
  addUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.chatRoomService.addUserToChatRoom(id, userId);
  }

  /**
   * Remove a user from a chat room.
   */
  @ApiOperation({ summary: 'Remove a user from a chat room' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'User removed successfully.' })
  @ApiResponse({ status: 404, description: 'Chat room or user not found.' })
  @Delete(':id/users/:userId')
  removeUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.chatRoomService.removeUserFromChatRoom(id, userId);
  }
}
