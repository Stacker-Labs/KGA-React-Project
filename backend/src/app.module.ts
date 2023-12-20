import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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
import { APP_INTERCEPTOR } from '@nestjs/core';

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
      host: process.env.DB_HOSTNAME || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
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
      ssl: process.env.DB_HOSTNAME && {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([BoardModel, UserModel, TagModel]),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
