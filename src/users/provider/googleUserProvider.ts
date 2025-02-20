import { ConflictException, Injectable } from '@nestjs/common';
import { GoogleInterface } from '../../auth/social/interfaces/user.interface';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entitly';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Service responsible for creating users authenticated via Google.
 */
@ApiTags('Users')
@Injectable()

/**Create Google User Provider class */
export class CreateGoogleUserProvider {
  constructor(
    /**
     * Injects the user repository.
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user using Google authentication.
   * @param googleUser - The Google user data.
   * @returns The created user entity.
   * @throws ConflictException if user creation fails.
   */
  @ApiOperation({ summary: 'Create a Google-authenticated user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 409, description: 'Could not create a new user.' })

  /**Method to create GoogleUser */
  public async createGoogleUser(googleUser: GoogleInterface): Promise<User> {
    try {
      const user = this.userRepository.create(googleUser);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Could not create a new user',
      });
    }
  }
}
