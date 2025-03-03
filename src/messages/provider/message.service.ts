import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageType } from '../message.entity';
import { ChatRoom } from '../../chatrooms/chatroom.entity';
import { User } from '../../users/user.entitly';
import { CreateMessageDto } from '../dto/message.dto'; 
import { UpdateMessageDto } from '../dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
    @InjectRepository(ChatRoom) private chatRoomsRepo: Repository<ChatRoom>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { chatRoomId, senderId, type, text, fileUrl } = createMessageDto;

    const chatRoom = await this.chatRoomsRepo.findOne({ where: { id: chatRoomId as any } });
    if (!chatRoom) throw new NotFoundException('Chat room not found');

    const sender = await this.usersRepo.findOne({ where: { id: senderId as any } });
    if (!sender) throw new NotFoundException('Sender not found');

    if (type === MessageType.TEXT && !text) {
      throw new BadRequestException('Text message cannot be empty');
    }

    if ((type === MessageType.IMAGE || type === MessageType.FILE || type === MessageType.AUDIO) && !fileUrl) {
      throw new BadRequestException('File URL must be provided for media messages');
    }

    const message = this.messagesRepo.create({ chatRoom, sender, type, text, fileUrl });
    return await this.messagesRepo.save(message);
  }

  async findAll(chatRoomId: string): Promise<Message[]> {
    return await this.messagesRepo.find({
      where: { chatRoom: { id: chatRoomId as any } },
      relations: ['sender'],
    });
  }

  async delete(messageId: string): Promise<void> {
    const result = await this.messagesRepo.delete(messageId);
    if (result.affected === 0) throw new NotFoundException('Message not found');
  }

  async update(messageId: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.messagesRepo.findOne({ where: { id: messageId } });
    if (!message) throw new NotFoundException('Message not found');

    if (message.type !== MessageType.TEXT) {
      throw new BadRequestException('Only text messages can be updated');
    }

    message.text = updateMessageDto.text;
    return await this.messagesRepo.save(message);
  }
}
