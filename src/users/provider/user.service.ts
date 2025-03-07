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

@Injectable()
export class UserService {
  constructor(
    /**
     *inject User entity
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneByemail: FindOneByEmail,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public findAll(
    limit: number,
    page: number,
  ): Promise<User[]> {
    return this.userRepository.find();
  }

  public async createUsers(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUsers(createUserDto);
  }

  public FindOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async GetOneByEmail(email: string) {
    return await this.findOneByemail.findOneByEmail(email);
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);

    return { deleted: true, id };
  }

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

  public async findOneByGoogleId(googleId: string) {
    return this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleInterface) {
    return this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
