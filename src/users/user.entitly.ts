import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { userRole } from './Enums/userRole.enum';
// import { ChatRoom } from 'src/chatrooms/chatroom.entity';
// import { Message } from 'src/messages/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column('varchar', { nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.USER })
  userRole?: userRole;

  @Column('varchar', { length: 225, nullable: true })
  googleId?: string;

  // Many-to-Many relationship with ChatRoom
  // @ManyToMany(() => ChatRoom, (chatRoom) => chatRoom.users)
  // @JoinTable() // This creates a junction table to link users and chat rooms
  // chatRooms: ChatRoom[];

  // One-to-Many relationship with Message
  // @OneToMany(() => Message, (message) => message.sender)
  // messages: Message[];
}
