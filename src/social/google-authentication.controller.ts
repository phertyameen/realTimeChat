import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { googleTokenDto } from './dtos/google-token.dto';

@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
        /* 
         * inject googleAuthenticationService 
         */
        private readonly googleAuthenticationService: GoogleAuthenticationService
    ) {}

    @Post()
    public authenticate(@Body() googlTokenDto: googleTokenDto) {
        return this.googleAuthenticationService.authenticate(googlTokenDto)
    }
}
