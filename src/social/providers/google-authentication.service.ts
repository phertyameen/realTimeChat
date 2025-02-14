// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { OAuth2Client } from 'google-auth-library';
// import jwtConfig from 'src/auth/authConfig/jwt.config';
// import { GoogleTokenDto } from '../dtos/googleToken.dto';
// import { UserServices } from 'src/users/Providers/users.services';
// import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

// @Injectable()
// export class GoogleAuthenticationService implements OnModuleInit {
//   private oAuthClient: OAuth2Client;
//   constructor(
//     /**
//      * inject userService
//      */
//     @Inject(forwardRef(() => UserServices))
//     private readonly userService: UserServices,

//     /**
//      * inject jwtconfig
//      */
//     @Inject(jwtConfig.KEY)
//     private readonly jwtConfigurattion: ConfigType<typeof jwtConfig>,
//     /**
//      * inject generateTokensProvider
//      */
//     private readonly generateTokensProvider: GenerateTokensProvider,
//   ) {}

//   onModuleInit() {
//     const client_id = this.jwtConfigurattion.googleClient_id;
//     const client_secret = this.jwtConfigurattion.googleClient_secret;

//     this.oAuthClient = new OAuth2Client(client_id, client_secret);
//   }
//   public async authenticate(googleTokenDto: GoogleTokenDto) {
//     try {
//       // verify the google token sent by user
//       const loginTicket = await this.oAuthClient.verifyIdToken({
//         idToken: googleTokenDto.token,
//       });

//       // extract the payload from google jwt token
//       const {
//         email,
//         sub: googleId,
//         given_name: firstName,
//         family_name: lastName,
//       } = loginTicket.getPayload();

//       // find the user in the database using googleid
//       const user = await this.userService.findOneByGoogleId(googleId);

//       // if user exist, generate token
//       if (user) {
//         return this.generateTokensProvider.generateTokens(user);
//       }
//       // else generate the user and create the token
//       const newUser = this.userService.createGoogleUser({
//         email: email,
//         firstName: firstName,
//         lastName: lastName,
//         googleId: googleId,
//       });
//       return this.generateTokensProvider.generateTokens(newUser);
//     } catch (error) {
//       throw new UnauthorizedException(error);
//     }
//     // if any of the step fails, send an unauthorised exception
//   }
// }
