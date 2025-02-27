import { Injectable } from '@nestjs/common';

@Injectable()
/**App service class */
export class AppService {

  /**App service method */
  getHello(): string {
    return 'Hello';
  }
}
