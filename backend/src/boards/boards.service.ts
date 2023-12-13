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

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: number) {
    return 'This action adds a new board';
  }

  async findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  async update(
    id: number,
    updateBoardDto: UpdateBoardDto,
    userId: number,
    role: Role,
  ) {
    return `This action updates a #${id} board`;
  }

  async remove(id: number, userId: number, role: Role) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    if (board.user.id === userId || role === Role.ADMIN) {
      return this.boardRepository.delete(id);
    }

    throw new UnauthorizedException('삭제 권한이 없습니다.');
  }
}
