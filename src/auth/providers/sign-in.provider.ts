import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from '../dtos/userDto';
import { HashingProvider } from './hashing';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UserService } from 'src/users/provider/user.service';

/**
 * Signin provider class
 */
@ApiTags('Authentication')
@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Injecting UserService repository
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * Injecting hashing dependency
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * Injecting GenerateTokensProvider
     */
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  /**
   * Sign in method
   * @param signInDto - User credentials
   * @returns Access and refresh tokens
   */
  @ApiOperation({ summary: 'User sign-in' })
  @ApiResponse({ status: 200, description: 'Successfully signed in' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @ApiResponse({ status: 408, description: 'Database connection timeout' })
  public async SignIn(signInDto: SignInDto) {
    // Check if user exists in database
    const user = await this.userService.GetOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    // Compare password
    let isCheckedPassword: boolean = false;

    try {
      isCheckedPassword = await this.hashingProvider.comparePasswords(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'error connecting to the database',
      });
    }

    if (!isCheckedPassword) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    
    // Generate tokens
    return await this.generateTokenProvider.generateTokens(user);
  }
}
