import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Req
} from '@nestjs/common';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service';
import { CreateChatRoomDto } from './DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from './DTOs/update-chat-room.dto';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
/**Request with user interface */
interface RequestWithUser extends Request {
  user?: {
    sub: number;
    email: string;
  };
}

/**
 * Controller for managing chat rooms.
 */
@ApiTags('chatrooms')
@Controller('chat-rooms')
// @UseGuards(JwtAuthGuard)
/**chatroom controller class */
export class ChatRoomController {
  /**inject chatroomservice */
  constructor(private readonly chatRoomService: ChatRoomService) {}

  /**
   * Creates a new chat room.
   * @param createChatRoomDto DTO containing chat room details.
   * @param req Request object containing the authenticated user.
   * @returns The created chat room.
   */
  @ApiOperation({ summary: 'Create a chat room' })
  @ApiResponse({ status: 201, description: 'Chat room created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @Post()
  /**create method */
  create(@Body() createChatRoomDto: CreateChatRoomDto, @Req() req: RequestWithUser) {
    const userId = req.user?.sub || 1; // Default to user ID 1 for now
    return this.chatRoomService.create(createChatRoomDto, userId);
  }

  /**
   * Retrieves all chat rooms.
   * @returns An array of chat rooms.
   */
  @ApiOperation({ summary: 'Get all chat rooms' })
  @ApiResponse({ status: 200, description: 'List of chat rooms retrieved successfully.' })
  @Get()
  /**find all method */
  findAll() {
    return this.chatRoomService.findAll();
  }

  /**
   * Retrieves a chat room by ID.
   * @param id Chat room ID.
   * @returns The found chat room.
   */
  @ApiOperation({ summary: 'Find a chat room by ID' })
  @ApiResponse({ status: 200, description: 'Chat room found.' })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomService.findOne(id);
  }

  /**
   * Updates a chat room.
   * @param id Chat room ID.
   * @param updateChatRoomDto DTO containing update details.
   * @returns The updated chat room.
   */
  @ApiOperation({ summary: 'Update a chat room' })
  @ApiResponse({ status: 200, description: 'Chat room updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatRoomDto: UpdateChatRoomDto
  ) {
    return this.chatRoomService.update(id, updateChatRoomDto);
  }

  /**
   * Deletes a chat room.
   * @param id Chat room ID.
   * @param req Request object containing the authenticated user.
   * @returns A success message.
   */
  @ApiOperation({ summary: 'Delete a chat room' })
  @ApiResponse({ status: 200, description: 'Chat room deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Permission denied.' })
  @ApiResponse({ status: 404, description: 'Chat room not found.' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    const userId = req.user?.sub || 1; // Default to user ID 1 for now
    await this.chatRoomService.remove(id, userId);
    return {
      statusCode: HttpStatus.OK,
      message: `Chat room with ID ${id} has been successfully deleted`
    };
  }

  /**
   * Adds a user to a chat room.
   * @param id Chat room ID.
   * @param userId User ID to be added.
   * @returns The updated chat room.
   */
  @ApiOperation({ summary: 'Add a user to a chat room' })
  @ApiResponse({ status: 200, description: 'User added successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @Post(':id/users/:userId')
  addUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.chatRoomService.addUserToChatRoom(id, userId);
  }

  /**
   * Removes a user from a chat room.
   * @param id Chat room ID.
   * @param userId User ID to be removed.
   * @returns The updated chat room.
   */
  @ApiOperation({ summary: 'Remove a user from a chat room' })
  @ApiResponse({ status: 200, description: 'User removed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 404, description: 'User not found in chat room.' })
  @Delete(':id/users/:userId')
  removeUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.chatRoomService.removeUserFromChatRoom(id, userId);
  }
}
