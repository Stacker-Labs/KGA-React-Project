import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GithubLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'github code string',
  })
  code: string;
}
