import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SignInDto } from '../dtos/userDto';
import { RefreshTokenDto } from '../dtos/refreshTokenDto';
import { UserService } from 'src/users/provider/user.service';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';

/**
 * Auth service
 */
@ApiTags('Auth')
@Injectable()
export class AuthService {
    constructor(
        /**
         * Injecting UserService to interact with user-related operations
         */
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        /**
         * Injecting SignInProvider for authentication logic
         */
        private readonly signInProvider: SignInProvider,

        /**
         * Injecting RefreshTokensProvider for token management
         */
        private readonly refreshTokensProvider: RefreshTokensProvider
    ) {}

    /**
     * Handles user sign-in process
     * @param signInDto - Data transfer object containing user credentials
     * @returns A promise resolving to authentication details
     */
    @ApiOperation({ summary: 'User Sign In' })
    @ApiBody({ type: SignInDto })
    public async SignIn(signInDto: SignInDto) {
        return await this.signInProvider.SignIn(signInDto);
    }

    /**
     * Handles refreshing of access tokens
     * @param refreshTokenDto - DTO containing the refresh token
     * @returns A new access token if the refresh token is valid
     */
    @ApiOperation({ summary: 'Refresh Access Token' })
    @ApiBody({ type: RefreshTokenDto })
    public refreshToken(refreshTokenDto: RefreshTokenDto) {
        return this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }
}