// import { ChatRoom } from 'src/chatrooms/chatroom.entity';
// import { User } from 'src/users/user.entitly';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

// @Entity()
// export class Message {
//   @PrimaryGeneratedColumn()
//   id: string;

//   @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.id)
//   chatRoom: ChatRoom;

//   @ManyToOne(() => User, (user) => user.id)
//   sender: User;

//   @Column()
//   text: string;

//   @CreateDateColumn()
//   timestamp: Date;
// }