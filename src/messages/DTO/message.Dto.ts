import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { MessageType } from '../message.entity';

export class CreateMessageDto {
  @IsUUID()
  @IsNotEmpty()
  chatRoomId: string;

  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @IsEnum(MessageType)
  @IsNotEmpty()
  type: MessageType;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;
}

export class UpdateMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
