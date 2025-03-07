import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entitly';
import { Repository } from 'typeorm';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { FindOneByEmail } from './find-one-by-email';
import { EditUserDto } from '../DTOs/patch-user.dto';
import { GetuserParamDto } from '../DTOs/getUserparamdto';
import { FindOneByGoogleIdProvider } from './find-one-by-googleId';
import { CreateGoogleUserProvider } from './googleUserProvider';
import { GoogleInterface } from 'src/auth/social/interfaces/user.interface';
import { PaginationProvider } from 'src/common/pagination/Provider/pagination.provider';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginated } from 'src/common/pagination/Interfaces/paginatedInterface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Service for handling user-related operations.
 */
@ApiTags('Users')
@Injectable()
export class UserService {
  constructor(
    /**
     * Inject User repository.
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneByemail: FindOneByEmail,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Fetch paginated users.
   */
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({ status: 200, description: 'List of users returned successfully' })
  public async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    return this.paginationProvider.paginatedQuery(
      paginationQueryDto,
      this.userRepository,
    );
  }

  /**
   * Fetch a single user by ID.
   */
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Create a new user.
   */
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  public async createUsers(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUsers(createUserDto);
  }

  /**
   * Find one user by ID.
   */
  @ApiOperation({ summary: 'Find a user by ID' })
  public FindOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Get user by email.
   */
  @ApiOperation({ summary: 'Get a user by email' })
  public async GetOneByEmail(email: string) {
    return await this.findOneByemail.findOneByEmail(email);
  }

  /**
   * Delete a user by ID.
   */
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { deleted: true, id };
  }

  /**
   * Edit user details.
   */
  @ApiOperation({ summary: 'Edit user details' })
  public async editUser(edituserDto: EditUserDto) {
    let edit = await this.userRepository.findOneBy({
      id: edituserDto.id,
    });

    edit.firstName = edituserDto.firstName ?? edit.firstName;
    edit.lastName = edituserDto.lastName ?? edit.lastName;
    edit.password = edituserDto.password ?? edit.password;
    edit.email = edituserDto.email ?? edit.email;

    return this.userRepository.save(edit);
  }

  /**
   * Find a user by Google ID.
   */
  @ApiOperation({ summary: 'Find a user by Google ID' })
  public async findOneByGoogleId(googleId: string) {
    return this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  /**
   * Create a new Google user.
   */
  @ApiOperation({ summary: 'Create a new Google user' })
  public async createGoogleUser(googleUser: GoogleInterface) {
    return this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
