import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/authConfig/jwt.config';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { UserService } from 'src/users/provider/user.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';

/**
 Google Authentication Service
  Handles authentication using Google OAuth tokens.
 */
@Injectable()
/** OAuth2 client for handling Google authentication */
export class GoogleAuthenticationService implements OnModuleInit {
  /**inject oAuthClient */
  private oAuthClient: OAuth2Client;
  /**
   Constructor to inject dependencies.
    @param userService - Service to handle user-related operations
    @param jwtConfigurattion - Configuration object for JWT
   @param generateTokensProvider - Service to generate authentication tokens
   */
  constructor(
    /**
     * inject userService
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

       /** Inject JWT configuration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurattion: ConfigType<typeof jwtConfig>,
    /**
      inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const client_id = this.jwtConfigurattion.googleClient_id;
    const client_secret = this.jwtConfigurattion.googleClient_secret;

    this.oAuthClient = new OAuth2Client(client_id, client_secret);
  }

  /**
    Authenticates a user using a Google token.
    @param googleTokenDto - DTO containing the Google ID token
    @returns The generated authentication tokens for the user
    @throws UnauthorizedException if authentication fails
   */

    /**Authenticate method */
  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      console.log("Received Token:", googleTokenDto.token);

      // verify the google token sent by user
      const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      console.log("Google Token Payload:", loginTicket.getPayload());

      // extract the payload from google jwt token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      // find the user in the database using googleId
      const user = await this.userService.findOneByGoogleId(googleId);

      // if user exist, generate token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      // else generate the user and create the token
      const newUser = await this.userService.createGoogleUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
      });
      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // if any of the step fails, send an unauthorised exception
      console.error("Google Auth Error:", error);
      throw new UnauthorizedException('failed to authenticate with google');
    }
  }
}