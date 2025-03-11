import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entitly';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';
import { MailProvider } from 'src/mail/providers/mail.provider';

/**
 * Service provider for creating users
 */
@ApiTags('Users')
@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Inject userRepository
     */
    @InjectRepository(User) private userRepository: Repository<User>,

    /**
     * Inject hashingProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * Inject mailService
     */
    private readonly mailProvider: MailProvider,
  ) {}

  /**
   * Creates a new user in the system.
   * @param createUserDto - The DTO containing user creation data.
   * @returns A Promise resolving to the created User entity.
   * @throws BadRequestException if the user already exists.
   * @throws RequestTimeoutException if a database connection issue occurs.
   */
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
          cause: 'the user is having network issues',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await this.hashingProvider.hashPassword(
      createUserDto.password,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error connecting to your database',
          cause: 'the user is having network issues',
        },
      );
    }

    try {
      await this.mailProvider.WelcomeEmail(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return newUser;
  }
}
