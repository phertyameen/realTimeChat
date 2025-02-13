import { Module } from '@nestjs/common';
import { UserService } from './provider/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entitly';
import { CreateUserProvider } from './provider/create-user.provider';
import { FindOneByEmail } from './provider/find-one-by-email';

@Module({
    
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,CreateUserProvider,FindOneByEmail],
  exports: [ UserService],
})
export class UserModule {}
