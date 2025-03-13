import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './messages.controller';

describe('MessagesController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
