import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { MailService } from '@mail/mail.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { TokenInterface } from '@auth/interface/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입 로직
  async signup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  // 로그인 로직
  async login(dto: LoginUserDto) {
    // mail 유무 -> 비밀번호 체크 -> return
    const user = await this.userService.getUserBy('email', dto.email);
    const pass = await bcrypt.compare(dto.password, user.password);

    if (!pass) {
      throw new HttpException(
        '패스워드가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  // 회원가입 시 메일 전송 로직
  async signupMail(email: string) {
    await this.mailService.sendMail({
      to: email,
      subject: '안녕하세요. 장센은행에 가입해주셔서 감사합니다.',
      html: '<h2>회원가입 감사드립니다.</h2>',
    });
  }

  // 토큰 발행 로직
  public generateToken(userId: string) {
    const load: TokenInterface = { userId };
    const token = this.jwtService.sign(load, {
      secret: this.configService.get('TOKEN_SECRET'),
      expiresIn: this.configService.get('TOKEN_TIME'),
    });

    return token;
  }
}
