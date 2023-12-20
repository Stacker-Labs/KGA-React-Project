import { BadRequestException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { BoardModel } from './boards/entities/board.entity';
import { UserModel } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagModel } from './boards/entities/tag.entity';
import AWS from 'aws-sdk';
import { v4 as UUID } from 'uuid';
import { RoomModel } from './room/entities/room.entity';
import { ChatModel } from './room/entities/chat.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
    @InjectRepository(RoomModel)
    private readonly roomRepository: Repository<RoomModel>,
    @InjectRepository(ChatModel)
    private readonly chatRepository: Repository<ChatModel>,
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

    return this.pagination(boards, take, skip, page);
  }

  // CMMT: - Get Search Board List
  async getSearch(page: number, query: string) {
    const take = 10;
    const skip = take * (page - 1);
    const boards = await this.boardRepository.findAndCount({
      where: { title: ILike(`%${query}%`) },
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

    return this.pagination(boards, take, skip, page);
  }

  // CMMT: - Get Tag List
  async getTags() {
    const tags = await this.tagRepository.find({
      relations: { boards: true },
      order: { id: 'DESC' },
    });

    const result = [];
    tags.forEach((tag) =>
      result.push({ tag: tag.tag, boardsLength: tag.boards.length }),
    );

    return result;
  }

  // CMMT: - Get Tag Board List
  async getTagBoards(tag: string, page: number) {
    const take = 10;
    const skip = take * (page - 1);
    const boards = await this.boardRepository.findAndCount({
      where: {
        tags: {
          tag,
        },
      },
      relations: {
        user: true,
        comments: true,
        tags: true,
        likes: true,
        views: true,
      },
      order: { id: 'DESC' },
      skip,
      take,
    });

    return this.pagination(boards, take, skip, page);
  }

  // CMMT: - Get User List
  async getUsers() {
    const users = await this.userRepository.find({ order: { id: 'DESC' } });

    return users;
  }

  // CMNT: - Get Room Chats
  async getRoom(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) {
      throw new BadRequestException('해당 방이 존재하지 않습니다.');
    }

    const chats = await this.chatRepository.find({
      where: { room: { id } },
      relations: { room: true },
    });

    return chats;
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
    //       link: `https://${process.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${file.originalname}`,
    //     });
    //   });
    // });

    // return data;

    return bucket
      .putObject(params)
      .promise()
      .then(() => {
        return {
          link: `https://${process.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${file.originalname}`,
        };
      });
  }

  // CMNT: - Pagination
  pagination(
    boardList: [BoardModel[], number],
    take: number,
    skip: number,
    page: number,
  ) {
    const boards = boardList[0].map((board) => ({
      ...board,
      comments: board.comments.length,
    }));

    const boardLength = boardList[1];
    const nextPage = boardLength > skip + take && page + 1;

    return { boards, boardLength, nextPage };
  }
}
