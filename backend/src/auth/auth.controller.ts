import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { GithubLoginDto } from './dto/githubLogin.dto';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { KakaoLoginDto } from './dto/kakaoLogin.dto';
import { RegisterDto } from './dto/register.dto';
import { CookieInterceptor } from 'src/common/interceptors/cookie.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(CookieInterceptor)
  @ApiOperation({ summary: 'Login' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('github')
  @UseInterceptors(CookieInterceptor)
  @ApiOperation({ summary: 'Github Login' })
  githubLogin(@Body() githubLoginDto: GithubLoginDto) {
    return this.authService.githubLogin(githubLoginDto);
  }

  @Post('google')
  @UseInterceptors(CookieInterceptor)
  @ApiOperation({ summary: 'Google Login' })
  googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return this.authService.googleLogin(googleLoginDto);
  }

  @Post('kakao')
  @UseInterceptors(CookieInterceptor)
  @ApiOperation({ summary: 'Kakao Login' })
  kakaoLogin(@Body() kakaoLoginDto: KakaoLoginDto) {
    return this.authService.kakaoLogin(kakaoLoginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseInterceptors(CookieInterceptor)
  @ApiOperation({ summary: 'Logout' })
  logout() {
    return this.authService.logout();
  }
}
