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

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.id, { onDelete: 'CASCADE' })
  chatRoom: ChatRoom;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  sender: User;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  messageType: MessageType;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'text', nullable: true }) // Store the uploaded file link
  fileUrl?: string;

  @CreateDateColumn()
  timestamp: Date;
}
