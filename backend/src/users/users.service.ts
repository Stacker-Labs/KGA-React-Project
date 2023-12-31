import {
  NotFoundException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { ReqEditUserDto } from './dto/req-editUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../common/const/role.enum';
import { JwtService } from '@nestjs/jwt';
import { RoomModel } from '../room/entities/room.entity';
import * as bcrypt from 'bcrypt';
import { BoardModel } from '../boards/entities/board.entity';
import { pagination } from '../common/function/pagination';
import { plainToInstance } from 'class-transformer';
import { ResGetLoginUserDto } from './dto/res-getLoginUser.dto';
import { ResGetUserDto } from './dto/res-getUser.dto';
import { ResEditUserDto } from './dto/res-editUser.dto';
import { ResDeleteUserDto } from './dto/res-deleteUser.dto';
import { ResGetUserBoardsDto } from './dto/res-getUserBoards.dto';
import { ResCreateFollowDto } from './dto/res-createFollow.dto';
import { ResDeleteFollowDto } from './dto/res-deleteFollowUser.dto';

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

  // GETLOGINUSER: - {accessToken: string, user: UserModel}
  async getLoginUser(username: string): Promise<ResGetLoginUserDto> {
    const user = await this.getCookieUser(username, {
      followingUsers: true,
      followerUsers: true,
      comments: true,
      rooms: { users: true },
    });

    const accessToken = this.jwtService.sign(
      { username },
      { secret: process.env.JWT_SECRET || 'secret', expiresIn: 360000 },
    );

    const resGetLoginUserDto = { accessToken, user };
    const result = plainToInstance(ResGetLoginUserDto, resGetLoginUserDto);

    return result;
  }

  // GETUSER: - {user: UserModel}
  async getUser(id: number): Promise<ResGetUserDto> {
    const user = await this.verifiedUser(id, {
      followerUsers: true,
      followingUsers: true,
      comments: { board: true },
      rooms: true,
    });

    const resGetUserDto = { user };
    const result = plainToInstance(ResGetUserDto, resGetUserDto);

    return result;
  }

  // EDITUSER: - {editedUser: UserModel}
  async editUser(
    id: number,
    reqEditUserDto: ReqEditUserDto,
    username: string,
  ): Promise<ResEditUserDto> {
    await this.verifiedUser(id);

    const user = await this.getCookieUser(username);

    const { password } = reqEditUserDto;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      reqEditUserDto.password = hash;
    }

    if (id === user.id || user.role === Role.ADMIN) {
      const editedUser = await this.userRepository.save({
        id,
        ...reqEditUserDto,
      });

      const resEditUserDto = { editedUser };
      const result = plainToInstance(ResEditUserDto, resEditUserDto);

      return result;
    }

    throw new ForbiddenException('권한이 없습니다.');
  }

  // DELETEUSER: - {message: string}
  async deleteUser(id: number, username: string): Promise<ResDeleteUserDto> {
    await this.verifiedUser(id);

    const user = await this.getCookieUser(username);

    if (id === user.id || user.role === Role.ADMIN) {
      await this.userRepository.delete(id);

      const resDeleteFollowDto = { message: '탈퇴가 완료되었습니다.' };
      const result = plainToInstance(ResDeleteUserDto, resDeleteFollowDto);
      return result;
    }

    throw new ForbiddenException('권한이 없습니다.');
  }

  // GETUSERBOARDS: - {boards: BoardModel[], boardLength: number, nextPage: number | boolean}
  async getUserBoards(id: number, page: number): Promise<ResGetUserBoardsDto> {
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

    const resGetUserBoards = pagination(boards, take, skip, page);
    const result = plainToInstance(ResGetUserBoardsDto, resGetUserBoards);

    return result;
  }

  // CMNT: - Create Follow
  async createFollow(
    id: number,
    username: string,
  ): Promise<ResCreateFollowDto> {
    const user = await this.getCookieUser(username, {
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
      throw new NotAcceptableException('이미 팔로우 한 사용자입니다.');
    }

    const room = await this.roomRepository.find({
      select: { users: true },
      where: { users: [{ id }, { username }] },
      relations: { users: true },
    });
    const roomWithTargetUser = room.filter((room) => room.users.length === 2);

    if (!roomWithTargetUser.length) {
      await this.roomRepository.save({ users: [user, targetUser] });
    }

    await this.userRepository.save({ id: user.id, followingUsers });

    const resCreateFollowDto = {
      message: `${targetUser.nickname} 유저를 팔로우 했습니다.`,
    };
    const result = plainToInstance(ResCreateFollowDto, resCreateFollowDto);
    return result;
  }

  // CMNT: - Remove Follow
  async deleteFollow(
    id: number,
    username: string,
  ): Promise<ResDeleteFollowDto> {
    const user = await this.getCookieUser(username, {
      followingUsers: true,
      followerUsers: true,
    });

    const followingUsers = user.followingUsers ? [...user.followingUsers] : [];
    const isFollowingUser = followingUsers.findIndex(
      (following) => following.id === id,
    );
    if (isFollowingUser === -1) {
      throw new NotAcceptableException('이미 팔로우가 취소되었습니다.');
    }

    followingUsers.splice(isFollowingUser, 1);

    const room = await this.roomRepository.find({
      select: { users: true },
      where: { users: [{ id }, { username }] },
      relations: { users: true },
    });
    const roomWithTargetUser = room.filter((room) => room.users.length === 2);

    if (roomWithTargetUser.length) {
      await this.roomRepository.delete(roomWithTargetUser[0].id);
    }

    await this.userRepository.save({ id: user.id, followingUsers });

    const resDeleteFollowDto = { message: '언팔로잉 했습니다.' };
    const result = plainToInstance(ResDeleteFollowDto, resDeleteFollowDto);

    return result;
  }

  // CMNT: - Get User by username
  async getCookieUser(username: string, relations?: object) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations,
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
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
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    return user;
  }
}
