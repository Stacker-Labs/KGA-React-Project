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
          res.cookie(`access-token`, data.accessToken);
        }),
      )
      .pipe(
        map((data) => ({
          message:
            'Set access token in cookie. accessToken for authorization swagger',
          ...data,
        })),
      );
  }
}
