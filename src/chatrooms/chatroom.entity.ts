import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entitly'; 
import { ChatRoomType } from './enums/chatroomType';

/**
 * Represents a chat room entity.
 *
 * @class ChatRoom
 */
@Entity('chat_rooms')
export class ChatRoom {
  /**
   * Unique identifier for the chat room.
   * @type {number}
   */
  @PrimaryGeneratedColumn() 
  id: number;

  /**
   * The name of the chat room.
   * @type {string}
   */
  @Column('varchar', { length: 100 })
  name: string;

  /**
   * The type of the chat room (e.g., GROUP or PRIVATE).
   * @type {ChatRoomType}
   */
  @Column({
    type: 'enum',
    enum: ChatRoomType,
    default: ChatRoomType.GROUP
  })
  type: ChatRoomType;

  /**
   * Users who are part of the chat room.
   * @type {User[]}
   */
  @ManyToMany(() => User, (user) => user.chatRooms, {
    onDelete: 'CASCADE'
  })
  users: User[];

  /**
   * The owner of the chat room.
   * @type {User}
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  /**
   * The ID of the owner.
   * @type {number}
   */
  @Column({ name: 'owner_id', nullable: true })
  ownerId: number;

  /**
   * The timestamp when the chat room was created.
   * @type {Date}
   */
  @CreateDateColumn()
  createdAt: Date;
}
