import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class KakaoLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kakao code string',
  })
  code: string;
}
