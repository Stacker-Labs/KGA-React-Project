import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      return true;
    }

    const payload = await this.jwtService.verify(accessToken.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.userService.getUser(payload.username);

    req.user = user;

    return true;
  }
}
