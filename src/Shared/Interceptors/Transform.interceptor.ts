import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    return next.handle().pipe(
        map(data => {
            if (url.startsWith('/api')) {
                return { success: true, data, timestamp: new Date() };
            }
            return data;
        }),
    );
}
}
export{TransformInterceptor}