import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { userRole } from './Enums/userRole.enum';
import { ChatRoom } from '../chatrooms/chatroom.entity';
import { Message } from 'src/messages/message.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a user.
 */
@Entity()
export class User {
  /**
   * Unique identifier for the user.
   */
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * First name of the user.
   */
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @Column('varchar', { length: 100, nullable: false })
  firstName: string;

  /**
   * Last name of the user.
   */
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @Column('varchar', { length: 100 })
  lastName: string;

  /**
   * Email address of the user.
   */
  @ApiProperty({ example: 'johndoe@mail.com', description: 'Email address of the user' })
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  /**
   * Password of the user (excluded from serialization).
   */
  @ApiProperty({ example: '@Password123', description: 'Password of the user', required: false })
  @Exclude()
  @Column('varchar', { nullable: true })
  password?: string;

  /**
   * Role of the user.
   */
  @ApiProperty({ enum: userRole, example: userRole.USER, description: 'Role of the user' })
  @Column({ type: 'enum', enum: userRole, default: userRole.USER })
  userRole?: userRole;

  /**
   * Google ID (if signed up with Google).
   */
  @ApiProperty({ example: 'google-unique-id', description: 'Google ID of the user', required: false })
  @Column('varchar', { length: 225, nullable: true })
  googleId?: string;

  /**
   * List of chat rooms the user is part of.
   */
  @ApiProperty({ type: () => [ChatRoom], description: 'List of chat rooms the user is part of', required: false })
  @IsOptional()
  @ManyToMany(() => ChatRoom, (chatRoom) => chatRoom.users)
  @JoinTable()
  chatRooms?: ChatRoom[];

  /**
   * Messages sent by the user.
   */
  @ApiProperty({ type: () => [Message], description: 'Messages sent by the user', required: false })
  @IsOptional()
  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
  messages?: Message[];
}
