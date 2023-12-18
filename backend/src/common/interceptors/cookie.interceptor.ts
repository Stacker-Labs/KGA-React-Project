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
    return next
      .handle()
      .pipe(
        tap((data) => {
          const res = context.switchToHttp().getResponse();
          res.cookie(`access-token`, data.accessToken, {
            maxAge: data.expiresIn ?? 3600 * 1000,
            // httpOnly: true,
          });
        }),
      )
      .pipe(
        map((data) => ({
          message: 'Access token is in cookie now.',
        })),
      );
  }
}
