import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatRoom } from '../../../chatrooms/chatroom.entity';
import { User } from '../../../users/user.entitly';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ChatRoomType } from 'src/chatrooms/enums/chatroomType';
import { ChatRoomService } from './chatrooms.service';

const mockChatRoomRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

const mockUserRepository = {
  findByIds: jest.fn(),
  findOne: jest.fn(),
};

describe('ChatRoomService', () => {
  let service: ChatRoomService;
  let chatRoomRepository: Repository<ChatRoom>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatRoomService,
        { provide: getRepositoryToken(ChatRoom), useValue: mockChatRoomRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<ChatRoomService>(ChatRoomService);
    chatRoomRepository = module.get<Repository<ChatRoom>>(getRepositoryToken(ChatRoom));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a chat room successfully', async () => {
      const createChatRoomDto = { name: 'Test Room', type: ChatRoomType.GROUP, userIds: ['1', '2'] };
      const users = [{ id: '1' }, { id: '2' }];
      mockUserRepository.findByIds.mockResolvedValue(users);
      mockChatRoomRepository.create.mockReturnValue(createChatRoomDto);
      mockChatRoomRepository.save.mockResolvedValue(createChatRoomDto);

      const result = await service.create(createChatRoomDto);
      expect(result).toEqual(createChatRoomDto);
      expect(mockChatRoomRepository.create).toHaveBeenCalledWith({ ...createChatRoomDto, users });
      expect(mockChatRoomRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if a user is not found', async () => {
      mockUserRepository.findByIds.mockResolvedValue([{ id: '1' }]);
      const createChatRoomDto = { name: 'Test Room', type: ChatRoomType.GROUP, userIds: ['1', '2'] };

      await expect(service.create(createChatRoomDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a chat room', async () => {
      const chatRoom = { id: '1', name: 'Test Room', users: [] };
      mockChatRoomRepository.findOne.mockResolvedValue(chatRoom);
      const result = await service.findOne('1');
      expect(result).toEqual(chatRoom);
    });

    it('should throw an error if chat room is not found', async () => {
      mockChatRoomRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a chat room', async () => {
      mockChatRoomRepository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.remove('1')).resolves.not.toThrow();
    });

    it('should throw an error if chat room is not found', async () => {
      mockChatRoomRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
