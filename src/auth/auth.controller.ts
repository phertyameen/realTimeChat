import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/userDto';
import { authTypes } from './enums/authTypes.enum';
import { RefreshTokenDto } from './dtos/refreshTokenDto';
import { Auth } from './decorators/auth.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

/**
 * Auth controller class
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        /** Injecting auth service*/ 
        private readonly authservice: AuthService,
    ) {}

    /**
     * Sign in method
     * @param signInDto - User credentials
     * @returns Access token and user details
     */
    @Post('/signIn')
    @Auth(authTypes.None)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: 'User sign-in' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User signed in successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
    @ApiBody({ type: SignInDto })
    public async SignIn(@Body() signInDto: SignInDto) {
       return await this.authservice.SignIn(signInDto);
    }

    /**
     * Refresh token method
     * @param refreshToken - Refresh token object
     * @returns New access token
     */
    @Post('/refreshToken')
    @ApiOperation({ summary: 'Refresh authentication token' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Token refreshed successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid refresh token' })
    @ApiBody({ type: RefreshTokenDto })
    public RefreshToken(@Body() refreshToken: RefreshTokenDto) {
        return this.authservice.refreshToken(refreshToken);
    }
}
