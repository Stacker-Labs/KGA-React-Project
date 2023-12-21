import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../users/users.service';
import { UserModel } from '../../../users/entities/user.entity';
import { RoomModel } from '../../../room/entities/room.entity';
import { MockUserRepository } from '../repository/user.repository';
import { MockRoomRepository } from '../repository/room.repository';

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
];
