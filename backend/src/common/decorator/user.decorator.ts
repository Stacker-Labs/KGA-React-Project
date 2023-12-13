import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { UserModel } from 'src/users/entities/user.entity';

export const User = createParamDecorator(
  (data: keyof UserModel, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
