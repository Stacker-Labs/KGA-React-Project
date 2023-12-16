import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from './common/guards/user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from './common/guards/admin.guard';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Board List' })
  getMain() {
    return this.appService.getMain();
  }

  @Get('search')
  @ApiOperation({ summary: 'Get Search Board List' })
  getSearch(@Query('q') query: string) {
    return this.appService.getSearch(query);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get Tag List' })
  getTags() {
    return this.appService.getTags();
  }

  @Get('tags/:tag')
  @ApiOperation({ summary: 'Get Tag Board List' })
  getTag(@Param('tag') tag: string) {
    return this.appService.getTagBoards(tag);
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User List' })
  getAdmin() {
    return this.appService.getUsers();
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload Image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadImage(file);
  }
}
