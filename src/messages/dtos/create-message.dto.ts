import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MessageType } from '../enum/message-type ';

export class CreateMessageDto {
  @IsNotEmpty()
  chatRoomId: string;

  @IsString()
  @IsNotEmpty()
  text?: string;

  @IsString()
  @IsNotEmpty()
  audio?: string;

  @IsString()
  @IsNotEmpty()
  fileUrl?: string;

  @IsOptional()
  @IsEnum(MessageType)
  messageType: MessageType;
}
