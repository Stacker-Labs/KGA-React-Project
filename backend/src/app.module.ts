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
      entities: [UserModel, BoardModel, CommentModel, RoomModel, ChatModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
