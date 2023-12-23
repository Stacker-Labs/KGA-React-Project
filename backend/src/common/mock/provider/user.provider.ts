import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../users/users.service';
import { UserModel } from '../../../users/entities/user.entity';
import { RoomModel } from '../../../room/entities/room.entity';
import { BoardModel } from '../../../boards/entities/board.entity';
import { MockUserRepository } from '../repository/user.repository';
import { MockRoomRepository } from '../repository/room.repository';
import { MockBoardRepository } from '../repository/board.repository';
import { AppService } from '../../../app.service';
import { TagModel } from '../../../boards/entities/tag.entity';
import { ChatModel } from '../../../room/entities/chat.entity';
import { MockChatRepository } from '../repository/chat.repository';

export const usersProviders = [
  UsersService,
  JwtService,
  {
    provide: getRepositoryToken(UserModel),
    useClass: MockUserRepository,
  },
  {
    provide: getRepositoryToken(RoomModel),
    useClass: MockRoomRepository,
  },
  {
    provide: getRepositoryToken(BoardModel),
    useClass: MockBoardRepository,
  },
  {
    provide: getRepositoryToken(TagModel),
    useClass: MockBoardRepository,
  },
  {
    provide: getRepositoryToken(RoomModel),
    useClass: MockRoomRepository,
  },
  {
    provide: getRepositoryToken(ChatModel),
    useClass: MockChatRepository,
  },
];
