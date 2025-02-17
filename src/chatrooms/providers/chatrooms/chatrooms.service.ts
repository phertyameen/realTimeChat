import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomsService {
  constructor(
    /*
     * injecting chatroom repository
     */
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,

    /*
     * injecting user repository
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(name: string, userIds: string[], type: 'private' | 'group') {
    // const users = await this.userRepository.findByIds(userIds);
    // const chatRoom = this.chatRoomRepository.create({ name, users, type });
    // return this.chatRoomRepository.save(chatRoom);
  }

  async findAll(userId: string) {
    return this.chatRoomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async delete(id: string) {
    return this.chatRoomRepository.delete(id);
  }
}
