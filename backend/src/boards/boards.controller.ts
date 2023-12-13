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

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post Board' })
  create(@Body() createBoardDto: CreateBoardDto, @User('id') userId: number) {
    return this.boardsService.create(createBoardDto, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Board' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
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

  @Delete(':id')
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
}
