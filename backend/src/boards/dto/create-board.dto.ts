import { ApiProperty } from '@nestjs/swagger';
import { TagModel } from '../entities/tag.entity';

export class CreateBoardDto {
  @ApiProperty({ example: 'title' })
  title: string;
  @ApiProperty({ example: 'content' })
  content: string;
  @ApiProperty({ example: '[tag1, tag2]' })
  tag: TagModel;
}
