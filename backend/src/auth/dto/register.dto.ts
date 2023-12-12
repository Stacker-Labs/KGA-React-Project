import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'username' })
  username: string;
  @ApiProperty({ example: 'password' })
  password: string;
  @ApiProperty({ example: 'nickname' })
  nickname: string;
  @ApiProperty({ example: null })
  image?: string;
}
