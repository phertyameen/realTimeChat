import { Controller, Get } from '@nestjs/common';
import { GoogleAuthenticationService } from 'src/auth/social/providers/google-authentication.service';

@Controller('auth/google')
export class GoogleAuthenticationController {
  constructor(private readonly googleAuthService: GoogleAuthenticationService) {}

  @Get('test')
  testOAuth() {
    return { message: 'OAuth Client Initialized Successfully' };
  }
}
