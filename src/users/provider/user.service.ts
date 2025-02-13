import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user.entitly";
import { Repository } from "typeorm";
import { CreateUserProvider } from "./create-user.provider";
import { CreateUserDto } from "../DTOs/create-user.dto";
import { FindOneByEmail } from "./find-one-by-email";
import { EditUserDto } from "../DTOs/patch-user.dto";
import { GetuserParamDto } from "../DTOs/getUserparamdto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,

        private readonly createUserProvider:CreateUserProvider,

        private readonly findOneByemail:FindOneByEmail,
  
      ) {}


      public findAll(
        getUserParamDto: GetuserParamDto,
        limit: number,
        page: number,
      ): Promise<User[]> {
        return this.userRepository.find();
      }


      public async createUsers(createUserDto: CreateUserDto) {
        return this.createUserProvider.createUsers(createUserDto);
      }

      public async GetOneByEmail(email:string) {
        return await this.findOneByemail.findOneByEmail(email)
      }

      
    public async deleteUser (id: number) {
         await this.userRepository.delete(id)
        
        return {deleted: true, id }
    }

    public async editUser (edituserDto:EditUserDto) {

        let edit = await this.userRepository.findOneBy({
          id:edituserDto.id
        })
  
        edit.firstName = edituserDto.firstName ?? edit.firstName
        edit.lastName = edituserDto.lastName ?? edit.lastName
        edit.password = edituserDto.password ?? edit.password
        edit.email = edituserDto.email ?? edit.email
  
        return this.userRepository.save(edit)
  
      }

      


}