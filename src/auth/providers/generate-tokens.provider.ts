import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../authConfig/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interface/activeInterface';
import { UserService } from 'src/users/provider/user.service';
import { User } from 'src/users/user.entitly';

/**Generate token provider */
@Injectable()
/**generate tokens provider class */
export class GenerateTokensProvider {
  constructor(
    /*
     * injecting userService repo
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /*
     *injecting jwtService
     */
    private readonly jwtService: JwtService,

    /*
     * injecting jwtConfig
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**sign token class */
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

  /**Generate tokens class */
  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
    // generate access token
    this.signToken(user.id, this.jwtConfiguration.ttl, {email: user.email}),

    // generate refresh token
    this.signToken(user.id, this.jwtConfiguration.ttl)
    ])
    
    return {'accessToken': accessToken, 'refreshToken': refreshToken, user}
  }
}