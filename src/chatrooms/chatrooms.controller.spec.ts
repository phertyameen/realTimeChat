/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ChatRoomType } from 'src/chatrooms/enums/chatroomType';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service';
import { ChatRoom } from './chatroom.entity';
import { User } from 'src/users/user.entitly';

describe('ChatRoomService', () => {
  let service: ChatRoomService;
  let chatRoomRepository: jest.Mocked<Repository<ChatRoom>>;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockChatRoomRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    const mockUserRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatRoomService,
        {
          provide: getRepositoryToken(ChatRoom),
          useValue: mockChatRoomRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ChatRoomService>(ChatRoomService);
    chatRoomRepository = module.get<Repository<ChatRoom>>(getRepositoryToken(ChatRoom)) as jest.Mocked<Repository<ChatRoom>>;
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)) as jest.Mocked<Repository<User>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a chat room', async () => {
      const createChatRoomDto = { userIds: ['1', '2'], type: ChatRoomType.PRIVATE,   name: "Test Chat Room"
 };
      const users = [];
      const chatRoom = { id: '1', ...createChatRoomDto, users };

      userRepository.find.mockResolvedValue(users);
      chatRoomRepository.create.mockReturnValue(chatRoom as any);
      chatRoomRepository.save.mockResolvedValue(chatRoom as any);

      await expect(service.create(createChatRoomDto)).resolves.toEqual(chatRoom);
    });

    it('should throw BadRequestException if users are missing', async () => {
      userRepository.find.mockResolvedValue([]);
      const createChatRoomDto = { userIds: ['1', '2'], type: ChatRoomType.PRIVATE,   name: "Test Chat Room" 
      };

      await expect(service.create(createChatRoomDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a chat room if found', async () => {
      const chatRoom = { id: '1', users: [] };
      chatRoomRepository.findOneBy.mockResolvedValue(chatRoom as any);
      await expect(service.findOne('1')).resolves.toEqual(chatRoom);
    });

    it('should throw NotFoundException if chat room is not found', async () => {
      chatRoomRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a chat room successfully', async () => {
      chatRoomRepository.delete.mockResolvedValue({ affected: 1 } as any);
      await expect(service.remove('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if no chat room is found to delete', async () => {
      chatRoomRepository.delete.mockResolvedValue({ affected: 0 } as any);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
