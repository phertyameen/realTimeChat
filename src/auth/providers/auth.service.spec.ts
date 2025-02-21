import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/provider/user.service';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { SignInDto } from '../dtos/userDto';
import { RefreshTokenDto } from '../dtos/refreshTokenDto';
import { HashingProvider } from './hashing';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entitly';

describe('AuthService', () => {
  let authService: AuthService;
  let signInProvider: SignInProvider;
  let refreshTokensProvider: RefreshTokensProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            GetOneByEmail: jest.fn(),
          },
        },
        {
          provide: SignInProvider,
          useValue: {
            SignIn: jest.fn(),
          },
        },
        {
          provide: RefreshTokensProvider,
          useValue: {
            refreshTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    signInProvider = module.get<SignInProvider>(SignInProvider);
    refreshTokensProvider = module.get<RefreshTokensProvider>(
      RefreshTokensProvider,
    );
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('SignIn', () => {
    it('should call signInProvider.SignIn and return expected response', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedResponse = {
        accessToken: 'jwt-token',
        refreshToken: 'refresh-token',
        user: {
          id: 1,
          email: 'test@example.com',
          firstName: 'fatee',
          lastName: 'ammen',
          password: 'passWord3',
          chatRooms: [],
        },
      };

      jest.spyOn(signInProvider, 'SignIn').mockResolvedValue(expectedResponse);

      const result = await authService.SignIn(signInDto);
      expect(signInProvider.SignIn).toHaveBeenCalledWith(signInDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('refreshToken', () => {
    it('should call refreshTokensProvider.refreshTokens and return expected response', () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'valid-refresh-token',
      };
      const expectedResponse = {
        accessToken: 'new-jwt-token',
        refreshToken: 'new-refresh-token',
        user: {
          id: 1,
          email: 'test@example.com',
          firstName: 'fatee',
          lastName: 'ammen',
          password: 'passWord3',
          chatRooms: [],
        },
      };

      jest
        .spyOn(refreshTokensProvider, 'refreshTokens')
        .mockResolvedValue(expectedResponse);

      const result = authService.refreshToken(refreshTokenDto);
      expect(refreshTokensProvider.refreshTokens).toHaveBeenCalledWith(
        refreshTokenDto,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('SignInProvider', () => {
    let signInProvider: SignInProvider;
    let userService: UserService;
    let hashingProvider: HashingProvider;
    let generateTokenProvider: GenerateTokensProvider;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SignInProvider,
          {
            provide: UserService,
            useValue: {
              GetOneByEmail: jest.fn(),
            },
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

      signInProvider = module.get<SignInProvider>(SignInProvider);
      userService = module.get<UserService>(UserService);
      hashingProvider = module.get<HashingProvider>(HashingProvider);
      generateTokenProvider = module.get<GenerateTokensProvider>(
        GenerateTokensProvider,
      );
    });

    it('should be defined', () => {
      expect(signInProvider).toBeDefined();
    });

    describe('SignIn', () => {
      it('should throw UnauthorizedException if user does not exist', async () => {
        jest.spyOn(userService, 'GetOneByEmail').mockResolvedValue(null);
        const signInDto: SignInDto = {
          email: 'test@example.com',
          password: 'password',
        };
        await expect(signInProvider.SignIn(signInDto)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it('should throw UnauthorizedException if password is incorrect', async () => {
        const user = {
          id: 1,
          email: 'test@example.com',
          password: 'hashed-password',
          firstName: 'fatee',
          lastName: 'ammen',
          chatRooms: [],
        };
        jest.spyOn(userService, 'GetOneByEmail').mockResolvedValue(user);
        jest
          .spyOn(hashingProvider, 'comparePasswords')
          .mockResolvedValue(false);

        const signInDto: SignInDto = {
          email: 'test@example.com',
          password: 'wrong-password',
        };
        await expect(signInProvider.SignIn(signInDto)).rejects.toThrow(
          UnauthorizedException,
        );
      });

      it('should throw RequestTimeoutException if hashing fails', async () => {
        const user = {
          id: 1,
          email: 'test@example.com',
          password: 'hashed-password',
          firstName: 'fatee',
          lastName: 'ammen',
          chatRooms: [],
        };
        jest.spyOn(userService, 'GetOneByEmail').mockResolvedValue(user);
        jest
          .spyOn(hashingProvider, 'comparePasswords')
          .mockRejectedValue(new Error('Database error'));

        const signInDto: SignInDto = {
          email: 'test@example.com',
          password: 'password',
        };
        await expect(signInProvider.SignIn(signInDto)).rejects.toThrow(
          RequestTimeoutException,
        );
      });

      it('should return tokens if credentials are valid', async () => {
        const user = {
          id: 1,
          email: 'test@example.com',
          password: 'hashed-password',
          firstName: 'fatee',
          lastName: 'ammen',
          chatRooms: [],
        };
        const tokens = {
          accessToken: 'jwt-token',
          refreshToken: 'refresh-token',
          user: {
            id: 6,
            email: 'test@test.com',
            password: 'Password@test',
            firstName: 'fatee',
            lastName: 'ammen',
            chatRooms: [],
          },
        };
        jest.spyOn(userService, 'GetOneByEmail').mockResolvedValue(user);
        jest.spyOn(hashingProvider, 'comparePasswords').mockResolvedValue(true);
        jest
          .spyOn(generateTokenProvider, 'generateTokens')
          .mockResolvedValue(tokens);

        const signInDto: SignInDto = {
          email: 'test@example.com',
          password: 'password',
        };
        const result = await signInProvider.SignIn(signInDto);
        expect(result).toEqual(tokens);
      });
    });
  });
});
