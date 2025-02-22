import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../message.entity';
import { ChatRoom } from '../../chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';
import { UpdateMessageDto } from '../dtos/update-message.dto';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { ActiveUserData } from 'src/auth/interface/activeInterface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
    @InjectRepository(ChatRoom) private chatRoomsRepo: Repository<ChatRoom>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  /** 
   * Create a new message and save it in the DB 
   */
  // async create(createMessageDto: CreateMessageDto, @ActiveUser() user: ActiveUserData): Promise<Message> {
  //   const { chatRoomId, text } = createMessageDto; 

  //   // Find the chat room
  //   const chatRoom = await this.chatRoomsRepo.findOne({ where: { id: chatRoomId as any } });
  //   if (!chatRoom) {
  //     throw new NotFoundException('Chat room not found');
  //   }
  
  //   // Directly use the active user as the sender
  //   const message = this.messagesRepo.create({ ...createMessageDto, sender: user });
  //   return await this.messagesRepo.save(message);
  // }  

  // Find all messages in a chat room


  async create(createMessageDto: CreateMessageDto, user: ActiveUserData): Promise<Message> {
    const { chatRoomId, text } = createMessageDto;
  
    // Find the chat room
    const chatRoom = await this.chatRoomsRepo.findOne({ where: { id: chatRoomId as any } });
    if (!chatRoom) {
      throw new NotFoundException('Chat room not found');
    }
  
    // Fetch the full user entity from the DB using the identifier in the JWT payload (e.g., user.sub)
    const sender = await this.usersRepo.findOne({ where: { id: user.sub } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }
  
    // Create the message, explicitly associating the chatRoom and sender entities
    const message = this.messagesRepo.create({
      text,
      chatRoom,
      sender,
    });
  
    return await this.messagesRepo.save(message);
  }
  



  async findAll(chatRoomId: string): Promise<Message[]> {
    return await this.messagesRepo.find({ 
      where: { chatRoom: { id: chatRoomId as any } }, 
      relations: ['sender'] 
    });
  }

  // Delete a message
  async delete(messageId: string): Promise<void> {
    const result = await this.messagesRepo.delete(messageId);
    if (result.affected === 0) {
      throw new NotFoundException('Message not found');
    }
  }

  // Update a message text
  async update(messageId: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.messagesRepo.findOne({ where: { id: messageId } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
  
    if (!updateMessageDto || !updateMessageDto.text) {
      throw new BadRequestException('No update values provided');
    }
  
    message.text = updateMessageDto.text;
    return await this.messagesRepo.save(message);
  }
  
}