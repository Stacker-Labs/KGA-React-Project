import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'nickname' })
  nickname: string;

  @IsString()
  @ApiProperty({ example: null })
  image?: string;
}
