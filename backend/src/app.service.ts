import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { BoardModel } from './boards/entities/board.entity';
import { UserModel } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagModel } from './boards/entities/tag.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  // CMMT: - Get Board List
  async getMain() {
    const boards = await this.boardRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return boards;
  }

  // CMMT: - Get Search Board List
  async getSearch(query: string) {
    const boards = await this.boardRepository.find({
      where: {
        title: ILike(`%${query}%`),
      },
      order: {
        id: 'DESC',
      },
    });

    return boards;
  }

  // CMMT: - Get Tag List
  async getTags() {
    const tags = await this.tagRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return tags;
  }

  // CMMT: - Get Tag Board List
  async getTagBoards(tag: string) {
    const boards = await this.tagRepository.find({
      where: {
        tag,
      },
      relations: {
        boards: true,
      },
      order: {
        id: 'DESC',
      },
    });

    return boards;
  }

  // CMMT: - Get User List
  async getAdmin() {
    const users = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return users;
  }
}
