import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
