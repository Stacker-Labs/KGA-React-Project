import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'title' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'content' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ example: '#tag1 #tag2' })
  tag: string;
}
