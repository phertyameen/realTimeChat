import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @class DataResponseInterceptor
 * @description Intercepts HTTP responses to standardize the output format.
 */
@Injectable()
/**Data response interceptor */
export class DataResponseInterceptor implements NestInterceptor {
  /**
   * Intercepts and transforms the response.
   * 
   * @param {ExecutionContext} context - The execution context of the request.
   * @param {CallHandler} next - The next handler in the pipeline.
   * @returns {Observable<any>} An observable with the transformed response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before');
    return next.handle().pipe(
      map((data) => ({
        apiversion: '0.0.1',
        result: data.length,
        data: data,
      }))
    );
  }
}
