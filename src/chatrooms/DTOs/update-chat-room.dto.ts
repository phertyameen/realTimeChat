import { PartialType } from '@nestjs/mapped-types';
import { CreateChatRoomDto } from './create-chat-room.dto';

/**Update chat roomDto class */
export class UpdateChatRoomDto extends PartialType(CreateChatRoomDto) {}