import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToMany(() => User, (user) => user.chatRooms, {
    onDelete: 'CASCADE' // Automatically handles the relationship cleanup
  })
  users: User[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ name: 'owner_id', nullable: true }) // Made nullable temporarily
  ownerId: number;

  @CreateDateColumn()
  createdAt: Date;
}