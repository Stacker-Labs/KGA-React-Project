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
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { UserGuard } from 'src/common/guards/user.guard';
import { CookieInterceptor } from 'src/common/interceptors/cookie.interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get Login User' })
  @UseGuards(UserGuard)
  @UseInterceptors(CookieInterceptor)
  getLoginUser(@User() username: string) {
    return this.usersService.getLoginUser(username);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit User' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @User() username: string,
  ) {
    return this.usersService.update(id, updateUserDto, username);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete User' })
  remove(@Param('id', ParseIntPipe) id: number, @User() username: string) {
    return this.usersService.remove(id, username);
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
