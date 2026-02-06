import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  healthCheck() {
    return this.appService.healthCheck();
  }

  @Public()
  @Get()
  getInfo() {
    return this.appService.getInfo();
  }
}
