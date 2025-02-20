import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { userRole } from './Enums/userRole.enum';
import { ChatRoom } from '../chatrooms/chatroom.entity';
import { Message } from 'src/messages/message.entity';
// import { Message } from 'src/messages/message.entity';

/**
  User entity representing the user table in the database.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  /**
    First name of the user.
    @example "John"
   */
  @Column('varchar', { length: 100, nullable: false })
  firstName: string;

  /**
     Last name of the user.
    @example "Doe"
   */
  @Column('varchar', { length: 100 })
  lastName: string;

  /**
   Unique email address of the user.
    @example "johndoe@example.com"
   */
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column('varchar', { nullable: true })
  password?: string;

  /**
    @description Role of the user in the application. Default is `USER`.
   @example "USER"
   */
  @Column({ type: 'enum', enum: userRole, default: userRole.USER })
  userRole?: userRole;

  /**
    @description Google ID for authentication when the user signs up with Google.
    @example "123456789-google-id"
   */
  @Column('varchar', { length: 225, nullable: true })
  googleId?: string;

  /**
    Many-to-Many relationship between users and chat rooms.
    This allows a user to be part of multiple chat rooms.
   */
  @ManyToMany(() => ChatRoom, (chatRoom) => chatRoom.users)
  @JoinTable() // This creates a junction table to link users and chat rooms
  chatRooms: ChatRoom[];

  // One-to-Many relationship with Message
  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
  messages: Message[]; // ✅ Make sure this exists
}
