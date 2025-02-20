import { ConflictException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateGoogleUserProvider } from './googleUserProvider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmail } from './find-one-by-email';
import { FindOneByGoogleIdProvider } from './find-one-by-googleId';
import { User } from '../user.entitly';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { userRole } from '../Enums/userRole.enum';
import { GoogleInterface } from '../../auth/social/interfaces/user.interface';
import { Repository } from 'typeorm';

describe('userService', () => {
  let service: UserService;
  let createGoogleUserProvider: CreateGoogleUserProvider;
  let findOneByGoogleIdProvider: FindOneByGoogleIdProvider;
  let findOneByEmailProvider: FindOneByEmail;
  let userRepository: Repository<User>;

  const mockCreateUserProvider: Partial<CreateUserProvider> = {
    createUsers: (createUserDto: CreateUserDto) =>
      Promise.resolve({
        id: 12,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        chatRooms: createUserDto.chatRooms,
        userRole: createUserDto.userRole ?? userRole.USER
      }),
  };

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        CreateGoogleUserProvider,
        FindOneByGoogleIdProvider,
        FindOneByEmail,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    createGoogleUserProvider = module.get<CreateGoogleUserProvider>(CreateGoogleUserProvider);
    findOneByGoogleIdProvider = module.get<FindOneByGoogleIdProvider>(FindOneByGoogleIdProvider);
    findOneByEmailProvider = module.get<FindOneByEmail>(FindOneByEmail);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('root', () => {
    it('usersController should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUsers).toBeDefined();
    });

    it('should call createUserProvider', async () => {
      let user = await service.createUsers({
        firstName: 'fatee',
        lastName: 'ammen',
        email: 'fateeameen@gmail.com',
        password: 'passWord3',
        chatRooms: []
      });
      expect(user.firstName).toEqual('fatee');
    });
  });

  describe('createGoogleUser', () => {
    const googleUser: GoogleInterface = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      googleId: 'google123',
    };

    it('should create and save a new Google user', async () => {
      const mockUser = { ...googleUser, id: 1 };
      userRepository.create = jest.fn().mockReturnValue(mockUser);
      userRepository.save = jest.fn().mockResolvedValue(mockUser);

      const result = await createGoogleUserProvider.createGoogleUser(googleUser);
      expect(userRepository.create).toHaveBeenCalledWith(googleUser);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw a ConflictException on error', async () => {
      userRepository.create = jest.fn().mockReturnValue(googleUser);
      userRepository.save = jest.fn().mockRejectedValue(new Error('Save failed'));

      await expect(createGoogleUserProvider.createGoogleUser(googleUser)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOneByGoogleId', () => {
    it('should find a user by Google ID', async () => {
      const mockUser = { id: 1, googleId: 'google123', email: 'test@example.com' };
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await findOneByGoogleIdProvider.findOneByGoogleId('google123');
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ googleId: 'google123' });
      expect(result).toEqual(mockUser);
    });

    it('should return undefined if no user is found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(undefined);

      const result = await findOneByGoogleIdProvider.findOneByGoogleId('unknown-id');
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ googleId: 'unknown-id' });
      expect(result).toBeUndefined();
    });
  });

  describe('findOneByEmail', () => {
    it('should find a user by email', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await findOneByEmailProvider.findOneByEmail('test@example.com');
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(undefined);

      await expect(findOneByEmailProvider.findOneByEmail('test@example.com')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw RequestTimeoutException on database error', async () => {
      mockUserRepository.findOneBy.mockRejectedValue(new Error('DB error'));

      await expect(findOneByEmailProvider.findOneByEmail('test@example.com')).rejects.toThrow(RequestTimeoutException);
    });
  });
});