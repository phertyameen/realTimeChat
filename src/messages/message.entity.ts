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

  @CreateDateColumn()
  timestamp: Date;
}
