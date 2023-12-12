import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get User' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/follower')
  @ApiOperation({ summary: 'Get User Followers' })
  findFollowers(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findFollowers(id);
  }

  @Get(':id/following')
  @ApiOperation({ summary: 'Get User Followings' })
  findFollowings(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findFollowings(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit User' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
