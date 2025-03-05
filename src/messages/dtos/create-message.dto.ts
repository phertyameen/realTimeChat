import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MessageType } from '../enum/message-type ';

/**
 * Data Transfer Object (DTO) for creating a message.
 */
export class CreateMessageDto {
  /**
   * The ID of the chat room where the message is sent.
   */
  @IsNotEmpty()
  chatRoomId: number;

  /**
   * The text content of the message.
   */
  @IsString()
  @IsNotEmpty()
  text?: string;
  
  /**
   * The URL of the audio file if the message contains an audio attachment.
   */
  @IsString()
  @IsOptional()
  audio?: string;

  /**
   * The URL of the file if the message contains an attachment.
   */
  @IsString()
  @IsOptional()
  fileUrl?: string;

  /**
   * The type of the message (e.g., text, audio, file, etc.).
   */
  @IsOptional()
  @IsEnum(MessageType)
  messageType: MessageType;
}
