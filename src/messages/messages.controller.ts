import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MessageService } from "./provider/message.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ActiveUser } from "src/auth/decorators/activeUser.decorator";
import { ActiveUserData } from "src/auth/interface/activeInterface";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { UpdateMessageDto } from "./dtos/update-message.dto";

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @ActiveUser() user: ActiveUserData,
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.messageService.create(createMessageDto, user, file);
  }

  @Get(':chatRoomId')
  async findAll(@Param('chatRoomId') chatRoomId: string) {
    const chatRoomIdNumber = parseInt(chatRoomId, 10);
    return await this.messageService.findAll(chatRoomIdNumber);
  }

  @Delete(':messageId')
  async delete(@Param('messageId') messageId: string) {
    return await this.messageService.delete(messageId);
  }

  @Patch(':messageId')
  async update(
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messageService.update(messageId, updateMessageDto);
  }
}
