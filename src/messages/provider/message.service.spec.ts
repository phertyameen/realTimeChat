import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageCreateService } from '../provider/message-create.service';
import { MessageFetchService } from '../provider/message-fetch.service';
import { MessageUpdateService } from '../provider/message-update.service';
import { MessageDeleteService } from '../provider/message-delete.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { UpdateMessageDto } from '../dtos/update-message.dto';
import { MessageType } from '../enum/message-type ';
import { ActiveUserData } from 'src/auth/interface/activeInterface';

describe('MessageService', () => {
  let service: MessageService;
  let messageCreateService: MessageCreateService;
  let messageFetchService: MessageFetchService;
  let messageUpdateService: MessageUpdateService;
  let messageDeleteService: MessageDeleteService;

  const mockMessageCreateService = {
    create: jest.fn().mockImplementation((dto, user, file = undefined) => 
      Promise.resolve({ ...dto, id: '1', user })
    ),
  };

  const mockMessageFetchService = {
    findAll: jest.fn().mockImplementation(() => 
      Promise.resolve([{ id: '1', content: 'Hello' }])
    ),
  };

  const mockMessageUpdateService = {
    update: jest.fn().mockImplementation((id, dto) => 
      Promise.resolve({ ...dto, id })
    ),
  };

  const mockMessageDeleteService = {
    delete: jest.fn().mockResolvedValue(true), 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: MessageCreateService, useValue: mockMessageCreateService },
        { provide: MessageFetchService, useValue: mockMessageFetchService },
        { provide: MessageUpdateService, useValue: mockMessageUpdateService },
        { provide: MessageDeleteService, useValue: mockMessageDeleteService },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    messageCreateService = module.get<MessageCreateService>(MessageCreateService);
    messageFetchService = module.get<MessageFetchService>(MessageFetchService);
    messageUpdateService = module.get<MessageUpdateService>(MessageUpdateService);
    messageDeleteService = module.get<MessageDeleteService>(MessageDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a message', async () => {
      const createMessageDto: CreateMessageDto = { content: 'Test Message', chatRoomId: 1, messageType: MessageType.FILE};
      const user: ActiveUserData = { sub: 1 }; // Mock user
      const result = await service.create(createMessageDto, user,  undefined);
      expect(result).toEqual({ ...createMessageDto, id: 1, user });
      expect(messageCreateService.create).toHaveBeenCalledWith(createMessageDto, user, undefined);
    });
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const messages = await service.findAll(1); // Chat room ID
      expect(messages).toEqual([{ id: '1', content: 'Hello' }]);
      expect(messageFetchService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a message', async () => {
      const UpdateMessageDto: UpdateMessageDto = { id: 1, content: 'Updated Message' };
      const result = await service.update('1', UpdateMessageDto);
      expect(result).toEqual({ ...UpdateMessageDto, id: '1' });
      expect(messageUpdateService.update).toHaveBeenCalledWith('1', UpdateMessageDto);
    });
  });

  describe('delete', () => {
    it('should delete a message', async () => {
      await expect(service.delete('1')).resolves.toBeUndefined();
      expect(messageDeleteService.delete).toHaveBeenCalledWith('1');
    });
  });
});
