import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  // CMMT: - Find User
  async findOne(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

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
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    // TODO: - 유저 수정 권한 확인

    // TODO: - UpdateUserDto 내용 확인

    const newUser = await this.userRepository.save({ id, ...updateUserDto });
    return newUser;
  }

  // CMMT: - Remove User
  async remove(id: number) {
    // TODO: - 유저 삭제 권한 확인

    return this.userRepository.delete(id);
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
}
