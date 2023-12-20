import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from './entities/board.entity';
import { CommentModel } from './entities/comment.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { TagModel } from './entities/tag.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardModel, CommentModel, UserModel, TagModel]),
    UsersModule,
  ],
  controllers: [BoardsController],
  providers: [JwtService, BoardsService],
})
export class BoardsModule {}
