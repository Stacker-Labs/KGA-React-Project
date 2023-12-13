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

  async findFollowers(id: number) {
    return `This action returns a #${id} user`;
  }

  async findFollowings(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

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
