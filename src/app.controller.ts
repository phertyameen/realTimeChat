import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**App controller class */
@Controller()
export class AppController {
    /**constructor for the app service */
  constructor(private readonly appService: AppService) {}

  /**get method */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
