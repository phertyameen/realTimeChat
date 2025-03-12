import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageFetchService } from '../provider/message-fetch.service';
import { MessageUpdateService } from '../provider/message-update.service';
import { MessageDeleteService } from '../provider/message-delete.service';
import { MessageCreateService } from '../provider/message-create.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { UpdateMessageDto } from '../dtos/update-message.dto';
import { ActiveUserData } from 'src/auth/interface/activeInterface';
import { Message } from '../message.entity';
import { CloudinaryService } from 'src/cloudinary-provider/cloudinary.service';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';

/** Message service class */
@Injectable()
export class MessageService {
  constructor(
    private readonly messageCreateService: MessageCreateService,
    private readonly messageFetchService: MessageFetchService,
    private readonly messageUpdateService: MessageUpdateService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly messageDeleteService: MessageDeleteService,

    @InjectRepository(Message)
    private readonly messagesRepo: Repository<Message>, 

    @InjectRepository(ChatRoom)
    private readonly chatRoomsRepo: Repository<ChatRoom>, 

    @InjectRepository(User)
    private readonly usersRepo: Repository<User>, 
  ) {}

  /** Create method */
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
      fileUrl: fileUrl || undefined,
    });
    console.log('Message Before Save:', message);

    //  Save message correctly
    const savedMessage = await this.messagesRepo.save(message);
    console.log('Saved Message:', savedMessage);
    return savedMessage; // Ensure returning a single object
  }

  async findAll(chatRoomId: number): Promise<Message[]> {
    return await this.messageFetchService.findAll(chatRoomId);
  }

  async update(messageId: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    return await this.messageUpdateService.update(messageId, updateMessageDto);
  }

  async delete(messageId: string): Promise<void> {
    await this.messageDeleteService.delete(messageId);
  }
}
