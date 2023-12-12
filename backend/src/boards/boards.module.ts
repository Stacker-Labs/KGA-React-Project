import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from './entities/board.entity';
import { CommentModel } from './entities/comment.entity';
import { UserModel } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardModel, CommentModel, UserModel])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
