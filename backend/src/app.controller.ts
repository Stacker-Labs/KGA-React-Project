import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/search')
  searchBoard(@Query('q') query: string) {}

  @Get('/tags')
  getTags() {}

  @Get('/tags/:tagname')
  getTagName(@Param('tagname') tagname: string) {}

  @Get('/admin')
  getAdmin() {}
}
