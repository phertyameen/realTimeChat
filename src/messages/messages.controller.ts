import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessagesService } from './providers/messages/messages.service';

/**
  Controller for managing messages-related operations.
 */
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

   /**Send message method */
  @Post()
  sendMessage(@Body() { chatRoomId, senderId, text }) {
    return this.messageService.sendMessage(chatRoomId, senderId, text);
  }

    /**Get messages method based on chat id */
  @Get(':chatRoomId')
  getMessages(@Param('chatRoomId') chatRoomId: string) {
    return this.messageService.getMessages(chatRoomId);
  }
}