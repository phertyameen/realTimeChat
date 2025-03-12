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
  @ApiProperty({ description: 'The ID of the chatroom', example: 1, type: Number })
  @IsNotEmpty()
  chatRoomId: number;

  /**
   * The text content of the message.
   */
  @ApiProperty({ description: 'The text content of the message', example: 'hello', required: false })
  @IsString()
  @IsOptional()
  text?: string;

  /**
   * The URL of the audio file if the message contains an audio attachment.
   */
  @ApiProperty({ description: 'The URL of the audio file if the message contains an audio attachment', required: false })
  @IsString()
  @IsOptional()
  audio?: string;

  /**
   * The URL of the file if the message contains an attachment.
   */
  @ApiProperty({ description: 'The URL of the file if the message contains an attachment', required: false })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  /**
   * The content of the message (optional, since 'text' might be used instead).
   */
  @ApiProperty({ description: 'The full message content', required: false })
  @IsString()
  @IsOptional() // ✅ Now optional to prevent errors
  content?: string;

  /**
   * The type of the message (e.g., text, audio, file, etc.).
   */
  @ApiProperty({ description: 'The type of the message', example: MessageType.AUDIO, enum: MessageType, required: false })
  @IsOptional()
  @IsEnum(MessageType)
  messageType?: MessageType;
}
