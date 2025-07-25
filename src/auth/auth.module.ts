import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt';
import { HashingProvider } from './providers/hashing';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/authConfig/jwt.config';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';
import { GoogleAuthenticationController } from './social/google-authentication.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [
    AuthService,
    {
      provide: HashingProvider, // Use the abstract class as a token
      useClass: BcryptProvider, // Bind it to the concrete implementation
    },
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokensProvider,
    GoogleAuthenticationService,
  ],
  exports: [AuthService, HashingProvider, GoogleAuthenticationService],
})
export class AuthModule {}