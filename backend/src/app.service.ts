import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { BoardModel } from './boards/entities/board.entity';
import { UserModel } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagModel } from './boards/entities/tag.entity';
import { Role } from './common/const/role.enum';
import AWS from 'aws-sdk';
import { v4 as UUID } from 'uuid';

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
      relations: {
        user: true,
        comments: true,
        tags: true,
        likes: true,
        views: true,
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
  async getAdmin(role: Role) {
    if (role !== Role.ADMIN) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

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
