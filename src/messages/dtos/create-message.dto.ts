import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MessageType } from '../enum/message-type ';

export class CreateMessageDto {
  @IsNotEmpty()
  chatRoomId: number;

  @IsString()
  @IsNotEmpty()
  text?: string;
  
  @IsString()
  @IsOptional()
  audio?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsOptional()
  @IsEnum(MessageType)
  messageType: MessageType;
}
