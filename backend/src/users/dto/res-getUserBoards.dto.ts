import { IsInstance, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardModel } from '../../boards/entities/board.entity';
import { Role } from '../../common/const/role.enum';
import { Provider } from '../../common/const/provider.enum';

export class ResGetUserBoardsDto {
  @ApiProperty({
    example: {
      comments: [],
      title: 'title',
      content: 'content',
      likes: [],
      views: [],
      tags: [],
      user: {
        id: 1,
        username: 'username',
        nickname: 'nickname',
        image: null,
        bio: '',
        role: Role.ADMIN,
        provider: Provider.LOCAL,
      },
      id: 1,
      createdAt: new Date(),
    },
  })
  @IsInstance(BoardModel)
  @IsNotEmpty()
  boards: BoardModel[];

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  boardLength: number;

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  nextPage: number | boolean;
}
