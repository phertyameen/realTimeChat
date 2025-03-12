import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ChatRoom } from '../chatrooms/chatroom.entity';
import { User } from '../users/user.entitly';
import { MessageType } from './enum/message-type ';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a message in a chat room.
 */
@Entity()
export class Message {
  /**
   * Unique identifier for the message.
   */
  @ApiProperty({ description: 'Unique identifier for the message' })
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * The chat room to which this message belongs.
   */
  @ApiProperty({ description: 'The chat room to which this message belongs', type: () => ChatRoom })
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.id, { onDelete: 'CASCADE' })
  chatRoom: ChatRoom;

  /**
   * The user who sent the message.
   */
  @ApiProperty({ description: 'The user who sent the message', type: () => User })
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  sender: User;

  /**
   * The type of the message (e.g., text, file, etc.).
   */
  @ApiProperty({ description: 'The type of the message', enum: MessageType, default: MessageType.TEXT })
  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  messageType: MessageType;

  /**
   * The text content of the message (if applicable).
   */
  @ApiProperty({ description: 'The text content of the message', nullable: true })
  @Column({ type: 'text', nullable: false })
  text?: string;
  
  /**
   * The URL of an attached file (if applicable).
   */
  @ApiProperty({ description: 'The URL of an attached file', nullable: false })
  @Column({ type: 'text', nullable: true }) 
  fileUrl?: string;

  /**
   * Timestamp when the message was created.
   */
  @ApiProperty({ description: 'Timestamp when the message was created' })
  @CreateDateColumn()
  timestamp: Date;
}
