import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResCreateFollowDto {
  @ApiProperty({
    example: 'nickname 유저를 팔로우 했습니다.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
