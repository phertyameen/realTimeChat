import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

/**
  Message entity representing the user table in the database.
 */
@Entity()
export class Message {
  /**unique identifier */
  @PrimaryGeneratedColumn()
  id: string;

    /**Many-to-one relationship between chatroom and messages */
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.id)
  chatRoom: ChatRoom;

    /**Many-to-one relationship between users and messages */
  @ManyToOne(() => User, (user) => user.id)
  sender: User;

    /**The text entered by the user */
  @Column()
  text: string;

  /** time stamp of the user.*/
  @CreateDateColumn()
  timestamp: Date;
}