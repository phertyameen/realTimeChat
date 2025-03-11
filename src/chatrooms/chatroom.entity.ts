import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entitly'; 
import { ChatRoomType } from './enums/chatroomType';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a chat room entity.
 *
 * @class ChatRoom
 */
@Entity('chat_rooms')
export class ChatRoom {
  /**
   * Unique identifier for the chat room.
   */
  @ApiProperty({ description: 'Unique identifier for the chat room' })
  @PrimaryGeneratedColumn() 
  id: number;

  /**
   * The name of the chat room.
   */
  @ApiProperty({ description: 'The name of the chat room', maxLength: 100 })
  @Column('varchar', { length: 100 })
  name: string;

  /**
   * The type of the chat room (e.g., GROUP or PRIVATE).
   */
  @ApiProperty({ description: 'The type of the chat room', enum: ChatRoomType, default: ChatRoomType.GROUP })
  @Column({
    type: 'enum',
    enum: ChatRoomType,
    default: ChatRoomType.GROUP
  })
  type: ChatRoomType;

  /**
   * Users who are part of the chat room.
   */
  @ApiProperty({ description: 'Users who are part of the chat room', type: () => [User] })
  @ManyToMany(() => User, (user) => user.chatRooms, {
    onDelete: 'CASCADE'
  })
  users: User[];

  /**
   * The owner of the chat room.
   */
  @ApiProperty({ description: 'The owner of the chat room', type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  /**
   * The ID of the owner.
   */
  @ApiProperty({ description: 'The ID of the owner', nullable: true })
  @Column({ name: 'owner_id', nullable: true })
  ownerId: number;

  /**
   * The timestamp when the chat room was created.
   */
  @ApiProperty({ description: 'The timestamp when the chat room was created' })
  @CreateDateColumn()
  createdAt: Date;
}
