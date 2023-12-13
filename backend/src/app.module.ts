import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/entities/user.entity';
import { BoardModel } from './boards/entities/board.entity';
import { CommentModel } from './boards/entities/comment.entity';
import { RoomModel } from './users/entities/room.entity';
import { ChatModel } from './users/entities/chat.entity';
import { TagModel } from './boards/entities/tag.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        UserModel,
        BoardModel,
        CommentModel,
        RoomModel,
        ChatModel,
        TagModel,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BoardModel, UserModel, TagModel]),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, UsersService],
})
export class AppModule {}
