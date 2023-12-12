import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'username' })
  username: string;
  @ApiProperty({ example: 'password' })
  password: string;
  @ApiProperty({ example: null })
  image?: string;
}
