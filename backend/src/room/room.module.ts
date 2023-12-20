import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { RoomModel } from './entities/room.entity';
import { ChatModel } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, RoomModel, ChatModel])],
  providers: [RoomGateway],
})
export class RoomModule {}
