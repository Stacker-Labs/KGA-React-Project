import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { BoardModel } from './boards/entities/board.entity';
import { UserModel } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagModel } from './boards/entities/tag.entity';
import { Role } from './common/const/role.enum';
import AWS from 'aws-sdk';
import { v4 as UUID } from 'uuid';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
    private readonly usersService: UsersService,
  ) {}

  // CMMT: - Get Board List
  async getMain(page: number) {
    const take = 10;
    const skip = take * (page - 1);
    const boards = await this.boardRepository.findAndCount({
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
    const boardsLength = boards[1];
    const next_page = boardsLength > skip + take && page + 1;

    return { boards, next_page };
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
  async getUsers() {
    const users = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return users;
  }

  // CMNT: - Upload Image
  async uploadImage(file: Express.Multer.File) {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    file.originalname = `${UUID()}.${
      file.originalname.split('.').slice(-1)[0]
    }`;

    const bucket = new AWS.S3();

    const params = {
      ACL: 'public-read',
      Body: file.buffer,
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.originalname,
    };

    // const data = await new Promise((res, rej) => {
    //   bucket.putObject(params, (e, d) => {
    //     res({
    //       link: `${bucket.endpoint.href}${file.originalname}`,
    //     });
    //   });
    // });

    // return data;

    return bucket
      .putObject(params)
      .promise()
      .then(() => {
        return { link: `${bucket.endpoint.href}${file.originalname}` };
      });
  }
}
