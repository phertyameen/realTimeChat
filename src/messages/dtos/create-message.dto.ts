import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MessageType } from '../enum/message-type ';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for creating a message.
 */
export class CreateMessageDto {
  /**
   * The ID of the chat room where the message is sent.
   */
  @ApiProperty({ description: 'The id of the chatroom', example: [1, 2] })
  @IsNotEmpty()
  chatRoomId: number;

  /**
   * The text content of the message.
   */
  @ApiProperty({ description: 'The text content of the message', example: 'hello', required:false })
  @IsString()
  @IsNotEmpty()
  text?: string;
  
  /**
   * The URL of the audio file if the message contains an audio attachment.
   */
  @ApiProperty({ description: 'The URL of the audio file if the message contains an audio attachment', required:false })
  @IsString()
  @IsOptional()
  audio?: string;

  /**
   * The URL of the file if the message contains an attachment.
   */
  @ApiProperty({ description: 'The URL of the file if the message contains an attachment', required:false })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  /**
   * The type of the message (e.g., text, audio, file, etc.).
   */
  @ApiProperty({ description: 'The type of the message (e.g., text, audio, file, etc.)', example:'audio', required:false })
  @IsOptional()
  @IsEnum(MessageType)
  messageType: MessageType;
}
