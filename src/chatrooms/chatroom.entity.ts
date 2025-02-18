import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entitly'; 
import { ChatRoomType } from './enums/chatroomType';

@Entity('chat_rooms')
export class ChatRoom {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: ChatRoomType,
    default: ChatRoomType.GROUP
  })
  type: ChatRoomType;

  @ManyToMany(() => User, (user) => user.chatRooms)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}