import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entitly';

/**
   Service responsible for finding a user by email.
 */
@Injectable()
export class FindOneByEmail {
     /**
       Injects the User repository for database operations.
      @param {Repository<User>} userRepository - Repository to interact with the User entity.
     */
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>) {}

        
    /**
     
      @param {string} email - The email of the user to find.
      @returns {Promise<User>} The found user.
      @throws {RequestTimeoutException} If there is an issue connecting to the database.
      @throws {UnauthorizedException} If the user does not exist.
     */
     /** Method to find a user by email. */
    public async findOneByEmail(email: string): Promise<User> {
        let user: User | undefined;

        try {
            user = await this.userRepository.findOneBy({ email });
        } catch (error) {
            throw new RequestTimeoutException('Could not fetch user', {
                description: 'Error connecting to database',
            });
        }

        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }

        return user; 
    }
}