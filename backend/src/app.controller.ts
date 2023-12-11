import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMain() {
    return this.appService.getMain();
  }

  @Get('/search')
  getSearch(@Query('q') query: string) {
    return this.appService.getSearch(query);
  }

  @Get('/tags')
  getTags() {
    return this.appService.getTags();
  }

  @Get('/tags/:tagname')
  getTagName(@Param('tagname') tagname: string) {
    return this.appService.getTagName(tagname);
  }

  @Get('/admin')
  getAdmin() {
    return this.appService.getAdmin();
  }
}
