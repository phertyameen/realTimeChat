import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/userDto';
import { authTypes } from './enums/authTypes.enum';
import { RefreshTokenDto } from './dtos/refreshTokenDto';
import { Auth } from './decorators/auth.decorator';

/**auth controller class */
@Controller('auth')
export class AuthController {
    constructor(
        /**injecting auth service*/
        private readonly authservice: AuthService,
    ) {}
    @Post('/signIn')
    @Auth(authTypes.None)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)

    /**signin class */
    public async SignIn(@Body() signInDto: SignInDto) {
       return await this.authservice.SignIn(signInDto)
    }
    @Post('/refreshToken')
    /**refreshtoken class */
    public RefreshToken(@Body() refreshToken: RefreshTokenDto) {
        return this.authservice.refreshToken(refreshToken)
    }
}