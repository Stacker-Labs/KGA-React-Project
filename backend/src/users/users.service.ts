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
import { CreateFollowDto } from './dto/create-follow.dto';
import { RemoveFollowDto } from './dto/remove-follow.dto';

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

  // CMMT: - Get Followers
  async findFollowers(id: number) {
    const followers = this.userRepository.findOne({
      select: {
        follower_users: true,
      },
      where: {
        id,
      },
      relations: {
        follower_users: true,
      },
    });

    return followers;
  }

  // CMMT: - Get Followings
  async findFollowings(id: number) {
    const followings = this.userRepository.findOne({
      select: {
        following_users: true,
      },
      where: {
        id,
      },
      relations: {
        following_users: true,
      },
    });

    return followings;
  }

  // CMMT: - Update User
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    userId: number,
    role: Role,
  ) {
    const user = await this.verifiedUser(id);

    // TODO: - UpdateUserDto 내용 확인

    if (id === userId || role === Role.ADMIN) {
      const newUser = await this.userRepository.save({ id, ...updateUserDto });
      return newUser;
    }

    throw new UnauthorizedException('권한이 없습니다.');
  }

  // CMMT: - Remove User
  async remove(id: number, userId: number, role: Role) {
    const user = await this.verifiedUser(id);

    if (id === userId || role === Role.ADMIN) {
      return this.userRepository.delete(id);
    }

    throw new UnauthorizedException('권한이 없습니다.');
  }

  // CMNT: - Create Follow
  async createFollow(createFollowDto: CreateFollowDto, userId: number) {
    const { id: targetId } = createFollowDto;
    if (targetId === userId) {
      throw new BadRequestException('자기 자신은 팔로우 할 수 없습니다.');
    }

    const user = await this.verifiedUser(userId, { following_users: true });
    const targetUser = await this.verifiedUser(targetId);

    const following_users = user.following_users
      ? [...user.following_users]
      : [];
    const index = following_users.findIndex(
      (following) => following.id === targetId,
    );
    if (index === -1) {
      following_users.push(targetUser);
    } else {
      throw new BadRequestException('이미 팔로우 한 사용자입니다.');
    }

    return this.userRepository.save({ id: userId, following_users });
  }

  // CMNT: - Remove Follow
  async removeFollow(removeFollowDto: RemoveFollowDto, userId: number) {
    const { id: targetId } = removeFollowDto;
    const user = await this.verifiedUser(userId, { following_users: true });

    const following_users = user.following_users
      ? [...user.following_users]
      : [];
    const index = following_users.findIndex(
      (following) => following.id === targetId,
    );
    if (index === -1) {
      throw new BadRequestException('이미 팔로우가 취소되었습니다.');
    }

    following_users.splice(index, 1);

    return this.userRepository.save({
      id: userId,
      following_users,
    });
  }

  // CMNT: - Get User by username
  async getUser(username: string) {
    const user = this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return user;
  }

  // CMNT: - Verify User
  async verifiedUser(id: number, relations?: object) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
      relations,
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return user;
  }
}
