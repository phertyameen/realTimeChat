import { Module } from '@nestjs/common';
import { GoogleAuthenticationController } from './google-authentication.controller';
import { GoogleAuthenticationService } from './providers/google-authentication.service';

@Module({
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService]
})
export class GoogleAuthticationModule {}