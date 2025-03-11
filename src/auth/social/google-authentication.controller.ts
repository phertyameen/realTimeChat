import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { Auth } from '../decorators/auth.decorator';
import { authTypes } from '../enums/authTypes.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';

/**Google authentication controller class */
@Auth(authTypes.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
        /* 
         * inject googleAuthenticationService 
         */
        private readonly googleAuthenticationService: GoogleAuthenticationService
    ) {}

    /**Authenticate class with body parameter of type googletokendto */
    @Post()
    public authenticate(@Body() googlTokenDto: GoogleTokenDto) {
        return this.googleAuthenticationService.authenticate(googlTokenDto)
    }
}
