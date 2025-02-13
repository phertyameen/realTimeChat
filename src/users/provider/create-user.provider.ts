import {
    BadRequestException,
   
    Injectable,
    RequestTimeoutException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
import { User } from '../user.entitly';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../DTOs/create-user.dto';
  
  
  
  @Injectable()
  export class CreateUserProvider {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      
    ) {}
    public async createUsers(createUserDto: CreateUserDto) {
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
      // Create the user
      let newUser = this.userRepository.create({
        ...createUserDto
       
      });
      try {
        newUser = await this.userRepository.save(newUser);
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment, Please try later',
          {
            description: 'Error connecting to your database',
            cause: 'the user is having network issues',
          },
        );
      }

      return [newUser];
    }
  }
  