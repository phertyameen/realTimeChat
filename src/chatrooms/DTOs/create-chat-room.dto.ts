import { IsString, IsEnum, IsArray, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { ChatRoomType } from '../enums/chatroomType'; 
import { Type } from 'class-transformer';

export class CreateChatRoomDto {
  @IsString()
  name: string;

  @IsEnum(ChatRoomType)
  @IsOptional()
  type?: ChatRoomType;


  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  userIds: number[];
}