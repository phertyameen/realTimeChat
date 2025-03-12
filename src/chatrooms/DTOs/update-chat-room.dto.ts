import { PartialType } from '@nestjs/mapped-types';
import { CreateChatRoomDto } from './create-chat-room.dto';

/**update chatroom dto */
export class UpdateChatRoomDto extends PartialType(CreateChatRoomDto) {}