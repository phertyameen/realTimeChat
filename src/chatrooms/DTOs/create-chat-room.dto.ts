import { IsString, IsEnum, IsArray, IsUUID, IsOptional } from 'class-validator';
import { ChatRoomType } from '../enums/chatroomType'; 

export class CreateChatRoomDto {
  @IsString()
  name: string;

  @IsEnum(ChatRoomType)
  @IsOptional()
  type?: ChatRoomType;

  @IsArray()
  @IsUUID('4', { each: true })
  userIds: string[];
}