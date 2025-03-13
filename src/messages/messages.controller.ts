
import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './provider/message.service';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RoleDecorator } from 'src/auth/decorators/role-decorator';
import { RolesGuard } from 'src/auth/guard/roles-guard/role-guard';
import { Role } from 'src/auth/enums/role.enum';

/**
 * message routes
 */
@ApiTags('messages')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
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


  /**
   * Delete a message by ID
   */
  @RoleDecorator(Role.User, Role.Admin)
  @UseGuards(RolesGuard)

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
