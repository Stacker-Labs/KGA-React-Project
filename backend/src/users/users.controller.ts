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
import { ReqEditUserDto } from './dto/req-editUser.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorator/user.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { CookieInterceptor } from '../common/interceptors/cookie.interceptor';
import { ResGetLoginUserDto } from './dto/res-getLoginUser.dto';
import { ResGetUserDto } from './dto/res-getUser.dto';
import { ResEditUserDto } from './dto/res-editUser.dto';
import { ResDeleteUserDto } from './dto/res-deleteUser.dto';
import { ResGetUserBoardsDto } from './dto/res-getUserBoards.dto';
import { ResCreateFollowDto } from './dto/res-createFollow.dto';
import { ResDeleteFollowDto } from './dto/res-deleteFollowUser.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(UserGuard)
  @UseInterceptors(CookieInterceptor)
  @ApiOperation({ summary: 'Get Login User' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResGetLoginUserDto })
  getLoginUser(@User() username: string): Promise<ResGetLoginUserDto> {
    return this.usersService.getLoginUser(username);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User' })
  @ApiOkResponse({ type: ResGetUserDto })
  getUser(@Param('id', ParseIntPipe) id: number): Promise<ResGetUserDto> {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit User' })
  @ApiCreatedResponse({ type: ResEditUserDto })
  editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqEditUserDto: ReqEditUserDto,
    @User() username: string,
  ): Promise<ResEditUserDto> {
    return this.usersService.editUser(id, reqEditUserDto, username);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ type: ResDeleteUserDto })
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @User() username: string,
  ): Promise<ResDeleteUserDto> {
    return this.usersService.deleteUser(id, username);
  }

  @Get(':id/:page')
  @ApiOperation({ summary: 'Get User Boards' })
  @ApiOkResponse({ type: ResGetUserBoardsDto })
  getUserBoards(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', ParseIntPipe) page: number,
  ): Promise<ResGetUserBoardsDto> {
    return this.usersService.getUserBoards(id, page);
  }

  @Post(':id/following')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Follow' })
  @ApiOkResponse({ type: ResCreateFollowDto })
  createFollow(
    @Param('id', ParseIntPipe) id: number,
    @User() username: string,
  ): Promise<ResCreateFollowDto> {
    return this.usersService.createFollow(id, username);
  }

  @Delete(':id/following')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Follow' })
  @ApiOkResponse({ type: ResDeleteFollowDto })
  deleteFollow(
    @Param('id', ParseIntPipe) id: number,
    @User() username: string,
  ): Promise<ResDeleteFollowDto> {
    return this.usersService.deleteFollow(id, username);
  }
}
