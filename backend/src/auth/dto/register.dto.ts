import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'nickname' })
  nickname: string;

  @ApiProperty({ example: null })
  image?: string;
}
