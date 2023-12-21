import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../common/const/role.enum';
import { JwtService } from '@nestjs/jwt';
import { RoomModel } from '../room/entities/room.entity';
import * as bcrypt from 'bcrypt';
import { BoardModel } from '../boards/entities/board.entity';
import { pagination } from '../common/function/pagination';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(RoomModel)
    private readonly roomRepository: Repository<RoomModel>,
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    private readonly jwtService: JwtService,
  ) {}

  // CMNT: - Get Login User
  async getLoginUser(username: string) {
    const user = await this.getUser(username, {
      followingUsers: true,
      followerUsers: true,
      comments: true,
      rooms: true,
    });
    const accessToken = this.jwtService.sign(
      { username },
      { secret: process.env.JWT_SECRET || 'secret', expiresIn: 3600 },
    );

    return { accessToken, user };
  }

  // CMMT: - Find User
  async findOne(id: number) {
    const user = await this.verifiedUser(id, {
      followerUsers: true,
      followingUsers: true,
      comments: true,
      rooms: true,
    });

    return user;
  }

  // CMMT: - Update User
  async update(id: number, updateUserDto: UpdateUserDto, username: string) {
    await this.verifiedUser(id);

    const user = await this.getUser(username);

    const { password } = updateUserDto;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      updateUserDto.password = hash;
    }

    if (id === user.id || user.role === Role.ADMIN) {
      const newUser = await this.userRepository.save({
        id,
        ...updateUserDto,
      });
      return newUser;
    }

    throw new UnauthorizedException('권한이 없습니다.');
  }

  // CMMT: - Remove User
  async remove(id: number, username: string) {
    await this.verifiedUser(id);

    const user = await this.getUser(username);

    if (id === user.id || user.role === Role.ADMIN) {
      return this.userRepository.delete(id);
    }

    throw new UnauthorizedException('권한이 없습니다.');
  }

  // GETCMMT: - Get User Boards
  async getUserBoards(id: number, page: number) {
    const take = 10;
    const skip = take * (page - 1);
    const boards = await this.boardRepository.findAndCount({
      where: { user: { id } },
      order: { id: 'DESC' },
      relations: {
        user: true,
        comments: true,
        tags: true,
        likes: true,
        views: true,
      },
      skip,
      take,
    });

    return pagination(boards, take, skip, page);
  }

  // CMNT: - Create Follow
  async createFollow(id: number, username: string) {
    const user = await this.getUser(username, {
      followingUsers: true,
      followerUsers: true,
    });
    if (id === user.id) {
      throw new BadRequestException('자기 자신은 팔로우 할 수 없습니다.');
    }

    const targetUser = await this.verifiedUser(id);

    const followingUsers = user.followingUsers ? [...user.followingUsers] : [];
    const isFollowingUser = followingUsers.findIndex(
      (following) => following.id === id,
    );
    if (isFollowingUser === -1) {
      followingUsers.push(targetUser);
    } else {
      throw new BadRequestException('이미 팔로우 한 사용자입니다.');
    }

    const followerUsers = user.followerUsers ? [...user.followerUsers] : [];
    const isFollowerUser = followerUsers.findIndex(
      (follower) => follower.id === id,
    );
    if (isFollowerUser === -1) {
      await this.roomRepository.save({ users: [user, targetUser] });
    }

    return this.userRepository.save({ id: user.id, followingUsers });
  }

  // CMNT: - Remove Follow
  async removeFollow(id: number, username: string) {
    const user = await this.getUser(username, {
      followingUsers: true,
      followerUsers: true,
    });

    const followingUsers = user.followingUsers ? [...user.followingUsers] : [];
    const isFollowingUser = followingUsers.findIndex(
      (following) => following.id === id,
    );
    if (isFollowingUser === -1) {
      throw new BadRequestException('이미 팔로우가 취소되었습니다.');
    }

    followingUsers.splice(isFollowingUser, 1);

    const followerUsers = user.followerUsers ? [...user.followerUsers] : [];
    const isFollowerUser = followerUsers.findIndex(
      (follower) => follower.id === id,
    );
    if (isFollowerUser === -1) {
      const room = await this.roomRepository.findOne({
        where: { users: { id } },
        relations: { users: true },
      });

      await this.roomRepository.delete(room.id);
    }

    return this.userRepository.save({
      id: user.id,
      followingUsers,
    });
  }

  // CMNT: - Get User by username
  async getUser(username: string, relations?: object) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations,
    });
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    return user;
  }

  // CMNT: - Verify User
  async verifiedUser(id: number, relations?: object) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations,
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return user;
  }
}
