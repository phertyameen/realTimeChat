import {   BadRequestException,   forwardRef,   Inject,   Injectable,   RequestTimeoutException, } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entitly';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Service responsible for handling user creation
 */
@ApiTags('Users')
@Injectable()
export class CreateUserProvider {
  /**
   * Constructor to inject dependencies.
   * @param userRepository - Repository for User entity
   * @param hashingProvider - Service for password hashing
   */
  constructor(
    /** Inject userRepository */
    @InjectRepository(User) private userRepository: Repository<User>,

    /** Inject hashingProvider */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**
   * Creates a new user in the system
   * @param createUserDto - DTO containing user data.
   * @returns The newly created user.
   * @throws BadRequestException If the user already exists.
   * @throws RequestTimeoutException If there is an issue connecting to the database.
   */
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'User already exists.' })
  @ApiResponse({ status: 408, description: 'Database connection issue.' })
  public async createUsers(createUserDto: CreateUserDto): Promise<User> {
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error connecting to your database',
          cause: 'The user is having network issues',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error connecting to your database',
          cause: 'The user is having network issues',
        },
      );
    }

    return newUser;
  }
}