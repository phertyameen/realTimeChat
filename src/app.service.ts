import { Injectable } from '@nestjs/common';

/**App service class */
@Injectable()
export class AppService {

  /**App service method */
  getHello(): string {
    return 'Hello';
  }
}
