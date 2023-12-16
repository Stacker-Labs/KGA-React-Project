import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardModel } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/common/const/role.enum';
import { TagModel } from './entities/tag.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentModel } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
    @InjectRepository(CommentModel)
    private readonly commentRepository: Repository<CommentModel>,
    private readonly userService: UsersService,
  ) {}

  // CMMT: - Create Board
  async create(createBoardDto: CreateBoardDto, username: string) {
    const { title, content, tags } = createBoardDto;
    const user = await this.userService.getUser(username);

    const board = await this.boardRepository.save({
      title,
      content,
      user,
    });

    this.setTags(board, tags);

    return board;
  }

  // CMMT: - Find Board
  async findOne(id: number, username: string) {
    const [deepComment] = await this.commentRepository.find({
      order: { depth: 'DESC' },
      take: 1,
    });

    const depth = deepComment && deepComment.depth - 1;

    let comments: object = { comments: true };
    for (let i = 0; i < depth; i++) {
      comments = { comments };
    }

    const board = await this.verifiedBoard(id, {
      comments: {
        comments,
      },
      user: true,
      tags: true,
      views: true,
      likes: true,
    });

    const user = await this.userService.getUser(username);

    const views = board.views ? [...board.views] : [];
    const viewIndex = views.findIndex((viewer) => viewer.id === user.id);
    if (viewIndex === -1) {
      views.push(user);
      await this.boardRepository.save({ id, views });
    }

    const likes = board.likes ? [...board.likes] : [];
    const likeIndex = likes.findIndex((liker) => liker.id === user.id);
    const like_it = likeIndex !== -1;

    return { ...board, like_it };
  }

  // CMMT: - Update Board
  async update(id: number, updateBoardDto: UpdateBoardDto, username: string) {
    const { title, content, tags } = updateBoardDto;
    const board = await this.verifiedBoard(id, {
      user: true,
      tags: true,
    });

    // TODO: - UpdateBoardDto 내용 확인

    const user = await this.userService.getUser(username);

    if (board.user.id === user.id || user.role === Role.ADMIN) {
      const updatedBoard = await this.boardRepository.save({
        id,
        title,
        content,
        tags: [],
      });
      this.setTags(updatedBoard, tags);

      return updatedBoard;
    }

    throw new UnauthorizedException('수정 권한이 없습니다.');
  }

  // CMMT: - Delete Board
  async remove(id: number, username: string) {
    const board = await this.verifiedBoard(id, { user: true });
    const user = await this.userService.getUser(username);

    if (board.user.id === user.id || user.role === Role.ADMIN) {
      return this.boardRepository.delete(id);
    }

    throw new UnauthorizedException('삭제 권한이 없습니다.');
  }

  // CMNT: - Create Likes
  async createLikes(id: number, username: string) {
    const board = await this.verifiedBoard(id, { user: true, likes: true });
    const user = await this.userService.getUser(username);

    const likes = board.likes ? [...board.likes] : [];
    const index = likes.findIndex((liker) => liker.id === user.id);
    if (index === -1) {
      likes.push(user);
    } else {
      throw new BadRequestException('이미 추천한 글입니다.');
    }

    return this.boardRepository.save({ id, likes, like_it: true });
  }

  // CMNT: - Delete Likes
  async removeLikes(id: number, username: string) {
    const board = await this.verifiedBoard(id, { user: true, likes: true });
    const user = await this.userService.getUser(username);

    const likes = board.likes ? [...board.likes] : [];
    const index = likes.findIndex((liker) => liker.id === user.id);

    if (index === -1) {
      throw new BadRequestException('이미 추천이 취소되었습니다.');
    }

    likes.splice(index, 1);
    return this.boardRepository.save({ id, likes });
  }

  //CMNT: - Create Comment
  async createComment(createCommentDto: CreateCommentDto, username: string) {
    const { boardId, content, parentCommentId } = createCommentDto;
    const user = await this.userService.getUser(username);

    const parentComment = await this.commentRepository.findOne({
      where: { id: parentCommentId },
    });
    if (parentCommentId) {
      if (!parentComment) {
        throw new BadRequestException('답글 대상이 존재하지 않습니다.');
      }

      const comment = await this.commentRepository.save({
        parentComment,
        content,
        user,
        depth: parentComment.depth + 1,
      });

      return comment;
    }

    const board = await this.verifiedBoard(boardId, { user: true });

    const comment = await this.commentRepository.save({
      board,
      content,
      user,
    });

    return comment;
  }

  // CMNT: - Update Comment
  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    username: string,
  ) {
    const user = await this.userService.getUser(username);
    const comment = await this.verifiedComment(id, user.id);

    const updatedComment = await this.commentRepository.save({
      id: comment.id,
      content: updateCommentDto.content,
    });

    return updatedComment;
  }

  // CMNT: - Delete Comment
  async removeComment(id: number, username: string) {
    const user = await this.userService.getUser(username);
    const comment = await this.verifiedComment(id, user.id);

    return this.commentRepository.save({
      id,
      content: '삭제된 글입니다.',
      deleted: true,
    });
  }

  // CMMT: - Make Tag List
  setTags(board: BoardModel, tags: string) {
    tags
      .replace(/#/g, '')
      .split(' ')
      .forEach(async (tag) => {
        const tagPick = await this.tagRepository.findOne({
          where: { tag },
          relations: { boards: true },
        });
        const id = tagPick ? tagPick.id : null;
        const boards = tagPick ? tagPick.boards : [];
        boards.push(board);
        await this.tagRepository.save({ id, boards, tag });
      });
  }

  // CMNT: - Verify Board
  async verifiedBoard(id: number, relations: object) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations,
    });
    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    return board;
  }

  // CMNT: - Verify Comment
  async verifiedComment(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!comment) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }
    if (comment.user.id !== userId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return comment;
  }
}
