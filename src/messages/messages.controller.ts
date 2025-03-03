import { Controller, Post, Get, Delete, Patch, Body, Param } from '@nestjs/common';
import { MessageService } from './provider/message.service';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.create(createMessageDto); 
  }

  @Get(':chatRoomId')
  async findAll(@Param('chatRoomId') chatRoomId: string) {
    return await this.messageService.findAll(chatRoomId);
  }

  @Delete(':messageId')
  async delete(@Param('messageId') messageId: string) {
    return await this.messageService.delete(messageId);
  }

  @Patch(':messageId')
  async update(@Param('messageId') messageId: string, @Body() updateMessageDto: UpdateMessageDto) {
    return await this.messageService.update(messageId, updateMessageDto); 
  }
}
