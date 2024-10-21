import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { MailModule } from '@mail/mail.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { LocalAuthStrategy } from '@auth/strategy/local-auth.strategy';
import { TokenStrategy } from '@auth/strategy/token.strategy';
import { GoogleAuthStrategy } from '@auth/strategy/google-auth.strategy';
import { KakaoAuthStrategy } from '@auth/strategy/kakao-auth.strategy';

@Module({
  imports: [ConfigModule, UserModule, MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    TokenStrategy,
    GoogleAuthStrategy,
    KakaoAuthStrategy,
  ],
})
export class AuthModule {}
