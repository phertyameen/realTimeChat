import { Module } from '@nestjs/common';
import { UserService } from './provider/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entitly';
import { CreateUserProvider } from './provider/create-user.provider';
import { FindOneByEmail } from './provider/find-one-by-email';
import { MailModule } from 'src/mail/mail.module';
import { FindOneByGoogleIdProvider } from './provider/find-one-by-googleId';
import { CreateGoogleUserProvider } from './provider/googleUserProvider';
    

@Module({
  imports: [TypeOrmModule.forFeature([User]),MailModule],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserProvider,
    FindOneByEmail,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider
  ],
  exports: [UserService],
})
export class UserModule {}
