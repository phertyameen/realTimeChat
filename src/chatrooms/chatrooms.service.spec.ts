/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoom } from './chatRoom.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatRoomService } from './providers/chatrooms/chatrooms.service';
import { ChatRoomType } from './enums/chatroomType';

describe('ChatRoomService', () => {
  let service: ChatRoomService;
  let repository: Repository<ChatRoom>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatRoomService,
        {
          provide: getRepositoryToken(ChatRoom),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatRoomService>(ChatRoomService);
    repository = module.get<Repository<ChatRoom>>(getRepositoryToken(ChatRoom));
  });

  it('should find a chat room by ID', async () => {
    const mockChatRoom: ChatRoom = {
      id: '550e8400-e29b-41d4-a716-446655440000', // Use a UUID string
      name: 'Test Room',
      type: ChatRoomType.GROUP,
      users: [],
      createdAt: new Date(),
    };

    (repository.findOne as jest.Mock).mockResolvedValue(mockChatRoom);

    const result = await service.findOne('550e8400-e29b-41d4-a716-446655440000'); // Pass UUID string

    expect(result).toEqual(mockChatRoom);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '550e8400-e29b-41d4-a716-446655440000' } });
  });

  it('should return null if no chat room is found', async () => {
    (repository.findOne as jest.Mock).mockResolvedValue(null);

    const result = await service.findOne('invalid-uuid'); // Use a string for a non-existent ID

    expect(result).toBeNull();
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'invalid-uuid' } });
  });
});
