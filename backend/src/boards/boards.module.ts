import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from './entities/board.entity';
import { CommentModel } from './entities/comment.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { TagModel } from './entities/tag.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardModel, CommentModel, UserModel, TagModel]),
  ],
  controllers: [BoardsController],
  providers: [JwtService, BoardsService, UsersService],
})
export class BoardsModule {}
