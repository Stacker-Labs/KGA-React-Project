import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty({ example: null, required: false })
  password?: string;

  @ApiProperty({ example: null, required: false })
  nickname?: string;

  @ApiProperty({ example: null, required: false })
  bio?: string;

  @ApiProperty({ example: null, required: false })
  image?: string;
}
