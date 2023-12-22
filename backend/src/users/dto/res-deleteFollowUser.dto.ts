import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResDeleteFollowDto {
  @ApiProperty({
    example: '언팔로잉 했습니다.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
