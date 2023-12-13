import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { Role } from 'src/common/const/role.enum';
import { UserGuard } from 'src/common/guards/user.guard';

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
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Edit User' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @User('id') userId: number,
    @User('role') role: Role,
  ) {
    return this.usersService.update(id, updateUserDto, userId, role);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete User' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @User('role') role: Role,
  ) {
    return this.usersService.remove(id, userId, role);
  }
}
