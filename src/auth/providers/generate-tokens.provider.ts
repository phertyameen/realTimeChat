import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../authConfig/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interface/activeInterface';
import { UserService } from 'src/users/provider/user.service';
import { User } from 'src/users/user.entitly';

/**
 * Injectable service for generating tokens.
 */
@Injectable()
export class GenerateTokensProvider {
  constructor(
    /**
     * Injecting userService repository.
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * Injecting JwtService.
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwtConfig.
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Signs a token with a given user ID, expiration time, and optional payload.
   * @param userId - The ID of the user.
   * @param expiresIn - The expiration time for the token.
   * @param payload - Additional data to include in the token.
   * @returns A signed JWT token.
   */
  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  /**
   * Generates access and refresh tokens for a given user.
   * @param user - The user entity for whom tokens are generated.
   * @returns An object containing access token, refresh token, and user details.
   */
  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      /**
       * Generate access token.
       */
      this.signToken(user.id, this.jwtConfiguration.ttl, { email: user.email }),

      /**
       * Generate refresh token.
       */
      this.signToken(user.id, this.jwtConfiguration.ttl),
    ]);

    return { accessToken, refreshToken, user };
  }
}
