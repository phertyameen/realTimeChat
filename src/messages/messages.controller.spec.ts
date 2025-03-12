import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './messages.controller';
import { MessageService } from './provider/message.service';

describe('MessagesController', () => {
  let controller: MessageController;
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            create: jest.fn(),  // Mock the service
          },
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
