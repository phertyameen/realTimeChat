import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entitly';

/**
  Service responsible for finding a user by Google ID.
 */
@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    /*
     *inject userRepository
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

   /** Method to find a user by their Google ID. */
  public async findOneByGoogleId(googleId: string) {
    return await this.userRepository.findOneBy({ googleId })
  }
}