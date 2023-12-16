import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/common/const/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  // CMMT: - Find User
  async findOne(id: number) {
    const user = await this.verifiedUser(id, {
      follower_users: true,
      following_users: true,
      boards: true,
      comments: true,
    });

    return user;
  }

  // CMMT: - Update User
  async update(id: number, updateUserDto: UpdateUserDto, username: string) {
    await this.verifiedUser(id);

    const user = await this.getUser(username);

    // TODO: - UpdateUserDto 내용 확인

    if (id === user.id || user.role === Role.ADMIN) {
      const newUser = await this.userRepository.save({ id, ...updateUserDto });
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

  // CMNT: - Create Follow
  async createFollow(id: number, username: string) {
    const user = await this.getUser(username, { following_users: true });
    if (id === user.id) {
      throw new BadRequestException('자기 자신은 팔로우 할 수 없습니다.');
    }

    const targetUser = await this.verifiedUser(id);

    const following_users = user.following_users
      ? [...user.following_users]
      : [];
    const index = following_users.findIndex((following) => following.id === id);
    if (index === -1) {
      following_users.push(targetUser);
    } else {
      throw new BadRequestException('이미 팔로우 한 사용자입니다.');
    }

    return this.userRepository.save({ id: user.id, following_users });
  }

  // CMNT: - Remove Follow
  async removeFollow(id: number, username: string) {
    const user = await this.getUser(username, { following_users: true });

    const following_users = user.following_users
      ? [...user.following_users]
      : [];
    const index = following_users.findIndex((following) => following.id === id);
    if (index === -1) {
      throw new BadRequestException('이미 팔로우가 취소되었습니다.');
    }

    following_users.splice(index, 1);

    return this.userRepository.save({
      id: user.id,
      following_users,
    });
  }

  // CMNT: - Get User by username
  async getUser(username: string, relations?: object) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations,
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return user;
  }

  // CMNT: - Verify User
  async verifiedUser(id: number, relations?: object) {
    const user = this.userRepository.findOne({ where: { id }, relations });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return user;
  }
}
