import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const httpsProtocol = req.headers['referer'].split(':')[0] === 'https';
    return next
      .handle()
      .pipe(
        tap((data) => {
          const res = context.switchToHttp().getResponse();
          res.cookie(`access-token`, data.accessToken, {
            maxAge: data.expiresIn ?? 3600 * 1000,
            domain: process.env.DOMAIN || 'localhost',
            sameSite: httpsProtocol && 'None',
            secure: httpsProtocol,
            httpOnly: true,
          });
        }),
      )
      .pipe(
        map((data) => ({
          message: data.expiresIn
            ? 'Access token is in cookie now.'
            : 'User is logged out',
          user: data.user,
        })),
      );
  }
}
