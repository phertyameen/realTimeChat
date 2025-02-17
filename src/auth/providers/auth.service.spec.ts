import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/provider/user.service';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { SignInProvider } from './sign-in.provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entitly';
import { HashingProvider } from './hashing';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { SignInDto } from '../dtos/userDto';
import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let hashingProvider: HashingProvider;
  let refreshTokensProvider: RefreshTokensProvider;
  let generateTokensProvider: GenerateTokensProvider;

  let signInProvider: SignInProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        SignInProvider,
        {
          provide: UserService,
          useValue: {
            GetOneByEmail: jest.fn(),
          },
        },
        {
          provide: RefreshTokensProvider,
          useValue: {
            refreshTokens: jest.fn(),
          },
        },
        {
          provide: SignInProvider,
          useValue: {
            SignIn: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: HashingProvider,
          useValue: {
            comparePasswords: jest.fn(),
          },
        },
        {
          provide: GenerateTokensProvider,
          useValue: {
            generateTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    refreshTokensProvider = module.get<RefreshTokensProvider>(
      RefreshTokensProvider,
    );
    signInProvider = module.get<SignInProvider>(SignInProvider);
    hashingProvider = module.get<HashingProvider>(HashingProvider);
    generateTokensProvider = module.get<GenerateTokensProvider>(
      GenerateTokensProvider,
    );
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('SignIn', () => {
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'hashed@Password',
    };
    const signInDto: SignInDto = {
      email: 'test@example.com',
      password: 'password123',
    };
  });
});
