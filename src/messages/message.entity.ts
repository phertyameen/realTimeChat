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

/**
 * Entity representing a message in a chat room.
 */
@Entity()
export class Message {
  /**
   * Unique identifier for the message.
   */
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * The chat room to which this message belongs.
   */
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.id, { onDelete: 'CASCADE' })
  chatRoom: ChatRoom;

  /**
   * The user who sent the message.
   */
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  sender: User;

  /**
   * The type of the message (e.g., text, file, etc.).
   */
  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  messageType: MessageType;

  /**
   * The text content of the message (if applicable).
   */
  @Column({ type: 'text', nullable: true })
  text?: string;
  
  /**
   * The URL of an attached file (if applicable).
   */
  @Column({ type: 'text', nullable: true }) 
  fileUrl?: string;

  /**
   * Timestamp when the message was created.
   */
  @CreateDateColumn()
  timestamp: Date;
}
