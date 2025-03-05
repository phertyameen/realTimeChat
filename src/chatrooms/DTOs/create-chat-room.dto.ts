import { IsString, IsEnum, IsArray, IsOptional, IsNumber } from 'class-validator';
import { ChatRoomType } from '../enums/chatroomType'; 
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a chat room
 */
export class CreateChatRoomDto {
  /**
   * The name of the chatroom
   */
  @ApiProperty({ description: 'The name of the chatroom', example: 'General Chat' })
  @IsString()
  name: string;

  /**
   * The type of chatroom (optional)
   */
  @ApiProperty({ description: 'The type of chatroom', enum: ChatRoomType, required: false })
  @IsEnum(ChatRoomType)
  @IsOptional()
  type?: ChatRoomType;

  /**
   * List of user IDs participating in the chat room
   */
  @ApiProperty({ description: 'Array of user IDs participating in the chat room', example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  userIds: number[];
}
