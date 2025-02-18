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

@Injectable()
export class CreateUserProvider {
  constructor(
    /*
     * Inject userRepository
     */
    @InjectRepository(User) private userRepository: Repository<User>,

    /*
     * Inject hashingProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async createUsers(createUserDto: CreateUserDto): Promise<User> {
    // check if user already exits
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // you might save/log your  error
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error connecting to your database',
          cause: 'the user is having network issues',
        },
      );
    }
    // Handle Error
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

    // Create the user
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

    return newUser;
  }
}