import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**app controller class */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**get decorator */
  @Get()

  /**get method */
  getHello(): string {
    return this.appService.getHello();
  }
}
