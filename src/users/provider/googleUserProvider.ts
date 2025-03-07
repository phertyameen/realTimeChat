import { ConflictException, Injectable } from '@nestjs/common';
import { GoogleInterface } from '../../auth/social/interfaces/user.interface';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entitly';
import { InjectRepository } from '@nestjs/typeorm';

/**create google user provider class */
@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /*
     * inject userRepository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  /**Create googleuser class of type googleuser */
  public async createGoogleUser(googleUser: GoogleInterface) {
    try {
      const user = this.userRepository.create(googleUser);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'could not create a new user',
      });
    }
  }
}
