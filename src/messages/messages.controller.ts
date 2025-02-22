import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { MessageService } from './provider/message.service';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Send a new message with the active user as the sender
   */
  @Post()
  async create(
    @ActiveUser() user: ActiveUserData,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    // Override senderId from payload using the active user's sub property.
    console.log(user);
    return await this.messageService.create(createMessageDto, user);
  }

  // GET: Get all messages in a chat room
  @Get(':chatRoomId')
  async findAll(@Param('chatRoomId') chatRoomId: string) {
    return await this.messageService.findAll(chatRoomId);
  }

  // DELETE: Delete a message by ID
  @Delete(':messageId')
  async delete(@Param('messageId') messageId: string) {
    return await this.messageService.delete(messageId);
  }

  // PATCH: Update a message text by ID
  @Patch(':messageId')
  async update(
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageService.update(messageId, updateMessageDto);
  }
}
