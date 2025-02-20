import { Controller, Post, Get, Delete, Patch, Body, Param } from '@nestjs/common';
import { MessageService } from './provider/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //  POST: Send a new message
  @Post()
  async create(@Body() body: { chatRoomId: string; senderId: string; text: string }) {
    return await this.messageService.create(body.chatRoomId, body.senderId, body.text);
    
  }

  //  GET: Get all messages in a chat room
  @Get(':chatRoomId')
  async findAll(@Param('chatRoomId') chatRoomId: string) {
    return await this.messageService.findAll(chatRoomId);
  }

  //  DELETE: Delete a message by ID
  @Delete(':messageId')
  async delete(@Param('messageId') messageId: string) {
    return await this.messageService.delete(messageId);
  }

  //  PATCH: Update a message text by ID
  @Patch(':messageId')
  async update(@Param('messageId') messageId: string, @Body() body: { text: string }) {
    return await this.messageService.update(messageId, body.text);
  }
}
