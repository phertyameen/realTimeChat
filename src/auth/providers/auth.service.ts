import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/userDto';
import { RefreshTokenDto } from '../dtos/refreshTokenDto';
import { UserService } from 'src/users/provider/user.service';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';

/**Auth service class */
@Injectable()
export class AuthService {
    constructor(
        /* 
          injecting user service
         */
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        /*inject signInProvider*/
        private readonly signInProvider: SignInProvider,

        /* 
         inject refreshTokenProvider
         */
         private readonly refreshTokensProvider: RefreshTokensProvider
    ) {}

        /**signin method taking signinDto */
    public async SignIn(signInDto: SignInDto) {
        return await this.signInProvider.SignIn(signInDto)
    }

        /**method for the refresh token */
    public refreshToken(refreshTokenDto: RefreshTokenDto) {
        return this.refreshTokensProvider.refreshTokens(refreshTokenDto)
    }    

}