import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ChatRoomsService } from './providers/chatrooms/chatrooms.service';

/**chat room Controller */
@Controller('chatroom')
export class ChatRoomsController {
  constructor(private readonly chatRoomService: ChatRoomsService) {}

    /**chat room to create a post */
  @Post()
  create(@Body() { name, userIds, type }) {
    return this.chatRoomService.create(name, userIds, type);
  }

    /**chat room to get a  single post by id */
  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.chatRoomService.findAll(userId);
  }

  /**chat room to delete a post */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.chatRoomService.delete(id);
  }
}