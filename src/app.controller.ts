import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
/**app controller class */
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**get decorator */
  @Get()

  /**get method */
  getHello(): string {
    return this.appService.getHello();
  }
}
