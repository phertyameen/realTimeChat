// import { User } from 'src/users/user.entitly';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, JoinTable } from 'typeorm';
// import { chatroom } from './enums/chatroomType';

// @Entity()
// export class ChatRoom {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column({ default: 'GROUP' }) // 'private' or 'group'
//   type: chatroom;

//   @ManyToMany(() => User, (user) => user.chatRooms)
//   @JoinTable()
//   users: User[];

//   @CreateDateColumn()
//   createdAt: Date;
// }