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
import { UserModel } from 'src/users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentModel } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
    @InjectRepository(CommentModel)
    private readonly commentRepository: Repository<CommentModel>,
    private readonly userService: UsersService,
  ) {}

  // CMMT: - Create Board
  async create(createBoardDto: CreateBoardDto, userId: number) {
    const { title, content, tags } = createBoardDto;
    const user = await this.userService.verifiedUser(userId);

    const board = await this.boardRepository.save({
      title,
      content,
      user,
    });

    this.setTags(board, tags);

    return board;
  }

  // CMMT: - Find Board
  async findOne(id: number) {
    const [deepComment] = await this.commentRepository.find({
      order: {
        depth: 'DESC',
      },
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
    });

    return board;
  }

  // CMMT: - Update Board
  async update(
    id: number,
    updateBoardDto: UpdateBoardDto,
    userId: number,
    role: Role,
  ) {
    const { title, content, tags } = updateBoardDto;
    const board = await this.verifiedBoard(id, {
      user: true,
      tags: true,
    });

    // TODO: - UpdateBoardDto 내용 확인

    if (board.user.id === userId || role === Role.ADMIN) {
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
  async remove(id: number, userId: number, role: Role) {
    const board = await this.verifiedBoard(id, { user: true });

    if (board.user.id === userId || role === Role.ADMIN) {
      return this.boardRepository.delete(id);
    }

    throw new UnauthorizedException('삭제 권한이 없습니다.');
  }

  //CMNT: - Create Comment
  async createComment(createCommentDto: CreateCommentDto, userId: number) {
    const { boardId, content, parentCommentId } = createCommentDto;
    const user = await this.userService.verifiedUser(userId);

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
    userId: number,
  ) {
    const comment = await this.verifiedComment(id, userId);

    const updatedComment = await this.commentRepository.save({
      id: comment.id,
      content: updateCommentDto.content,
    });

    return updatedComment;
  }

  // CMNT: - Delete Comment
  async removeComment(id: number, userId: number) {
    const comment = await this.verifiedComment(id, userId);

    return this.commentRepository.delete(id);
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
      where: {
        id,
      },
      relations: {
        user: true,
      },
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
