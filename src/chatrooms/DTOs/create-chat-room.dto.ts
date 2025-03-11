import { IsString, IsEnum, IsArray, IsOptional, IsNumber } from 'class-validator';
import { ChatRoomType } from '../enums/chatroomType';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for creating a chat room.
 */
export class CreateChatRoomDto {
  /**
   * The name of the chat room.
   */
  @ApiProperty({ description: 'The name of the chat room', example: 'General Chat' })
  @IsString()
  name: string;

  /**
   * The type of chat room (optional).
   */
  @ApiProperty({ description: 'The type of chat room', enum: ChatRoomType, required: false })
  @IsEnum(ChatRoomType)
  @IsOptional()
  type?: ChatRoomType;

  /**
   * A list of user IDs participating in the chat room.
   */
  @ApiProperty({ description: 'Array of user IDs participating in the chat room', example: [1, 2, 3], type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  userIds: number[];
}
