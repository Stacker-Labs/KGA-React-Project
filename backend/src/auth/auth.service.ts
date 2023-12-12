import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { GithubLoginDto } from './dto/githubLogin.dto';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { KakaoLoginDto } from './dto/kakaoLogin.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return 'login';
  }

  githubLogin(githubLoginDto: GithubLoginDto) {
    return 'githubLogin';
  }

  googleLogin(googleLoginDto: GoogleLoginDto) {
    return 'googleLogin';
  }

  kakaoLogin(kakaoLoginDto: KakaoLoginDto) {
    return 'kakaoLogin';
  }

  register(registerDto: RegisterDto) {
    return 'register';
  }
}
