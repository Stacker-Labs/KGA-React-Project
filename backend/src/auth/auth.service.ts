import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { GithubLoginDto } from './dto/githubLogin.dto';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { KakaoLoginDto } from './dto/kakaoLogin.dto';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/common/const/provider.enum';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  // CMMT: - Login
  async login(loginDto: LoginDto) {
    // TODO
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('비밀번호가 다릅니다.');
    }

    const payload = { username };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 3600,
    });

    return { accessToken };
  }

  // CMMT: - Github Login
  async githubLogin(githubLoginDto: GithubLoginDto) {
    const code = githubLoginDto.code;

    const githubTokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: `client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      },
    );
    const githubTokenResult = await githubTokenResponse.json();

    const githubAccessToken = githubTokenResult.access_token;
    const response = await fetch('https://api.github.com/user', {
      method: 'get',
      headers: { Authorization: `Bearer ${githubAccessToken}` },
    });
    const result = await response.json();
    const { id, login: nickname, avatar_url: image } = result;

    const payload = {
      username: `${Provider.GITHUB}-${id}`,
      nickname,
      image,
      provider: Provider.GITHUB,
    };
    const accessToken = await this.signToken(payload);

    return { accessToken };
  }

  // CMMT: - Google Login
  async googleLogin(googleLoginDto: GoogleLoginDto) {
    const googleAccessToken = googleLoginDto.code;

    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'get',
        headers: { Authorization: `Bearer ${googleAccessToken}` },
      },
    );
    const result = await response.json();
    const { id, email: nickname, picture: image } = result;

    const payload = {
      username: `${Provider.GOOGLE}-${id}`,
      nickname,
      image,
      provider: Provider.GOOGLE,
    };
    const accessToken = await this.signToken(payload);

    return { accessToken };
  }

  // CMMT: - Kakao Login
  async kakaoLogin(kakaoLoginDto: KakaoLoginDto) {
    const code = kakaoLoginDto.code;

    const kakaoTokenResponse = await fetch(
      'https://kauth.kakao.com/oauth/token',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT}&code=${code}`,
      },
    );
    const kakaoTokenResult = await kakaoTokenResponse.json();

    const kakaoAccessToken = kakaoTokenResult.access_token;
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const result = await response.json();
    const { id } = result;
    const { nickname, profile_image: image } = result.properties;

    const payload = {
      username: `${Provider.KAKAO}-${id}`,
      nickname,
      image,
      provider: Provider.KAKAO,
    };
    const accessToken = await this.signToken(payload);

    return { accessToken };
  }

  // CMMT: - Register
  async register(registerDto: RegisterDto) {
    // TODO
    const { username, password, nickname, image } = registerDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    const hash = await bcrypt.hash(password, 10);

    const payload = {
      username,
      password: hash,
      nickname,
      image,
      provider: Provider.LOCAL,
    };

    const accessToken = await this.signToken(payload);

    return { accessToken };
  }

  // CMNT: - Logout
  async logout() {
    const expiresIn = 0;
    const accessToken = this.jwtService.sign(null, { expiresIn });
    return { accessToken, expiresIn };
  }

  // CMNT: - Generate Token
  async signToken(payload: TokenDto) {
    const { username, password } = payload;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      await this.userRepository.save({
        ...payload,
        password: password ?? username,
      });
    }

    const token = this.jwtService.sign(
      { username },
      { secret: process.env.JWT_SECRET, expiresIn: 3600 },
    );

    return token;
  }
}
