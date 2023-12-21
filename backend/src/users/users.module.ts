import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { BoardModel } from '../boards/entities/board.entity';
import { CommentModel } from '../boards/entities/comment.entity';
import { JwtService } from '@nestjs/jwt';
import { RoomModel } from '../room/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, BoardModel, CommentModel, RoomModel]),
  ],
  controllers: [UsersController],
  providers: [JwtService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
