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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Req
} from '@nestjs/common';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service';
import { CreateChatRoomDto } from './DTOs/create-chat-room.dto';
import { UpdateChatRoomDto } from './DTOs/update-chat-room.dto';
import { Request } from 'express';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user?: {
    sub: number;
    email: string;
  };
}

@Controller('chat-rooms')
// @UseGuards(JwtAuthGuard)
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  create(@Body() createChatRoomDto: CreateChatRoomDto, @Req() req: RequestWithUser) {
    const userId = req.user?.sub || 1; // Default to user ID 1 for now
    return this.chatRoomService.create(createChatRoomDto, userId);
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