import { Injectable } from '@nestjs/common';
/**AppService  class*/
@Injectable()

export class AppService {
  
   /**Get  hello method */
  getHello(): string {
    return 'Hello';
  }
}
