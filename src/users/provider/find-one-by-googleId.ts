import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entitly';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    /*
     *inject userRepository
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  public async findOneByGoogleId(googleId: string) {
    return await this.userRepository.findOneBy({ googleId })
  }
}