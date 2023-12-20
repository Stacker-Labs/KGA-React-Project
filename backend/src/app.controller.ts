import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
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

  @Get('page/:page')
  @ApiOperation({ summary: 'Get Board List' })
  getMain(@Param('page', ParseIntPipe) page: number) {
    return this.appService.getMain(page);
  }

  @Get('search/:page')
  @ApiOperation({ summary: 'Get Search Board List' })
  getSearch(
    @Param('page', ParseIntPipe) page: number,
    @Query('q') query: string,
  ) {
    return this.appService.getSearch(page, query);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get Tag List' })
  getTags() {
    return this.appService.getTags();
  }

  @Get('tags/:tag/:page')
  @ApiOperation({ summary: 'Get Tag Board List' })
  getTag(@Param('tag') tag: string, @Param('page', ParseIntPipe) page: number) {
    return this.appService.getTagBoards(tag, page);
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User List' })
  getAdmin() {
    return this.appService.getUsers();
  }

  @Get('room/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Room Chats' })
  getRoom(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getRoom(id);
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
