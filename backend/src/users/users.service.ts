import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.verifiedUser(id);

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
  async verifiedUser(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return user;
  }
}
