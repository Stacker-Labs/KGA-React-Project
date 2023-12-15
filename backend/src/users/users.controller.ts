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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { Role } from 'src/common/const/role.enum';
import { UserGuard } from 'src/common/guards/user.guard';
import { CreateFollowDto } from './dto/create-follow.dto';
import { RemoveFollowDto } from './dto/remove-follow.dto';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users/:id')
  @ApiOperation({ summary: 'Get User' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put('users/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit User' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @User('id') userId: number,
    @User('role') role: Role,
  ) {
    return this.usersService.update(id, updateUserDto, userId, role);
  }

  @Delete('users/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete User' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @User('role') role: Role,
  ) {
    return this.usersService.remove(id, userId, role);
  }

  @Post('following')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Follow' })
  createFollow(
    @Body() createFollowDto: CreateFollowDto,
    @User('id') userId: number,
  ) {
    return this.usersService.createFollow(createFollowDto, userId);
  }

  @Delete('following')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Follow' })
  removeFollow(
    @Body() removeFollowDto: RemoveFollowDto,
    @User('id') userId: number,
  ) {
    return this.usersService.removeFollow(removeFollowDto, userId);
  }
}
