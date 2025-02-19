import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { Auth } from '../decorators/auth.decorator';
import { authTypes } from '../enums/authTypes.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';

/**
 * Google authentication controller
 */
@ApiTags('Google Authentication')
@Auth(authTypes.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    /**
     * Constructor for GoogleAuthenticationController
     * @param googleAuthenticationService - Injects GoogleAuthenticationService
     */
    constructor(
        private readonly googleAuthenticationService: GoogleAuthenticationService
    ) {}

    /**
     * Authenticates a user using Google authentication.
     * @param googleTokenDto - The Google authentication token.
     * @returns Authentication response.
     */
    @ApiOperation({ summary: 'Authenticate user with Google token' })
    @ApiResponse({ status: 200, description: 'Successfully authenticated user' })
    @ApiResponse({ status: 400, description: 'Invalid Google token' })
    @Post()
    public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
        return this.googleAuthenticationService.authenticate(googleTokenDto);
    }
}
