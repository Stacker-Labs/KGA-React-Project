import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { BoardModel } from 'src/boards/entities/board.entity';
import { CommentModel } from 'src/boards/entities/comment.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, BoardModel, CommentModel])],
  controllers: [UsersController],
  providers: [JwtService, UsersService],
})
export class UsersModule {}
