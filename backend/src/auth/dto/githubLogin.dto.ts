import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GithubLoginDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'github code string',
  })
  code: string;
}
