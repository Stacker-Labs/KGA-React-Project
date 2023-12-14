import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/common/guards/user.guard';
import { User } from 'src/common/decorator/user.decorator';
import { Role } from 'src/common/const/role.enum';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('boards')
@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('boards')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post Board' })
  create(@Body() createBoardDto: CreateBoardDto, @User('id') userId: number) {
    return this.boardsService.create(createBoardDto, userId);
  }

  @Get('boards/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Board' })
  findOne(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
    return this.boardsService.findOne(id, userId);
  }

  @Put('boards/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit Board' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @User('id') userId: number,
    @User('role') role: Role,
  ) {
    return this.boardsService.update(id, updateBoardDto, userId, role);
  }

  @Delete('boards/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Board' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @User('role') role: Role,
  ) {
    return this.boardsService.remove(id, userId, role);
  }

  @Post('boards/:id/likes')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Likes' })
  createLikes(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.createLikes(id, userId);
  }

  @Delete('boards/:id/likes')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Likes' })
  removeLikes(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.removeLikes(id, userId);
  }

  @Post('comments')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Comment' })
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @User('id') userId: number,
  ) {
    return this.boardsService.createComment(createCommentDto, userId);
  }

  @Put('comments/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Comment' })
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @User('id') userId: number,
  ) {
    return this.boardsService.updateComment(id, updateCommentDto, userId);
  }

  @Delete('comments/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Comment' })
  removeComment(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return this.boardsService.removeComment(id, userId);
  }
}
