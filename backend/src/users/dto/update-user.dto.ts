import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: null, required: false })
  password?: string;

  @ApiProperty({ example: null, required: false })
  nickname?: string;

  @ApiProperty({ example: null, required: false })
  image?: string;
}
