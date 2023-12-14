import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: null })
  boardId: number = null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'content' })
  content: string;

  @ApiProperty({ example: null })
  parentCommentId: number = null;
}
