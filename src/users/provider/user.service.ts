import { Injectable } from '@nestjs/common';
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


/**
   Service class for managing user-related operations.
 */
@Injectable()
export class UserService {
  constructor(
    /*
     *inject User entity*/
     /**
    Injects dependencies for user management.
    @param {Repository<User>} userRepository - Repository to interact with the User entity.
    @param {CreateUserProvider} createUserProvider - Provider to handle user creation.
    @param {FindOneByEmail} findOneByemail - Service to find a user by email.
    @param {FindOneByGoogleIdProvider} findOneByGoogleIdProvider - Service to find a user by Google ID.
    @param {CreateGoogleUserProvider} createGoogleUserProvider - Service to create a user via Google authentication.
   */
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneByemail: FindOneByEmail,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  /**
    Retrieves all users.
    @param {GetuserParamDto} getUserParamDto - Parameters for filtering users.
    @param {number} limit - Number of users to return.
    @param {number} page - Page number for pagination.
    @returns {Promise<User[]>} List of users.
   */

  /**Method to Retrieves all users. */
  public findAll(
    getUserParamDto: GetuserParamDto,
    limit: number,
    page: number,
  ): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
     Creates a new user.
    @param {CreateUserDto} createUserDto - User data for creation.
    @returns {Promise<User>} The created user.
   */

  /**Method to Creates a new user */
  public async createUsers(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUsers(createUserDto);
  }

  /**
   
    @param {number} id - User ID.
    @returns {Promise<User | null>} The found user or null.
   */

  /**A method to Finds a user by ID. */
  public FindOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**
    
    @param {string} email - User email.
    @returns {Promise<User>} The user matching the email.
   */

  /**A method to Retrieves a user by email. */
  public async GetOneByEmail(email: string) {
    return await this.findOneByemail.findOneByEmail(email);
  }

  /**
     
    @param {number} id - User ID.
    @returns {Promise<{deleted: boolean, id: number}>} Deletion confirmation.
   */

  /**A method to Deletes a user by ID. */
  public async deleteUser(id: number) {
    await this.userRepository.delete(id);

    return { deleted: true, id };
  }

  /**
    
    @param {EditUserDto} edituserDto - Data for updating user information.
    @returns {Promise<User>} The updated user.
   */

  /**A method to Updates user details. */
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
   
    @param {string} googleId - Google ID of the user.
    @returns {Promise<User>} The user associated with the given Google ID.
   */

  /**A method to Finds a user by Google ID. */
  public async findOneByGoogleId(googleId: string) {
    return this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  /**
    @param {GoogleInterface} googleUser - Google user data.
    @returns {Promise<User>} The created user.
   */
  
  /** Creates a new user via Google authentication. */
  public async createGoogleUser(googleUser: GoogleInterface) {
    return this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
