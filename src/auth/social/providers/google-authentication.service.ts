import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/authConfig/jwt.config';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { UserService } from 'src/users/provider/user.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';

/**
 * @class GoogleAuthenticationService
 * @description Handles Google authentication using OAuth2.
 */
@Injectable()
/**Google authentication service */
export class GoogleAuthenticationService implements OnModuleInit {
  private oAuthClient: OAuth2Client;
  constructor(
    /**
     * Injects the UserService for user-related operations.
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * Injects the JWT configuration.
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurattion: ConfigType<typeof jwtConfig>,
    
    /**
     * Injects the GenerateTokensProvider to handle token generation.
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  /**
   * Initializes the OAuth2 client with Google credentials.
   */
  onModuleInit() {
    const client_id = this.jwtConfigurattion.googleClient_id;
    const client_secret = this.jwtConfigurattion.googleClient_secret;

    this.oAuthClient = new OAuth2Client(client_id, client_secret);
  }

  /**
   * Authenticates a user with a Google token.
   * 
   * @param {GoogleTokenDto} googleTokenDto - The DTO containing the Google token.
   * @returns {Promise<any>} Returns generated tokens if authentication is successful.
   * @throws {UnauthorizedException} If authentication fails.
   */

  /**authenticate class with google tokendto as params */
  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      console.log("Received Token:", googleTokenDto.token);

      // Verify the Google token sent by user
      const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      console.log("Google Token Payload:", loginTicket.getPayload());

      // Extract the payload from Google JWT token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      // Find the user in the database using googleId
      const user = await this.userService.findOneByGoogleId(googleId);

      // If user exists, generate token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      
      // Else, create a new user and generate the token
      const newUser = await this.userService.createGoogleUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
      });
      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // If any step fails, throw an UnauthorizedException
      console.error("Google Auth Error:", error);
      throw new UnauthorizedException('Failed to authenticate with Google');
    }
  }
}
