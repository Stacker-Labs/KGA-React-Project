import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Board List' })
  getMain() {
    return this.appService.getMain();
  }

  @Get('/search')
  @ApiOperation({ summary: 'Get Search Board List' })
  getSearch(@Query('q') query: string) {
    return this.appService.getSearch(query);
  }

  @Get('/tags')
  @ApiOperation({ summary: 'Get Tag List' })
  getTags() {
    return this.appService.getTags();
  }

  @Get('/tags/:tag')
  @ApiOperation({ summary: 'Get Tag Board List' })
  getTag(@Param('tag') tag: string) {
    return this.appService.getTagBoards(tag);
  }

  @Get('/admin')
  @ApiOperation({ summary: 'Get User List' })
  getAdmin() {
    return this.appService.getAdmin();
  }
}
