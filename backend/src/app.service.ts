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

  async getMain() {
    const boards = await this.boardRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return boards;
  }

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

  async getTags() {
    const tags = await this.tagRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return tags;
  }

  async getTag(tag: string) {
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

  async getAdmin() {
    const users = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return users;
  }
}
