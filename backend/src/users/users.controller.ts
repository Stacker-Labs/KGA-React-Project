import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto } from './dto/edit-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorator/user.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { CookieInterceptor } from '../common/interceptors/cookie.interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get Login User' })
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @UseInterceptors(CookieInterceptor)
  getLoginUser(@User() username: string) {
    return this.usersService.getLoginUser(username);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit User' })
  editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: EditUserDto,
    @User() username: string,
  ) {
    return this.usersService.update(id, editUserDto, username);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete User' })
  remove(@Param('id', ParseIntPipe) id: number, @User() username: string) {
    return this.usersService.remove(id, username);
  }

  @Get(':id/:page')
  @ApiOperation({ summary: 'Get User Boards' })
  getUserBoards(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return this.usersService.getUserBoards(id, page);
  }

  @Post(':id/following')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Follow' })
  createFollow(
    @Param('id', ParseIntPipe) id: number,
    @User() username: string,
  ) {
    return this.usersService.createFollow(id, username);
  }

  @Delete(':id/following')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Follow' })
  removeFollow(
    @Param('id', ParseIntPipe) id: number,
    @User() username: string,
  ) {
    return this.usersService.removeFollow(id, username);
  }
}
