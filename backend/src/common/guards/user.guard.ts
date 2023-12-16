import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    const payload = await this.jwtService.verify(accessToken.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    req.username = payload.username;

    return true;
  }
}
