import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class DataResponseTsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('before');
    return next.handle().pipe(
      map((data) => ({
        apiVersion: '0.0.1',
        result: data.length,
        data: data,
      })),
    );
  }
}
