import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: null })
  password?: string;

  @ApiProperty({ example: null })
  nickname?: string;

  @ApiProperty({ example: null })
  image?: string;
}
