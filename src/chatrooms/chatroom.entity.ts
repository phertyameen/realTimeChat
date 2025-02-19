import { User } from 'src/users/user.entitly';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable } from 'typeorm';
import { chatroom } from './enums/chatroomType';

/**chat room entity */
@Entity()
export class ChatRoom {
  /**Unique identifier */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
    name of the user.
   */
  @Column()
  name: string;

    /**Type of the chat room Private or group */
  @Column({ default: 'GROUP' }) // 'private' or 'group'
  type: chatroom;

    /**Many-many relationship between the user and the chat room */
  @ManyToMany(() => User, (user) => user.chatRooms)
  @JoinTable()
  users: User[];

  /**The date the chat was created */
  @CreateDateColumn()
  createdAt: Date;
}