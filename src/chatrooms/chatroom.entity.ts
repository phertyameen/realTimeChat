import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entitly'; 
import { ChatRoomType } from './enums/chatroomType';


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

  @Column({
    type: 'enum',
    enum: ChatRoomType,
    default: ChatRoomType.GROUP
  })
  type: ChatRoomType;

    /**Many-many relationship between the user and the chat room */
  @ManyToMany(() => User, (user) => user.chatRooms)
  @JoinTable({
    name: 'chat_room_users',
    joinColumn: {
      name: 'chat_room_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];

  /**The date the chat was created */
  @CreateDateColumn()
  createdAt: Date;
}