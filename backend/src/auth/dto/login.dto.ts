import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'username' })
  username: string;

  @MinLength(8)
  @ApiProperty({ example: 'password' })
  password: string;

  @ApiProperty({ example: null })
  image?: string;
}
