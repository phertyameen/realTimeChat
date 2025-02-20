import { IsString, IsEnum, IsArray, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { ChatRoomType } from '../enums/chatroomType'; 
import { Type } from 'class-transformer';

/**Create chatroomDto class */
export class CreateChatRoomDto {

  /**name of type string */
  @IsString()
  name: string;

  /**chat room of type enum */
  @IsEnum(ChatRoomType)
  @IsOptional()
  type?: ChatRoomType;


  /**user id of type number array */
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  userIds: number[];
}