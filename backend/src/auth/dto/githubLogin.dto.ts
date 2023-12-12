import { ApiProperty } from '@nestjs/swagger';

export class GithubLoginDto {
  @ApiProperty({
    example: 'github code string',
  })
  code: string;
}
