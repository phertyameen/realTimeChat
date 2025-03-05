/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MailProvider } from './mail.provider';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/user.entitly';

describe('MailProvider', () => {
  let mailProvider: MailProvider;
  let mailerService: MailerService;

  // Mock the MailerService
  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailProvider,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    mailProvider = module.get<MailProvider>(MailProvider);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(mailProvider).toBeDefined();
  });

  it('should send a welcome email with correct parameters', async () => {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    } as User;

    await mailProvider.WelcomeEmail(mockUser);

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: mockUser.email,
      from: `helpdesk from realTimeChat.com`,
      subject: `welcome to realTimeChat`,
      template: './welcome',
      context: {
        name: mockUser.firstName,
        email: mockUser.email,
        loginUrl: 'http://localhost:3000/',
      },
    });
  });
});
