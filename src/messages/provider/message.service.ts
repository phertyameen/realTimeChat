import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Message } from '../message.entity';
import { ChatRoom } from '../../chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';
import { UpdateMessageDto } from '../dtos/update-message.dto';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { CloudinaryService } from 'src/cloudinary-provider/cloudinary.service';

/**message service class */
@Injectable()
export class MessageService {
  constructor(
    /**
     * inject messageRepo
     */
    @InjectRepository(Message)
    private messagesRepo: Repository<Message>,

    /**
     * inject chatRoomsRepo
     */
    @InjectRepository(ChatRoom)
    private chatRoomsRepo: Repository<ChatRoom>,

    /**
     * inject usersRepo
     */
    @InjectRepository(User)
    private usersRepo: Repository<User>,

    /**inject cloudinary service */
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**Create method */
  async create(
    createMessageDto: CreateMessageDto,
    user: ActiveUserData,
    file?: Express.Multer.File,
  ): Promise<Message> {
    const { chatRoomId, text } = createMessageDto;

    //  Find the chat room
    const chatRoom = await this.chatRoomsRepo.findOne({
      where: { id: createMessageDto.chatRoomId },
    });
    if (!chatRoom) throw new NotFoundException('Chat room not found');

    //  Find the sender
    const sender = await this.usersRepo.findOne({ where: { id: user.sub } });
    console.log(sender);
    if (!sender) throw new NotFoundException('Sender not found');

    //  Handle file upload if provided
    let fileUrl: string | undefined;
    if (file) {
      console.log('Incoming File:', file);
      try {
        const uploadResult = await this.cloudinaryService.uploadFile(file);
        console.log('Cloudinary Upload Result:', uploadResult);
        fileUrl = uploadResult.secure_url;
      } catch (error) {
        console.error('File upload error:', error);
        throw new BadRequestException('File upload failed');
      }
    }

    //  Create message
    const message = this.messagesRepo.create({
      chatRoom,
      sender,
      text: createMessageDto.text,
      fileUrl,
    } as DeepPartial<Message>);
    console.log('Message Before Save:', message);

    //Save message correctly
    const savedMessage = await this.messagesRepo.save(message);
    console.log('Saved Message:', savedMessage);
    return savedMessage; // Ensure returning a single object
  }

  /**
   * find all messages in a chatroom
   */
  async findAll(chatRoomId: string): Promise<Message[]> {
    return await this.messagesRepo.find({
      where: { chatRoom: { id: chatRoomId as any } },
      relations: ['sender'],
    });
  }

  /**
   * Delete a message
   */
  async delete(messageId: string): Promise<void> {
    const result = await this.messagesRepo.delete(messageId);
    if (result.affected === 0) {
      throw new NotFoundException('Message not found');
    }
  }

  /**
   * Update a message text
   */
  async update(
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.messagesRepo.findOne({
      where: { id: messageId },
    });
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
