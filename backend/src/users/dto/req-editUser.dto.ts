import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqEditUserDto {
  @ApiProperty({ example: null, required: false })
  @IsString()
  password?: string;

  @ApiProperty({ example: null, required: false })
  @IsString()
  nickname?: string;

  @ApiProperty({ example: null, required: false })
  @IsString()
  bio?: string;

  @ApiProperty({ example: null, required: false })
  @IsString()
  image?: string;
}
