import { IsString, IsEnum, IsArray, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { ChatRoomType } from '../enums/chatroomType'; 
import { Type } from 'class-transformer';

/**create chatroom dto class */
export class CreateChatRoomDto {

  /**The name of the chatroom of type string */
  @IsString()
  name: string;

  /**The type of chatroom of type enum */
  @IsEnum(ChatRoomType)
  @IsOptional()
  type?: ChatRoomType;


  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  userIds: number[];
}