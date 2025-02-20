// src/chatrooms/chatroom.controller.ts
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
import { ChatRoomService } from './providers/chatrooms/chatrooms.service';
import { CreateChatRoomDto } from './DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from './DTOs/update-chat-room.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chat-rooms')
// @UseGuards(JwtAuthGuard)
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

    /**chat room to create a post */
  @Post()
  create(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomService.create(createChatRoomDto);
  }

  @Get()
  findAll() {
    return this.chatRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatRoomDto: UpdateChatRoomDto
  ) {
    return this.chatRoomService.update(id, updateChatRoomDto);
  }

  /**chat room to delete a post */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chatRoomService.remove(id);
  }

  @Post(':id/users/:userId')
  addUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.chatRoomService.addUserToChatRoom(id, userId);
  }

  @Delete(':id/users/:userId')
  removeUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.chatRoomService.removeUserFromChatRoom(id, userId);
  }
}