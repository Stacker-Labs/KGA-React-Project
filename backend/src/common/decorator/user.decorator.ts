import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  return req.username;
});
