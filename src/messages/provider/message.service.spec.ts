import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { MessageService } from './message.service';
import { Message } from '../message.entity';
import { MessageCreateService } from './message-create.service';
import { MessageFetchService } from './message-fetch.service';
import { MessageUpdateService } from './message-update.service';
import { CloudinaryService } from 'src/cloudinary-provider/cloudinary.service';
import { MessageDeleteService } from './message-delete.service';
import { ChatRoom } from 'src/chatrooms/chatroom.entity';
import { User } from 'src/users/user.entitly';

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: Repository<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ChatRoom), 
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User), 
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: MessageCreateService,
          useValue: { createMessage: jest.fn() },
        },
        {
          provide: MessageFetchService,
          useValue: { getMessages: jest.fn() },
        },
        {
          provide: MessageUpdateService,
          useValue: { updateMessage: jest.fn() },
        },
        {
          provide: CloudinaryService,
          useValue: { uploadImage: jest.fn() },
        },
        {
          provide: MessageDeleteService,
          useValue: { deleteMessage: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    messageRepository = module.get<Repository<Message>>(getRepositoryToken(Message));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
